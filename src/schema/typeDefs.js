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

  # NOUVELLE COUCHE : Écriture et modifications de données
  type Mutation {
    creerProduit(
      nom: String!
      sku: String!
      prix: Float!
      quantiteStock: Int!
    ): Produit!
  }
`;
