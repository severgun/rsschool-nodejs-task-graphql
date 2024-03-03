import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { UserObj } from "./userObj.js";
import { PrismaClient } from "@prisma/client";

interface UserArgsType {
  id: string,
  dto: {
    name: string,
    balance: number,
  }
}

const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  })
});

export const userMutation = {
  createUser: {
    type: UserObj as GraphQLObjectType,
    args: {
      dto: {
        type: new GraphQLNonNull(CreateUserInputType),
      }
    },
    resolve: async (_source, args: Pick<UserArgsType, 'dto'>, context: PrismaClient) => {
      return await context.user.create({data: args.dto});
    }
  },
  changeUser: {
    type: UserObj as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(CreateUserInputType),
      },
    },
    resolve: async (_source, args: UserArgsType, context: PrismaClient) => {
      return await context.user.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      }
    },
    resolve: async (_source, args: Pick<UserArgsType, 'id'>, context: PrismaClient) => {
      await context.user.delete({
        where: {
          id: args.id
        }
      })
      return true;
    }
  },
};