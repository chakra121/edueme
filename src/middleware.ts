import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const role = token.role;
  const pathname = req.nextUrl.pathname;

  // Define protected routes
  const roleBasedRoutes: Record<string, string> = {
    "/dashboard/studentDashboard": "student",
    "/dashboard/teacherDashboard": "teacher",
    // "/dashboard/adminDashboard": "superadmin",
  };

  // Restrict access based on role
  for (const route in roleBasedRoutes) {
    if (pathname.startsWith(route) && role !== roleBasedRoutes[route]) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"], // Middleware applies to all dashboard routes
};
