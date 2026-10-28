import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 1. Le Schéma : Définition de la structure de vos données
const typeDefs = `#graphql
  type Cours {
    id: ID!
    titre: String!
    auteur: String!
  }

  type Query {
    tousLesCours: [Cours]
  }
`;

// 2. Les Données (Simulées en mémoire)
const listeCours = [
  { id: '1', titre: 'Débuter avec GraphQL', auteur: 'Hichem' },
  { id: '2', titre: 'Maîtriser Node.js', auteur: 'Emna' },
];

// 3. Les Résolveurs : La logique qui va chercher les données
const resolvers = {
  Query: {
    tousLesCours: () => listeCours,
  },
};

// 4. Initialisation et lancement du serveur Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Serveur GraphQL prêt sur l'adresse : ${url}`);
