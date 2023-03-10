// Importation de la bibliothèque Multer pour la gestion des fichiers
import multer from 'multer';

// Définition de la taille maximale autorisée pour les fichiers (20 Mo)
const maxSize = 20 * 1024 * 1024;

// Configuration de l'emplacement de stockage des fichiers uploadés et du nom de fichier
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './app/photos');
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Exportation de la fonction d'upload de fichiers, qui utilise Multer
export const uploadFile = multer({
  storage: storage, // Configuration de l'emplacement de stockage des fichiers uploadés
  limits: { fileSize: maxSize }, // Configuration de la taille maximale autorisée pour les fichiers
}).array('photo'); // Configuration de la propriété name de l'input file HTML
