import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { MemberTypeIdEnum, MemberTypeObj } from "../member-types/memberTypeObj.js";
import { UUIDType } from "../../types/uuid.js";
import { PrismaClient, Profile } from "@prisma/client";

export const ProfileObj = new GraphQLObjectType({
  name: 'Profile',
  fields:  () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    // user: {
    //   type: 
    // },
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