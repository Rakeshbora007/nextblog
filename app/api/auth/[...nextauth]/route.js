import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/models/User'
import connect from '@/utils/db'
import bcrypt from 'bcrypt'

const passwordCheck = async (credentials, hashedPassword) => {
  return await bcrypt.compare(credentials.password, hashedPassword)
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',

      async authorize (credentials) {
        await connect()

        try {
          const user = await User.findOne({
            email: credentials.email
          })

          if (user) {
            const isPasswordCorrect = await passwordCheck(
              credentials,
              user.password
            )

            if (isPasswordCorrect) {
              return user
            } else {
              throw new Error('Incorrect Password!')
            }
          } else {
            throw new Error('User not found!')
          }
        } catch (err) {
          throw new Error(err)
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECREAT
    })
  ],
  callbacks: {
    async signIn ({ user }) {
      if (user) {
        return true
      }
      return false
    },
    async session ({ session, token }) {
      if (token) {
        session.id = token.id
      }
      return session
    },
    async jwt ({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
  pages: {
    error: '/login',
    signOut: '/login'
  }
})

export { handler as GET, handler as POST }
