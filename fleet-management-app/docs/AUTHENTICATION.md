# Authentication Implementation

## Current Implementation (Client-Side)

The application currently uses **client-side authentication** managed through React Context.

### How It Works

1. **AuthContext** (`src/contexts/AuthContext.tsx`)
   - Manages authentication state globally
   - Stores user session in localStorage
   - Provides login/logout methods
   - Handles user profile updates

2. **Route Protection** (Client-Side Guards)
   - Dashboard layout (`src/app/(dashboard)/layout.tsx`) checks auth state
   - Redirects unauthenticated users to `/login`
   - Login page redirects authenticated users to `/dashboard`

3. **No Server-Side Middleware**
   - Middleware is currently disabled (backed up at `src/middleware.ts.backup`)
   - All auth checks happen in the browser
   - No server-side session validation

### Limitations of Current Approach

⚠️ **Security Considerations:**
- Authentication state can be manipulated in browser
- No server-side validation of requests
- localStorage can be accessed by any script
- No token expiration/refresh mechanism
- API routes (when added) would be unprotected

✅ **Good for:**
- Development and prototyping
- Demo purposes
- UI/UX testing

## Future Implementation (Keycloak Integration)

### When to Migrate

Migrate to Keycloak when:
- Moving to production
- Need real user authentication
- Require role-based access control (RBAC)
- Need SSO (Single Sign-On)
- Managing multiple applications

### Migration Steps

#### 1. Install Dependencies

```bash
npm install next-auth keycloak-js
# or
npm install @auth/core @auth/nextjs
```

#### 2. Configure Keycloak

Set up environment variables:
```env
KEYCLOAK_ID=your-client-id
KEYCLOAK_SECRET=your-client-secret
KEYCLOAK_ISSUER=https://your-keycloak-domain/realms/your-realm
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret
```

#### 3. Create Auth API Route

Create `src/app/api/auth/[...nextauth]/route.ts`:
```typescript
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

#### 4. Enable Middleware

Move `src/middleware.ts.backup` to `middleware.ts` (in root directory) and update:

```typescript
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};
```

#### 5. Update AuthContext

Replace localStorage-based auth with NextAuth session:
```typescript
import { useSession, signIn, signOut } from "next-auth/react";

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  
  return (
    <AuthContext.Provider value={{ 
      user: session?.user, 
      isAuthenticated: !!session,
      login: () => signIn("keycloak"),
      logout: () => signOut(),
    }}>
      {children}
    </AuthContext.Provider>
  );
}
```

#### 6. Update Root Layout

Wrap app with SessionProvider:
```typescript
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          <AuthProvider>{children}</AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
```

### Keycloak Role Mapping

Map Keycloak roles to application permissions:

```typescript
// In your middleware or auth callbacks
const userRoles = token?.realm_access?.roles || [];
const isAdmin = userRoles.includes('fleet-admin');
const isEmployee = userRoles.includes('fleet-employee');
```

### Testing Checklist

- [ ] User can log in via Keycloak
- [ ] Session persists across page refreshes
- [ ] Logout properly clears session
- [ ] Protected routes require authentication
- [ ] Admin routes require admin role
- [ ] Token refresh works automatically
- [ ] API routes validate JWT tokens

## Resources

- [Next-Auth Documentation](https://next-auth.js.org/)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

**Last Updated:** October 2025  
**Status:** Client-side auth (development only)  
**Next Step:** Keycloak integration for production

