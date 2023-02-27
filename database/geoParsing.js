const fs = require("fs");

// Constantes pour les chemins d'accès aux fichiers
const inputFilePath = "./geo.json";
const outputFilePath = "./nouveau_fichier.json";
const sqlOutputFilePath = "seeding_location.sql";

try {
  // Lecture du fichier JSON d'origine
  const rawData = fs.readFileSync(inputFilePath);
  const data = JSON.parse(rawData);

  // Extraction des champs demandés pour chaque objet JSON
  const new_data = data.map(({ nom, codesPostaux, departement }) => ({
    nom,
    codesPostaux,
    departement: {
      nom: departement.nom,
    },
  }));

  // Écriture du nouveau fichier JSON
  fs.writeFileSync(outputFilePath, JSON.stringify(new_data));

  // Lecture du nouveau fichier JSON
  const cities = JSON.parse(fs.readFileSync(outputFilePath));

  // Convertir les données en format PostgreSQL
  const sqlData = cities.map(({ nom, codesPostaux, departement }) => {
    const nom_sql = nom.replace(/'/g, "''"); // Remplacer les apostrophes simples par des doubles apostrophes
    const codepostal_sql = codesPostaux.join(",").replace(/[{}]/g, ""); // Convertir en chaîne et supprimer les accolades {}
    const departement_sql = departement.nom.replace(/'/g, "''"); // Remplacer les apostrophes simples par des doubles apostrophes
    return `('${nom_sql}', '${codepostal_sql}', '${departement_sql}')`;
  });

  // Écrire les données formatées dans un nouveau fichier SQL
  fs.writeFileSync(
    sqlOutputFilePath,
    `INSERT INTO location(nom, codepostal, departement) VALUES\n${sqlData.join(
      ",\n"
    )};\n`
  );
} catch (error) {
  console.error(error);
}
