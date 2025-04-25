import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    // Query the database to check if the API key exists
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('value', apiKey)
      .single();

    if (error || !data) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error('Error validating API key:', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
} 