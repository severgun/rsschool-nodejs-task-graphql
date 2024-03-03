import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { PrismaClient, Profile } from "@prisma/client";
import { ProfileObj } from "./profileObj.js";
import { UUIDType } from "../../types/uuid.js";

export const profileQuery = {
  profiles: {
    type: new GraphQLList(ProfileObj),
    resolve: async (_source, _args, context: PrismaClient) => {
      return await context.profile.findMany();
    },
  },
  profile: {
    type: ProfileObj as GraphQLObjectType,
    args: {
      id: {type: new GraphQLNonNull(UUIDType)}
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