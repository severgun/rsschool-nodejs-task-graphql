import { GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { UserObj } from "../users/userObj.js";
import { Post, PrismaClient } from "@prisma/client";

export const PostObj = new GraphQLObjectType({
  name: 'Post',
  fields:  () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: { 
      type: UserObj as GraphQLObjectType,
      resolve: async (source: Post, _args, context: PrismaClient) => {
        return await context.user.findUnique({
          where: {
            id: source.authorId,
          }
        })
      }
    },
    authorId: { type: UUIDType},
  })
})
