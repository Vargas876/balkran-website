import type { NextAuthConfig } from 'next-auth';

const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'EDITOR'];

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 horas
    updateAge: 60 * 60, // renueva cada hora de actividad
  },
  trustHost: true,
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnApiAdmin = nextUrl.pathname.startsWith('/api/admin');
      const isLoginPage = nextUrl.pathname === '/login';

      // Admin UI y API admin requieren sesión Y rol de administrador
      if ((isOnAdmin || isOnApiAdmin) && !isLoggedIn && !isLoginPage) {
        return false;
      }
      if ((isOnAdmin || isOnApiAdmin) && isLoggedIn && !ADMIN_ROLES.includes(auth.user.role ?? '')) {
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
