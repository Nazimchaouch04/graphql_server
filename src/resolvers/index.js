import DataLoader from 'dataloader';
import { legacyService } from '../services/legacyService.js';

// Configuration du DataLoader : Il prend en entrée une fonction qui reçoit une liste de clés
const predictionLoader = new DataLoader(async (lesStocks) => {
  // Les fonctions de chargement de lot doivent renvoyer une promesse qui se résout en un tableau de valeurs de même longueur
  return await legacyService.calculerRisqueRuptureBatch(lesStocks);
});

export const resolvers = {
  Query: {
    obtenirCatalogue: async () => {
      return await legacyService.fetchTousLesProduits();
    },
    rechercherProduit: async (_, { id }) => {
      return await legacyService.fetchProduitParId(id);
    }
  },
  Produit: {
    predictionRupture: async (parent) => {
      // Au lieu d'appeler directement le service, on demande au loader de planifier le chargement
      return await predictionLoader.load(parent.quantiteStock);
    }
  }
};
