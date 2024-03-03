import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { MemberTypeIdEnum, MemberTypeObj } from "../member-types/memberTypeObj.js";
import { UUIDType } from "../../types/uuid.js";
import { PrismaClient, Profile } from "@prisma/client";
import { UserObj } from "../users/userObj.js";

export const ProfileObj = new GraphQLObjectType({
  name: 'Profile',
  fields:  () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    user: {
      type: UserObj as GraphQLObjectType,
      resolve: async (source: Profile, _args, context: PrismaClient) => {
        return await context.user.findUnique({
          where: {
            id: source.userId,
          }
        })
      }
    },
    userId: { type: UUIDType },
    memberType: { 
      type: MemberTypeObj,
      resolve: async (source: Profile, _args, context: PrismaClient) => {
        return await context.memberType.findUnique({
          where: {
            id: source.memberTypeId,
          }
        })
      }
    },
    memberTypeId: { type: MemberTypeIdEnum },
  })
})