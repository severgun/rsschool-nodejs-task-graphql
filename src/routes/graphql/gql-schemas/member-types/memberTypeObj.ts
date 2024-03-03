import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileObj } from "../profiles/profileObj.js";

export const MemberTypeObj: GraphQLObjectType = new GraphQLObjectType({
  name: "MemberType",
  fields: () => ({
    id: { type: GraphQLString },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: { type: new GraphQLList(ProfileObj) },
  }),
})
  