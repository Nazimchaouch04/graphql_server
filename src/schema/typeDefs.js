export const typeDefs = `#graphql
  type Produit {
    id: ID!
    nom: String!
    sku: String!
    prix: Float!
    quantiteStock: Int!
    predictionRupture: ScorePrediction!
  }

  type ScorePrediction {
    probabilite: Float!
    niveauRisque: String!
    dateEvaluation: String!
  }

  type Query {
    obtenirCatalogue: [Produit!]!
    rechercherProduit(id: ID!): Produit
    rechercherProduitsParNom(motCle: String!): [Produit!]!
  }

  type Mutation {
    creerProduit(
      nom: String!
      sku: String!
      prix: Float!
      quantiteStock: Int!
    ): Produit!
  }
`;
