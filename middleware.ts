import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    // Get the pathname from the URL
    const { pathname } = req.nextUrl;

    try {
        // Get the token with explicit error handling
        const token = await getToken({ 
            req, 
            secret: process.env.NEXTAUTH_SECRET 
        });

        // Define public routes that don't need authentication
        const publicPaths = [
            "/auth/login", 
            "/register", 
            "/_next", 
            "/favicon.ico", 
            "/api/auth", 
            "/beranda"
        ];

        // Check if current path is public
        const isPublic = publicPaths.some((path) => 
            pathname.startsWith(path)
        );

        // Handle login page redirect for authenticated users
        if (pathname === "/auth/login" && token) {
            const url = req.nextUrl.clone();
            switch (token.role) {
                case "doctor":
                    url.pathname = "/home";
                    break;
                case "patient":
                    url.pathname = "/beranda";
                    break;
                default:
                    url.pathname = "/";
            }
            return NextResponse.redirect(url);
        }

        // Redirect to login if accessing protected route without token
        if (!token && !isPublic) {
            const url = req.nextUrl.clone();
            url.pathname = "/auth/login";
            return NextResponse.redirect(url);
        }

        // Role-based route protection
        if (token) {
            const userRole = token.role;
            const url = req.nextUrl.clone();

            // Define role-specific routes
            const doctorOnlyRoutes = ["/schedule", "/medical-record"];
            const patientOnlyRoutes = ["/riwayat", "/pasien", "/akun"];

            // Check doctor-only routes
            if (doctorOnlyRoutes.some(route => pathname.startsWith(route)) && userRole !== "doctor") {
                url.pathname = userRole === "patient" ? "/beranda" : "/auth/login";
                return NextResponse.redirect(url);
            }

            // Check patient-only routes
            if (patientOnlyRoutes.some(route => pathname.startsWith(route)) && userRole !== "patient") {
                url.pathname = userRole === "doctor" ? "/home" : "/auth/login";
                return NextResponse.redirect(url);
            }

            // Handle home/beranda redirects
            if (userRole === "doctor" && pathname.startsWith("/beranda")) {
                url.pathname = "/home";
                return NextResponse.redirect(url);
            }

            if (userRole === "patient" && pathname.startsWith("/home")) {
                url.pathname = "/beranda";
                return NextResponse.redirect(url);
            }
        }

        return NextResponse.next();
    } catch (error) {
        // Log error for debugging
        console.error('Middleware Error:', error);
        
        // Redirect to login page on error
        const url = req.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }
}

// Update matcher configuration to be more specific
export const config = {
    matcher: [
        // Auth routes
        '/auth/login',
        
        // Main routes
        '/home',
        '/beranda/:path*',
        
        // Patient routes - include specific patterns
        '/akun/:path*',
        '/riwayat/:path*',
        '/pasien/:path*',
        
        // Doctor routes - include specific patterns
        '/schedule/:path*',
        '/medical-record/:path*',
        
        // Include base routes without wildcards
        '/akun',
        '/riwayat',
        '/pasien',
        '/schedule',
        '/medical-record'
    ]
};