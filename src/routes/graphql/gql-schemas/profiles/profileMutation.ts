import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { PrismaClient } from "@prisma/client";
import { MemberTypeIdEnum } from "../member-types/memberTypeObj.js";
import { ProfileObj } from "./profileObj.js";

interface ProfileArgsType {
  id: string
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: string;
  };
}

const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeIdEnum),
    },
  }),
});

const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: MemberTypeIdEnum,
    },
  }),
});

export const profileMutation = {
  createProfile : {
    type: ProfileObj as GraphQLObjectType,
    args: {
      dto: {
        type: new GraphQLNonNull(CreateProfileInputType)
      }
    },
    resolve: async (_source, args: Pick<ProfileArgsType, 'dto'>, context: PrismaClient) => {
      const {dto} = args;
      
      return await context.profile.create({data: dto});
    }
  },
  changeProfile: {
    type: ProfileObj as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(ChangeProfileInputType),
      },
    },
    resolve: async (_source, args: ProfileArgsType, context: PrismaClient) => {
      const {id, dto} = args;
      
      return await context.profile.update({
        where: {
          id,
        },
        data: dto,
      });
    },
  },
  deleteProfile: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      }
    },
    resolve: async (_source, args: Pick<ProfileArgsType, 'id'>, context: PrismaClient) => {
      const {id} = args;
      
      await context.profile.delete({
        where: {
          id,
        }
      })
      return true;
    }
  }
}
