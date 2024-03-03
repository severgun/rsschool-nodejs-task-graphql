import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { GQLSchema } from './gql-schemas/query.js';

const GQL_MAX_DEPTH = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const {prisma} = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      
      const validationErrors = validate(GQLSchema, parse(query), [depthLimit(GQL_MAX_DEPTH)]);

      if (validationErrors.length > 0) {
        return {
          data: {},
          errors: validationErrors,
        }
      }
      
      const res = await graphql({
        schema: GQLSchema,
        source: query,
        variableValues: variables,
        contextValue: prisma,
      })

      return res;
    },
  });
};

export default plugin;
