import DataLoader from 'dataloader';
import { legacyService } from '../services/legacyService.js';

const predictionLoader = new DataLoader(async (lesStocks) => {
  return await legacyService.calculerRisqueRuptureBatch(lesStocks);
});

export const resolvers = {
  Query: {
    obtenirCatalogue: async () => {
      return await legacyService.fetchTousLesProduits();
    },
    rechercherProduit: async (_, { id }) => {
      return await legacyService.fetchProduitParId(id);
    },
    rechercherProduitsParNom: async (_, { motCle }) => {
      return await legacyService.rechercherProduitsParMotCle(motCle);
    }
  },
  Mutation: {
    creerProduit: async (_, { nom, sku, prix, quantiteStock }) => {
      return await legacyService.insererNouveauProduit(nom, sku, prix, quantiteStock);
    }
  },
  // Mapping strict pour garantir la résolution de l'id en tant que chaîne
  Produit: {
    id: (parent) => String(parent.id),
    predictionRupture: async (parent) => {
      return await predictionLoader.load(parent.quantiteStock);
    }
  }
};
