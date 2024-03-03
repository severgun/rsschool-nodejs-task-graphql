import { GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { UserObj } from "../users/usersObj.js";

export const PostObj = new GraphQLObjectType({
  name: 'Post',
  fields:  () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: { type: UserObj },
    authorId: { type: UUIDType},
  })
})
