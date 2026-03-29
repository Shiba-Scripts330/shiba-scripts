import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, locale } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    // Get product from database
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if user already purchased
    const discordId = (session.user as any).discord_id;
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('discord_id', discordId)
      .single();

    if (user) {
      const { data: existingPurchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single();

      if (existingPurchase) {
        return NextResponse.json({ error: 'Already purchased' }, { status: 400 });
      }
    }

    // Create Stripe checkout session
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name_en || product.name,
              description: product.description_en?.slice(0, 200) || '',
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/${locale || 'en'}/account?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/${locale || 'en'}/scripts/${productId}?purchase=cancelled`,
      metadata: {
        product_id: productId,
        discord_id: discordId,
        user_id: user?.id || '',
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
