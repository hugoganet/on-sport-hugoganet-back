INSERT INTO "sport"("name","icon")
VALUES
('athlétisme', 'athlétisme'),
('natation', 'natation'),
('tennis', 'tennis'),
('gymnastique', 'gymnastique'),
('ski alpin', 'ski alpin'),
('escalade', 'escalade'),
('golf', 'golf'),
('boxe', 'boxe'),
('judo', 'judo'),
('cyclisme', 'cyclisme'),
('sport de glisse - mer','glisse_mer');

INSERT INTO "location"("department","city")
VALUES
('seine et marne','fontainebleau'),
('rhône alpes','lyon'),
('hauts-de-france','roubaix'),
('landes','hossegor'),
('loire-atlantique', 'nantes'),
('haute-garonne', 'toulouse'),
('ille-et-vilaine', 'rennes'),
('bas-rhin', 'strasbourg'),
('vaucluse', 'avignon'),
('hérault', 'montpellier'),
('isère', 'grenoble'),
('pyrénées-atlantiques', 'pau'),
('calvados', 'caen'),
('var', 'toulon');

INSERT INTO "user"("firstname","lastname","login","password","email")
VALUES
('John','Doe','johndoe','test','john.doe@gmail.com'),
('Sophie', 'Martin', 'smart', 'P@ssword123', 'sophie.martin@email.com'),
('Tom', 'Johnson', 'tjohnson', 'SecurePassword456', 'tjohnson@email.com'),
('Emma', 'Garcia', 'emmag', '1234Abcd', 'emma.garcia@email.com'),
('William', 'Taylor', 'wtaylor', 'qwerty1234', 'william.taylor@email.com'),
('Olivia', 'Anderson', 'oanderson', 'Abcde@123', 'olivia.anderson@email.com'),
('Ethan', 'Lee', 'ethanl', 'Password123!', 'ethan.lee@email.com'),
('Ava', 'Clark', 'aclark', 'Clark!123', 'ava.clark@email.com'),
('Lucas', 'Hall', 'lh34', 'P@ssw0rd', 'lucas.hall@email.com');

INSERT INTO "activity"("title","sport_id","user_id")
VALUES
('Entraînement de course à pied', 6, 4),
('Séance de musculation', 9, 7),
('Entraînement de gymnastique', 4, 1),
('Randonnée en montagne', 10, 8),
('Entraînement de boxe', 7, 3),
('Cours de yoga', 11, 2),
('Vélo de montagne en solitaire', 10, 5),
('Entraînement de sprint', 6, 9),
('Natation en eau libre', 2, 6),
('Cours de tennis privé', 3, 1);

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