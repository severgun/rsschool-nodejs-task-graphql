import { GraphQLList, GraphQLString } from "graphql";
import { PrismaClient, Profile } from "@prisma/client";
import { ProfileObj } from "./profileObj.js";

export const profilesQuery = {
  profiles: {
    type: new GraphQLList(ProfileObj),
    resolve: async (_source, _args, context: PrismaClient) => {
      return await context.profile.findMany();
    },
  },
  profile: {
    type: ProfileObj,
    args: {
      id: {type: GraphQLString}
    },
    resolve: async (_, args: Profile, context: PrismaClient) => {
      return await context.profile.findUnique({
        where: {
          id: args.id,
        }
      })
    },
  },
}