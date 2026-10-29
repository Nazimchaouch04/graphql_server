import sqlite3 from 'sqlite3';

// Connexion à une base de données stockée dans un fichier local
const db = new sqlite3.Database('./database.sqlite');

// Initialisation de la table Produits au démarrage
db.serialize(() => {
 db.run(`
  CREATE TABLE IF NOT EXISTS produits (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Changement de type ici
    nom TEXT NOT NULL,
    sku TEXT NOT NULL UNIQUE,
    prix REAL NOT NULL,
    quantiteStock INTEGER NOT NULL
  )
  `);

  // On insère des données initiales uniquement si la table est vide
  db.get("SELECT COUNT(*) as count FROM produits", [], (err, row) => {
    if (row && row.count === 0) {
      const stmt = db.prepare("INSERT INTO produits VALUES (?, ?, ?, ?, ?)");
      stmt.run("101", "Ordinateur Portable Enterprise", "LAP-ENT-01", 1299.99, 15);
      stmt.run("102", "Écran 4K Pro Display", "MON-4K-02", 599.99, 3);
      stmt.run("103", "Souris Ergonomique Sans Fil", "MOU-WRL-03", 89.99, 25);
      stmt.run("104", "Clavier Mécanique RGB", "KEY-MEC-04", 149.99, 2);
      stmt.finalize();
      console.log("💾 Base de données SQLite initialisée avec les produits de production !");
    }
  });
});

export default db;
