const produitsMock = [
  { id: '101', nom: 'Ordinateur Portable Enterprise', sku: 'LAP-ENT-01', prix: 1299.99, quantiteStock: 15 },
  { id: '102', nom: 'Écran 4K Pro Display', sku: 'MON-4K-02', prix: 599.99, quantiteStock: 3 },
];

class LegacyService {
  async fetchTousLesProduits() {
    return new Promise((resolve) => setTimeout(() => resolve(produitsMock), 50));
  }

  async fetchProduitParId(id) {
    return new Promise((resolve) => {
      const produit = produitsMock.find(p => p.id === id);
      setTimeout(() => resolve(produit || null), 30);
    });
  }

  // NOUVELLE MÉTHODE SENIOR : Reçoit un tableau de stocks et traite tout en un seul appel
  async calculerRisqueRuptureBatch(tableauxStocks) {
    console.log(`[🚀 IA SERVICE] Appel groupé reçu pour ${tableauxStocks.length} produits simultanément !`);
    
    return new Promise((resolve) => {
      const resultats = tableauxStocks.map(quantiteStock => {
        const probabilite = quantiteStock < 5 ? 0.85 : 0.12;
        const niveauRisque = probabilite > 0.5 ? 'CRITIQUE' : 'FAIBLE';
        return {
          probabilite,
          niveauRisque,
          dateEvaluation: new Date().toISOString()
        };
      });
      
      setTimeout(() => resolve(resultats), 20);
    });
  }
}

export const legacyService = new LegacyService();
