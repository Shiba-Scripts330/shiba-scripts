import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const featured = searchParams.get('featured');

    const supabase = getServiceSupabase();

    let query = supabase.from('products').select('*');

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`name_en.ilike.%${search}%,description_en.ilike.%${search}%`);
    }

    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    switch (sort) {
      case 'priceAsc':
        query = query.order('price', { ascending: true });
        break;
      case 'priceDesc':
        query = query.order('price', { ascending: false });
        break;
      case 'popular':
        query = query.order('download_count', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data: products, error } = await query;

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

    return NextResponse.json(products);
  } catch (err) {
    console.error('Products API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
