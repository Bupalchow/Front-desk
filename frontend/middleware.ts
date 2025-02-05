import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = [  '/login']
const PROTECTED_PATHS = ['/doctors', '/appointments', '/']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  // Skip middleware for public paths
  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next()
  }

  // Protect specific routes
  if (PROTECTED_PATHS.some(p => path.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/doctors/:path*',
    '/appointments/:path*',
    '/queue/:path*',
  ]
}