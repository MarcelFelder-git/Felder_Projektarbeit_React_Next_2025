import { NextResponse } from 'next/server';

/* import { handlers } from '@/auth'; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
 */
export function GET() {
  return NextResponse.json('Funktion löschen, wenn auth benutzt wird');
}
