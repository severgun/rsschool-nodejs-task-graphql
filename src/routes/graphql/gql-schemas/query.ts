import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { memberTypesQuery } from "./member-types/memberTypeQuery.js";
import { profilesQuery } from "./profiles/profileQuery.js";
import { postsQuery } from "./posts/postQuery.js";
import { usersQuery } from "./users/usersQuery.js";
import { postMutation } from "./posts/postMutation.js";

const queryTypes = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...memberTypesQuery,
    ...postsQuery,
    ...profilesQuery,
    ...usersQuery,
  }),
})

const mutationTypes = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...postMutation,
  }),
});
  
export const GQLSchema: GraphQLSchema = new GraphQLSchema({
  query: queryTypes,
  mutation: mutationTypes,
});