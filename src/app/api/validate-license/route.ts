import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { license_key, product_id } = await req.json();

    if (!license_key) {
      return NextResponse.json(
        { valid: false, message: 'License key is required' },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabase();

    let query = supabase
      .from('purchases')
      .select('id, product_id, is_active, user_id')
      .eq('license_key', license_key);

    if (product_id) {
      query = query.eq('product_id', product_id);
    }

    const { data: purchase, error } = await query.single();

    if (error || !purchase) {
      return NextResponse.json({
        valid: false,
        message: 'Invalid license key',
      });
    }

    if (!purchase.is_active) {
      return NextResponse.json({
        valid: false,
        message: 'License key has been deactivated',
      });
    }

    return NextResponse.json({
      valid: true,
      product_id: purchase.product_id,
      message: 'License is valid',
    });
  } catch (err) {
    console.error('License validation error:', err);
    return NextResponse.json(
      { valid: false, message: 'Validation error' },
      { status: 500 }
    );
  }
}

// GET method for simple validation via query params
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const licenseKey = searchParams.get('key');
  const productId = searchParams.get('product_id');

  if (!licenseKey) {
    return NextResponse.json(
      { valid: false, message: 'License key is required' },
      { status: 400 }
    );
  }

  const supabase = getServiceSupabase();

  let query = supabase
    .from('purchases')
    .select('id, product_id, is_active')
    .eq('license_key', licenseKey);

  if (productId) {
    query = query.eq('product_id', productId);
  }

  const { data: purchase, error } = await query.single();

  if (error || !purchase) {
    return NextResponse.json({ valid: false, message: 'Invalid license key' });
  }

  if (!purchase.is_active) {
    return NextResponse.json({ valid: false, message: 'License deactivated' });
  }

  return NextResponse.json({
    valid: true,
    product_id: purchase.product_id,
    message: 'License is valid',
  });
}
