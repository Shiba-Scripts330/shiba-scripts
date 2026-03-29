import { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { getServiceSupabase } from './supabase';

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify email' } },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'discord' && profile) {
        const supabase = getServiceSupabase();
        const discordProfile = profile as any;

        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('discord_id', discordProfile.id)
          .single();

        if (!existingUser) {
          await supabase.from('users').insert({
            discord_id: discordProfile.id,
            username: discordProfile.username,
            avatar_url: discordProfile.avatar
              ? `https://cdn.discordapp.com/avatars/${discordProfile.id}/${discordProfile.avatar}.png`
              : null,
            email: discordProfile.email,
            is_admin: (process.env.ADMIN_DISCORD_IDS || '').split(',').includes(discordProfile.id),
          });
        } else {
          await supabase
            .from('users')
            .update({
              username: discordProfile.username,
              avatar_url: discordProfile.avatar
                ? `https://cdn.discordapp.com/avatars/${discordProfile.id}/${discordProfile.avatar}.png`
                : null,
            })
            .eq('discord_id', discordProfile.id);
        }
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const discordProfile = profile as any;
        token.discord_id = discordProfile.id;
        token.username = discordProfile.username;
        token.is_admin = (process.env.ADMIN_DISCORD_IDS || '').split(',').includes(discordProfile.id);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).discord_id = token.discord_id;
        (session.user as any).username = token.username;
        (session.user as any).is_admin = token.is_admin;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
