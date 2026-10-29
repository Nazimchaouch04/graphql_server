import db from './database.js';

class LegacyService {
  async fetchTousLesProduits() {
    return new Promise((resolve, reject) => {
      db.all("SELECT id, nom, sku, prix, quantiteStock FROM produits", [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  async fetchProduitParId(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT id, nom, sku, prix, quantiteStock FROM produits WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        resolve(row || null);
      });
    });
  }

  async rechercherProduitsParMotCle(motCle) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT id, nom, sku, prix, quantiteStock FROM produits WHERE nom LIKE ?",
        [`%${motCle}%`],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows || []);
        }
      );
    });
  }

  // NOUVELLE MÉTHODE SENIOR : Mutation SQL avec prévention stricte des injections SQL
  async insererNouveauProduit(nom, sku, prix, quantiteStock) {
  if (prix <= 0 || quantiteStock < 0) {
    throw new Error("Données invalides.");
  }

  return new Promise((resolve, reject) => {
    // Notez l'absence de la colonne 'id' dans l'insertion : SQLite s'en occupe
    const query = "INSERT INTO produits (nom, sku, prix, quantiteStock) VALUES (?, ?, ?, ?)";
    
    // Utilisation d'une fonction classique (pas une fonction fléchée) pour conserver le contexte 'this'
    db.run(query, [nom, sku, prix, quantiteStock], function (err) {
      if (err) {
        reject(new Error(`Impossible de créer le produit : ${err.message}`));
      }
      
      // 'this.lastID' contient le numéro auto-incrémenté généré par la base de données
      resolve({
        id: String(this.lastID), 
        nom,
        sku,
        prix,
        quantiteStock
      });
    });
  });
}

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
