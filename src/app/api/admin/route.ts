import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getServiceSupabase } from '@/lib/supabase';

// Middleware to check admin status
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  const isAdmin = (session.user as any).is_admin;
  if (!isAdmin) return null;

  return session;
}

// GET: Dashboard stats
export async function GET(req: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const supabase = getServiceSupabase();

  const [
    { count: totalUsers },
    { count: totalOrders },
    { data: revenueData },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('purchases').select('*', { count: 'exact', head: true }),
    supabase.from('purchases').select('amount_paid'),
    supabase
      .from('purchases')
      .select('*, users(username), products(name_en)')
      .order('created_at', { ascending: false })
      .limit(10),
  ]);

  const totalRevenue = revenueData?.reduce((sum, p) => sum + (p.amount_paid || 0), 0) || 0;

  return NextResponse.json({
    stats: {
      totalUsers: totalUsers || 0,
      totalOrders: totalOrders || 0,
      totalRevenue,
    },
    recentOrders: recentOrders || [],
  });
}

// POST: Add product
export async function POST(req: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await req.json();
  const supabase = getServiceSupabase();

  const { data, error } = await supabase.from('products').insert(body).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// PUT: Update product
export async function PUT(req: NextRequest) {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await req.json();
  const { id, ...updates } = body;

  const supabase = getServiceSupabase();

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
