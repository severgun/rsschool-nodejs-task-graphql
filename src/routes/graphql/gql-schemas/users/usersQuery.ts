import { GraphQLList } from "graphql";
import { PrismaClient, User } from "@prisma/client";
import { UserObj } from "./usersObj.js";
import { UUIDType } from "../../types/uuid.js";

export const usersQuery = {
  users: {
    type: new GraphQLList(UserObj),
    resolve: async (_source, _args, context: PrismaClient) => {
      return await context.user.findMany();
    },
  },
  user: {
    type: UserObj,
    args: {
      id: {type: UUIDType}
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