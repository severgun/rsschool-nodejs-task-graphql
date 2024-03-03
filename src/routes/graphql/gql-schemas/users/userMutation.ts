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

interface UserSubscribeArgsType {
  userId: string;
  authorId: string;
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

const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
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
      const {dto} = args;

      return await context.user.create({data: dto});
    }
  },
  changeUser: {
    type: UserObj as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(ChangeUserInputType),
      },
    },
    resolve: async (_source, args: UserArgsType, context: PrismaClient) => {
      const {id, dto} = args;

      return await context.user.update({
        where: {
          id,
        },
        data: dto,
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
      const {id} = args;

      await context.user.delete({
        where: {
          id
        }
      })
      return true;
    }
  },
  subscribeTo: {
    type: UserObj as GraphQLObjectType,
    args: {
      userId: {
        type: new GraphQLNonNull(UUIDType),
      },
      authorId: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args: UserSubscribeArgsType, context: PrismaClient) => {
      const {userId, authorId} = args;

      return await context.user.update({
        where: {
          id: userId,
        },
        data: {
          userSubscribedTo: {
            create: {
              authorId,
            },
          },
        },
      });
    },
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_source, args: UserSubscribeArgsType, context: PrismaClient) => {
      const {userId, authorId} = args;

      await context.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: userId,
            authorId,
          },
        },
      });

      return true;
    },
  },
};
