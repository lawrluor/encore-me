import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function checkTokenAndRedirect(request: NextRequest) {
  const token = request.cookies.get('authToken');
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication, including exact root path ('/')
  const publicRoutes = ['/Signup', '/Login'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route)) || pathname === '/';

  // If no token and trying to access protected route, redirect to Signup
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/Signup', request.url));
  }

  // If has token and trying to access Signup/Login, redirect to home
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/Home', request.url));
  }

  return;
}
