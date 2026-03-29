import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getServiceSupabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const purchaseId = searchParams.get('purchase_id');

    if (!purchaseId) {
      return NextResponse.json({ error: 'Purchase ID required' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const discordId = (session.user as any).discord_id;

    // Get user
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('discord_id', discordId)
      .single();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify purchase belongs to user
    const { data: purchase, error } = await supabase
      .from('purchases')
      .select('*, products(*)')
      .eq('id', purchaseId)
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();

    if (error || !purchase) {
      return NextResponse.json({ error: 'Purchase not found or unauthorized' }, { status: 403 });
    }

    // In production, generate a signed URL from Supabase Storage
    // For now, return a download token
    const downloadToken = Buffer.from(
      JSON.stringify({
        purchase_id: purchaseId,
        product_id: purchase.product_id,
        user_id: user.id,
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes
      })
    ).toString('base64');

    return NextResponse.json({
      download_url: `/api/download/file?token=${downloadToken}`,
      product_name: purchase.products?.name_en || 'Script',
    });
  } catch (err) {
    console.error('Download error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
