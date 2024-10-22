import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // List of public routes that can be accessed without authentication
    const publicPaths = ["/auth/login", "/register", "/_next", "/favicon.ico", "/api/auth", "/beranda"];

    // Check if the current route is public
    const isPublic = publicPaths.some((path) => pathname.startsWith(path));

    // If the user tries to access the login page after logging in, redirect based on role
    if (pathname === "/auth/login" && token) {
        const userRole = token.role;

        const url = req.nextUrl.clone();
        if (userRole === "doctor") {
            url.pathname = "/home"; // Redirect to /home if doctor
        } else if (userRole === "patient") {
            url.pathname = "/beranda"; // Redirect to /beranda if patient
        } else {
            url.pathname = "/"; // Redirect to default page if role is not recognized
        }
        return NextResponse.redirect(url);
    }

    // If the user tries to access a protected page without a token, redirect to login
    if (!token && !isPublic) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }

    // For all other paths if the token exists, role-based protection
    if (token) {
        const userRole = token.role;
        // Redirect logic for role-specific pages can remain here
        if (userRole === "doctor" && pathname.startsWith("/beranda")) {
            const url = req.nextUrl.clone();
            url.pathname = "/home"; // Redirect doctors from /beranda to /home
            return NextResponse.redirect(url);
        }

        if (userRole === "patient" && pathname.startsWith("/home")) {
            const url = req.nextUrl.clone();
            url.pathname = "/beranda"; // Redirect patients from /home to /beranda
            return NextResponse.redirect(url);
        }
    }
    // Continue with the request
    return NextResponse.next();
}

// Route configuration for the middleware
export const config = {
    matcher: ["/auth/login", "/home", "/beranda", "/akun"], // Ensure all these routes are checked
};
