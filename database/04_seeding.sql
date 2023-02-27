INSERT INTO "sport"("name")
VALUES
('escalade'),
('running'),
('cyclisme'),
('sports de glisse - mer'),
('sports de glisse - montagne'),
('sports de glisse - urbain'),
('randonnée'),
('vtt'),
('fitness'),
('natation'),
('yoga'),
('autre sport');


INSERT INTO "user" ("firstname", "lastname", "login", "password", "age", "bio", "email", "location_id") VALUES
('Amélie', 'Perrin', 'aperrin', 'motdepasse1', '1990-05-12T00:00:00.000Z', 'Je suis passionnée de photographie et de nature.', 'aperrin@example.com', 20),
('Léo', 'Fournier', 'lfournier', 'motdepasse2', '1991-11-23T00:00:00.000Z', 'Jaime les sports d''aventure et les défis.', 'lfournier@example.com', 115),
('Marie', 'Gauthier', 'mgauthier', 'motdepasse3', '1993-08-17T00:00:00.000Z', 'Je suis une grande fan de musique et de danse.', 'mgauthier@example.com', 32),
('Sophie', 'Renaud', 'srenaud', 'motdepasse4', '1992-06-03T00:00:00.000Z', 'Jadore voyager et découvrir de nouvelles cultures.', 'srenaud@example.com', 49),
('Thomas', 'Dupont', 'tdupont', 'motdepasse5', '1989-03-28T00:00:00.000Z', 'Je suis passionné par linformatique et les nouvelles technologies.', 'tdupont@example.com', 1456),
('Laura', 'Lefebvre', 'llefebvre', 'motdepasse6', '1987-12-14T00:00:00.000Z', 'Jaime la lecture, les voyages et les animaux.', 'llefebvre@example.com', 236),
('Julien', 'Rousseau', 'jrousseau', 'motdepasse7', '1995-02-09T00:00:00.000Z', 'Je suis un grand sportif et je pratique régulièrement la course à pied.', 'jrousseau@example.com', 40),
('Elodie', 'Mercier', 'emercier', 'motdepasse8', '1986-09-25T00:00:00.000Z', 'Je suis passionnée de cuisine et jadore préparer de bons petits plats pour mes amis.', 'emercier@example.com', 383),
('Antoine', 'Berger', 'aberger', 'motdepasse9', '1988-07-11T00:00:00.000Z', 'Je suis un grand amateur de vin et jaime découvrir de nouveaux crus.', 'aberger@example.com', 285),
('Aurélie', 'Girard', 'agirard', 'motdepasse10', '1994-04-26T00:00:00.000Z', 'Je suis passionnée par la mode et les tendances.', 'agirard@example.com', 165);


INSERT INTO "activity" ("title", "note", "description", "family_tag", "sport_id", "user_id", "location_id")
 VALUES
('Escalade en falaise', 1, 'Sortie descalade en falaise, niveau confirmé.', true, 1, 2, 326),
('Jogging en forêt', 2, 'Balade en forêt pour un jogging relaxant.', false, 2, 1, 541),
('Sortie à vélo', 3, 'Belle randonnée à vélo en montagne.', true, 3, 3, 2052),
('Surf en mer', 2, 'Session de surf dans les vagues.', false, 4, 4, 746),
('Ski freeride', 3, 'Descente en ski freeride dans les Alpes.', false, 5, 4, 637),
('Roller urbain', 2, 'Balade en roller dans les rues de la ville.', true, 6, 2, 4568),
('Randonnée en montagne', 3, 'Randonnée en montagne avec un guide expérimenté.', true, 7, 6, 852),
('VTT en forêt', 1, 'Sortie VTT en forêt sur des parcours techniques.', false, 8, 7, 1463),
('Fitness en salle', 2, 'Séance de fitness dans une salle de sport.', true, 9, 8, 502),
('Nage en eau libre', 3, 'Nage en eau libre dans un lac de montagne.', false, 10, 3, 276),
('Yoga en plein air', 1, 'Séance de yoga en plein air, face à la nature.', true, 11, 6, 424),
('Initiation à lescrime', 1, 'Découverte de lescrime avec un maître darmes.', false, 7, 4, 343);


INSERT INTO "comment"("content","activity_note","user_id","activity_id")
VALUES
('Super séance, jai senti mes muscles travailler!', 1, 4, 2),
('Très bon entraînement, jai réussi à améliorer mes performances!', 2, 8, 5),
('Jai adoré faire de la randonnée, la vue était magnifique!', 3, 3, 7),
('Entraînement intense mais ça en vaut la peine pour les résultats!', 3, 1, 6),
('Natation rafraîchissante dans la piscine, jadore!', 2, 5, 3),
('Belle journée pour faire du vélo de montagne, jai adoré!', 1, 6, 8),
('Jai aimé les mouvements de gymnastique, ils sont tellement gracieux!', 3, 9, 4),
('Entraînement de boxe stimulant, je suis prêt pour mon prochain combat!', 1, 2, 1),
('Jadore le tennis, cest mon sport préféré!', 3, 7, 10),
('Le cours de yoga était très relaxant, je me sens bien reposé!', 2, 4, 9);