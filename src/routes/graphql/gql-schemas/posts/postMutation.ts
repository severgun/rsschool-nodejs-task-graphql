import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { PostObj } from "./postObj.js";
import { UUIDType } from "../../types/uuid.js";
import { PrismaClient } from "@prisma/client";

interface PostArgsType {
  id: string
  dto: {
    title: string;
    content: string;
    authorId: string;
  }
}

const CreatePostInputType = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: () => ({
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      content: {
        type: new GraphQLNonNull(GraphQLString),
      },
      authorId: {
        type: new GraphQLNonNull(UUIDType),
      },
    }),
  });

export const postMutation = {
  createPost : {
    type: PostObj as GraphQLObjectType,
    args: {
      dto: {
        type: new GraphQLNonNull(CreatePostInputType)
      }
    },
    resolve: async (_source, args: Pick<PostArgsType, 'dto'>, context: PrismaClient) => {
      return await context.post.create({data: args.dto});
    }
  },
  changePost: {
    type: PostObj as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(CreatePostInputType),
      },
    },
    resolve: async (_source, args: PostArgsType, context: PrismaClient) => {
      return await context.post.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      }
    },
    resolve: async (_source, args: Pick<PostArgsType, 'id'>, context: PrismaClient) => {
      await context.post.delete({
        where: {
          id: args.id
        }
      })
      return true;
    }
  }
}
