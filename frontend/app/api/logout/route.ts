"use server";
// app/api/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore =await cookies();
  cookieStore.delete('session_userid');
  cookieStore.delete('session_access_token');
  cookieStore.delete('session_refresh_token');

  return NextResponse.json({ success: true });
}
