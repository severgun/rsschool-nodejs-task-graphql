import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { memberTypeQuery } from "./member-types/memberTypeQuery.js";
import { profileQuery } from "./profiles/profileQuery.js";
import { postQuery } from "./posts/postQuery.js";
import { userQuery } from "./users/userQuery.js";
import { postMutation } from "./posts/postMutation.js";
import { userMutation } from "./users/userMutation.js";

const queryTypes = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...memberTypeQuery,
    ...postQuery,
    ...profileQuery,
    ...userQuery,
  }),
})

const mutationTypes = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...postMutation,
    ...userMutation,
  }),
});
  
export const GQLSchema: GraphQLSchema = new GraphQLSchema({
  query: queryTypes,
  mutation: mutationTypes,
});