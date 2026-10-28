import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/index.js';

async function demarrerPasserelle() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Clé d'API de test codée en dur (simulant une clé d'environnement)
  const CLIENT_API_KEY_VALIDE = "PROD_SECRET_GATEWAY_KEY_2026";

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4005 },
    // CONFIGURATION SENIOR : Injection du contexte de sécurité
    context: async ({ req }) => {
      // On extrait la clé d'API depuis les en-têtes HTTP de la requête
      const apiKey = req.headers['x-api-key'];

      // Si la clé est absente ou invalide, on lève une erreur de validation GraphQL standard
      if (!apiKey || apiKey !== CLIENT_API_KEY_VALIDE) {
        throw new GraphQLError("Accès refusé : Clé d'API invalide ou manquante dans les en-têtes HTTP.", {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      // Si tout est OK, on peut injecter des données utiles pour les résolveurs (par exemple un utilisateur simulé)
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
