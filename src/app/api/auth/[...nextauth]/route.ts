import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/globalPrisma';
import { connectToDatabase } from '@/lib/connectDB';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24, // ✅ Session expires in 24 hours
    },
    jwt: {
        maxAge: 60 * 60 * 24, // ✅ JWT expires in 24 hours
    },
    providers: [
        CredentialsProvider({
            name: 'creds',
            credentials: {
                email: { label: "Email", placeholder: "Enter email" },
                password: { label: "Password", placeholder: "Enter password" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) return null;

                try {
                    await connectToDatabase();

                    const user = await prisma.user.findFirst({
                        where: { email: credentials.email },
                    });

                    if (!user?.hashedPassword || !user?.userRole) return null; // Ensure role exists

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.hashedPassword
                    );

                    if (isPasswordCorrect) {
                        const loggedInUser: User = {
                            id: user.id,
                            name: user.firstName,
                            email: user.email,
                            role: user.userRole as "student" | "teacher" | "superadmin", // ✅ Ensure role type
                        };

                        return loggedInUser;
                    }

                    return null;
                } catch (error) {
                    console.error(error);
                    return null;
                } finally {
                    await prisma.$disconnect();
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // ✅ Expire in 24 hours
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as "student" | "teacher" | "superadmin"; // ✅ Assign role
                session.expires = new Date(token.exp * 1000).toISOString(); // ✅ Sync expiry time
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
