import { GraphQLList } from "graphql";
import { Post, PrismaClient } from "@prisma/client";
import { PostObj } from "./postsObj.js";
import { UUIDType } from "../../types/uuid.js";

export const postsQuery = {
  posts: {
    type: new GraphQLList(PostObj),
    resolve: async (_source, _args, context: PrismaClient) => {
      return await context.post.findMany();
    },
  },
  post: {
    type: PostObj,
    args: {
      id: {type: UUIDType}
    },
    resolve: async (_, args: Post, context: PrismaClient) => {
      return await context.post.findUnique({
        where: {
          id: args.id,
        }
      })
    },
  },
}
