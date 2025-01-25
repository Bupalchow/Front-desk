import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  // List of protected paths
  const protectedPaths = ['/doctors/[id]'];
  
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/doctors/:path*', '/appointments/:path*', '/queue/:path*'],
};