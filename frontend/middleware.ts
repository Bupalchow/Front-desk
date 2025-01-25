import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || 
                request.headers.get('Authorization')?.split(' ')[1];

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const protectedPaths = ['/doctors', '/appointments', '/'];
  
  const isProtectedRoute = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (!token && isProtectedRoute) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const response = NextResponse.next();
  if (token) {
    response.headers.set('Authorization', `Bearer ${token}`);
  }

  return response;
}

export const config = {
  matcher: [
    '/doctors/:path*',
    '/appointments/:path*',
    '/queue/:path*',
    '/login'
  ]
};