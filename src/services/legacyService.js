import db from './database.js';

class LegacyService {
  async fetchTousLesProduits() {
    return new Promise((resolve, reject) => {
      db.all("SELECT id, nom, sku, prix, quantiteStock FROM produits", [], (err, rows) => {
        if (err) reject(err);
        resolve(rows || []);
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
    console.log(`[🔎 SEARCH ACTIF] Requête SQL LIKE lancée pour le mot-clé: "${motCle}"`);
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

  async insererNouveauProduit(nom, sku, prix, quantiteStock) {
    if (prix <= 0 || quantiteStock < 0) {
      throw new Error("Données invalides : Le prix et le stock doivent être positifs.");
    }

    const nouvelId = `prod_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO produits (id, nom, sku, prix, quantiteStock) VALUES (?, ?, ?, ?, ?)";
      db.run(query, [nouvelId, nom, sku, prix, quantiteStock], function (err) {
        if (err) reject(err);
        resolve({ id: nouvelId, nom, sku, prix, quantiteStock });
      });
    });
  }

  async calculerRisqueRuptureBatch(tableauxStocks) {
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
      setTimeout(() => resolve(resultats), 10);
    });
  }
}

export const legacyService = new LegacyService();
