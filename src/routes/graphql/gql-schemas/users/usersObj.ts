import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { PostObj } from "../posts/postsObj.js";
import { ProfileObj } from "../profiles/profileObj.js";

export const UserObj = new GraphQLObjectType({
  name: 'User',
  fields:  () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: { type: ProfileObj },
    posts: { type: new GraphQLList(PostObj)},
    // userSubscribedTo: {},
    // subscribedToUser: {},
  })
})