import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // List of public routes that can be accessed without authentication
    // const publicPaths = ["/auth/login", "/register", "/_next", "/favicon.ico", "/api/auth", "/beranda"];

    // Check if the current route is public
    // const isPublic = publicPaths.some((path) => pathname.startsWith(path));

    // If the user tries to access the login page after logging in, redirect based on role
    if (pathname === "/auth/login" && token) {
        const userRole = token.role;

        const url = req.nextUrl.clone();
        if (userRole === "doctor") {
            url.pathname = "/home"; // Redirect to /home if doctor
        } else if (userRole === "patient") {
            url.pathname = "/beranda"; // Redirect to /beranda if patient
        } else {
            url.pathname = "/"; 
        }
        return NextResponse.redirect(url);
    }

    // If the user tries to access a protected page without a token, redirect to login
//     if (!token && !isPublic) {
//         const url = req.nextUrl.clone();
//         url.pathname = "/auth/login";
//         return NextResponse.redirect(url);
//     }

//     // For all other paths if the token exists, role-based protection
//     if (token) {
//         const userRole = token.role;
//         const url = req.nextUrl.clone();

//         // Doctor-only routes
//         const doctorOnlyRoutes = ["/schedule", "/medical-record"];
//         if (doctorOnlyRoutes.some(route => pathname.startsWith(route)) && userRole !== "doctor") {
//             if (userRole === "patient") {
//                 url.pathname = "/beranda";
//             } else {
//                 url.pathname = "/auth/login";
//             }
//             return NextResponse.redirect(url);
//         }

//         // Patient-only routes
//         // const patientOnlyRoutes = ["/riwayat", "/pasien", "/akun"];
//         // if (patientOnlyRoutes.some(route => pathname.startsWith(route)) && userRole !== "patient") {
//         //     if (userRole === "doctor") {
//         //         url.pathname = "/home";
//         //     } else {
//         //         url.pathname = "/auth/login";
//         //     }
//         //     return NextResponse.redirect(url);
//         // }

//         // Existing role-based redirects
//         if (userRole === "doctor" && pathname.startsWith("/beranda")) {
//             url.pathname = "/home";
//             return NextResponse.redirect(url);
//         }

//         if (userRole === "patient" && pathname.startsWith("/home")) {
//             url.pathname = "/beranda";
//             return NextResponse.redirect(url);
//         }
//     }

//     // Continue with the request
//     return NextResponse.next();
// }

// // Route configuration for the middleware
// export const config = {
//     matcher: [
//         "/auth/login", 
//         "/home", 
//         "/beranda", 
//         "/akun",
//         "/akun/:path*",
//         "/schedule",
//         "/schedule/:path*",
//         "/riwayat",
//         "/riwayat/:path*",
//         "/medical-record",
//         "/medical-record/:path*",
//         "/pasien",
//         "/pasien/:path*",
//         "/akun",
//         "/akun/:path*"
//     ],
};