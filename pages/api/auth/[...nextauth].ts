import NextAuth, { NextAuthOptions } from 'next-auth';
import TwitchProvider from 'next-auth/providers/twitch';

export const authOptions: NextAuthOptions = {
  providers: [
    TwitchProvider({CredentialsProvider
      clientId: process.env.TWITCH_CLIENT_ID!,
      clientSecret: process.env.TWITCH_CLIENT_SECRET!,
    }),
  ],
    secret: process.env.NEXTAUTH_SECRET!,
};

export default NextAuth(authOptions);
