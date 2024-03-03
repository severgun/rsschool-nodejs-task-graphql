import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { PostObj } from "../posts/postsObj.js";
import { ProfileObj } from "../profiles/profileObj.js";
import { PrismaClient, User } from "@prisma/client";

export const UserObj = new GraphQLObjectType({
  name: 'User',
  fields:  () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: { 
      type: ProfileObj,
      resolve: async (source: User, _, context: PrismaClient) => {
        return await context.profile.findUnique({
          where: {
            userId: source.id,
          }
        })
      }
    },
    posts: { 
      type: new GraphQLList(PostObj),
      resolve: async (source: User, _, context: PrismaClient) => {
        return await context.post.findMany({
          where: {
            authorId: source.id,
          }
        })
      }
    },
    // userSubscribedTo: {},
    // subscribedToUser: {},
  })
})