import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const config = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.OAUTH_CLIENT_ID ?? '',
      clientSecret: process.env.OAUTH_CLIENT_SECRET ?? '',
      profile(profile) {
        return {
          id: profile.id + '',
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
}

const handler = NextAuth(config)

export { handler as GET, handler as POST }

// export const {
//   handlers: { GET, POST },
//   auth
// } = NextAuth(config)

// export const getCurrentUser = async () => {
//   const session = await auth()

//   if (!session?.user) {
//     return null
//   }

//   return session.user
// }
