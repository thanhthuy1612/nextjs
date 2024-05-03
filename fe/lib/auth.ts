import { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { connect } from '@/app/api/auth/auth';
import { IStatusCode } from '@/app/api/IStatusCode';
// import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    // CredentialsProvider({}),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user?.email?.toString()) {
        const res = await connect({ email: user?.email?.toString() });
        console.log(res);
        if (res.statusCode === IStatusCode.SUCCESS) {
          return Promise.resolve(true);
        }
      }
      return Promise.resolve(false);
    },
  },
};
