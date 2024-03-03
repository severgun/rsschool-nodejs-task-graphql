import { GraphQLList, GraphQLNonNull } from "graphql";
import { MemberTypeIdEnum, MemberTypeObj } from "./memberTypeObj.js";
import { MemberType, PrismaClient } from "@prisma/client";

export const memberTypesQuery = {
  memberTypes: {
    type: new GraphQLList(MemberTypeObj),
    resolve: async (_source, _args, context: PrismaClient) => {
      return await context.memberType.findMany();
    },
  },
  memberType: {
    type: MemberTypeObj,
    args: {
      id: {type: new GraphQLNonNull(MemberTypeIdEnum)}
    },
    resolve: async (_, args: MemberType, context: PrismaClient) => {
      return await context.memberType.findUnique({
        where: {
          id: args.id,
        }
      })
    },
  },
}