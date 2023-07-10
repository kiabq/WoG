// Libraries
import { NextRequest, NextResponse } from 'next/server';

// Routes
import { authRoutes, protectedRoutes, logoutRoutes } from './routing/routes';

export function middleware(request: NextRequest, response: NextResponse) {
    const token = request.cookies.get('token');

    if (authRoutes.includes(request.nextUrl.pathname) && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (logoutRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}