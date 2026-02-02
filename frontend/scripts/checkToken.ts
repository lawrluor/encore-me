import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function checkTokenAndRedirect(request: NextRequest) {
  const token = request.cookies.get('authToken');
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication, including exact root path ('/')
  const publicRoutes = ['/signup', '/login'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route)) || pathname === '/';

  // If no token and trying to access protected route, redirect to Signup
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  // If has token and trying to access Signup/login, redirect to home
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return;
}
