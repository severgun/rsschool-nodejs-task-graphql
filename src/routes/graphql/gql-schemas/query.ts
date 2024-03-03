import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { memberTypesQuery } from "./member-types/memberTypeQuery.js";
import { profilesQuery } from "./profiles/profileQuery.js";
import { postsQuery } from "./posts/postsQuery.js";
import { usersQuery } from "./users/usersQuery.js";

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...memberTypesQuery,
    ...postsQuery,
    ...profilesQuery,
    ...usersQuery,
  }),
})
  
  export const GQLSchema: GraphQLSchema = new GraphQLSchema({
    query: queryType
  });