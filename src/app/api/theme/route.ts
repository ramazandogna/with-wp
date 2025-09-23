import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { theme } = await request.json();

  const response = NextResponse.json({ success: true });

  // Set theme cookie for 1 year
  response.cookies.set('theme', theme, {
    maxAge: 60 * 60 * 24 * 365 // 1 year
  });

  return response;
}
