import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServiceSupabase } from '@/lib/supabase';
import { generateLicenseKey } from '@/lib/license';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { product_id, discord_id, user_id } = session.metadata || {};

    if (!product_id || !discord_id) {
      console.error('Missing metadata in checkout session');
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    // Get or create user
    let userId = user_id;
    if (!userId) {
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('discord_id', discord_id)
        .single();
      userId = user?.id;
    }

    if (!userId) {
      console.error('User not found for discord_id:', discord_id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate license key
    const licenseKey = generateLicenseKey();

    // Create purchase record
    const { error } = await supabase.from('purchases').insert({
      user_id: userId,
      product_id,
      license_key: licenseKey,
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent as string,
      amount_paid: (session.amount_total || 0) / 100,
      is_active: true,
    });

    if (error) {
      console.error('Failed to create purchase:', error);
      return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 });
    }

    // Increment download count
    await supabase.rpc('increment_download_count', { pid: product_id });

    console.log(`Purchase completed: user=${userId}, product=${product_id}, license=${licenseKey}`);
  }

  return NextResponse.json({ received: true });
}
