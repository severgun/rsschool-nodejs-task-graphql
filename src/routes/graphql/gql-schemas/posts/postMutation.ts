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

const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
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
      const {dto} = args;
      
      return await context.post.create({data: dto});
    }
  },
  changePost: {
    type: PostObj as GraphQLObjectType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: new GraphQLNonNull(ChangePostInputType),
      },
    },
    resolve: async (_source, args: PostArgsType, context: PrismaClient) => {
      const {id, dto} = args;
      
      return await context.post.update({
        where: {
          id,
        },
        data: dto,
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
      const {id} = args;
      
      await context.post.delete({
        where: {
          id
        }
      });

      return true;
    }
  }
}
