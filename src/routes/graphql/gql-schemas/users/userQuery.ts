import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { PrismaClient, User } from "@prisma/client";
import { UserObj } from "./userObj.js";
import { UUIDType } from "../../types/uuid.js";

export const userQuery = {
  users: {
    type: new GraphQLList(UserObj),
    resolve: async (_source, _args, context: PrismaClient) => {
      return await context.user.findMany();
    },
  },
  user: {
    type: UserObj as GraphQLObjectType,
    args: {
      id: {type: new GraphQLNonNull(UUIDType)}
    },
    resolve: async (_, args: User, context: PrismaClient) => {
      return await context.user.findUnique({
        where: {
          id: args.id,
        }
      })
    },
  },
}