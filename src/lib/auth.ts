import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "@prisma/client";
import { prisma } from "./db";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import client from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {
    async session({ session, token, user }) {
      console.log(session, user);
      return session;
    },
  },
});
