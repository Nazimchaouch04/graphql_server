import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/index.js';

async function demarrerPasserelle() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Indispensable pour la Sandbox en ligne
  });

  const CLIENT_API_KEY_VALIDE = "PROD_SECRET_GATEWAY_KEY_2026";

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4005 },
    
    // CONFIGURATION CORS SENIOR : On autorise la Sandbox Apollo à envoyer des Headers personnalisés
    expressAppFromMiddleware: {
      cors: {
        origin: ['https://apollographql.com', 'https://apollographql.com'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
      }
    },

    context: async ({ req }) => {
      // Autoriser l'introspection de base sans clé pour l'interface graphique
      if (req.body && req.body.operationName === 'IntrospectionQuery') {
        return { clientAutorise: true };
      }

      const apiKey = req.headers['x-api-key'];

      if (!apiKey || apiKey !== CLIENT_API_KEY_VALIDE) {
        throw new GraphQLError("Accès refusé : Clé d'API invalide ou manquante dans les en-têtes HTTP.", {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      return { clientAutorise: true };
    },
  });

  console.log(`\n======================================================`);
  console.log(`   Gateway GraphQL Sécurisé (ESM) prêt : ${url}`);
  console.log(`======================================================\n`);
}

demarrerPasserelle().catch((err) => {
  console.error("Erreur lors du lancement de la passerelle :", err);
});
