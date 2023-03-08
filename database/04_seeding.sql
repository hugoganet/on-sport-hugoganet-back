INSERT INTO "sport"("name")
VALUES
-- Insertion d'une liste de sports par défaut
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


INSERT INTO "user" ("firstname", "lastname", "login", "password", "age", "bio", "email", "location_id")
VALUES
-- Insertion d'une liste d'utilisateurs par défaut
('Amélie', 'Perrin', 'aperrin', 'motdepasse1', '1990-05-12', 'Je suis passionnée de photographie et de nature.', 'aperrin@example.com', 20),
('Léo', 'Fournier', 'lfournier', 'motdepasse2', '2000-11-23', 'J''aime les sports d''aventure et les défis.', 'lfournier@example.com', 115),
('Marie', 'Gauthier', 'mgauthier', 'motdepasse3', '2001-08-17', 'Je suis une grande fan de musique et de danse.', 'mgauthier@example.com', 32),
('Sophie', 'Renaud', 'srenaud', 'motdepasse4', '2003-06-03', 'J''adore voyager et découvrir de nouvelles cultures.', 'srenaud@example.com', 49),
('Thomas', 'Dupont', 'tdupont', 'motdepasse5', '1993-03-28', 'Je suis passionné par l''informatique et les nouvelles technologies.', 'tdupont@example.com', 1456),
('Laura', 'Lefebvre', 'llefebvre', 'motdepasse6', '1998-12-14', 'J''aime la lecture, les voyages et les animaux.', 'llefebvre@example.com', 236),
('Julien', 'Rousseau', 'jrousseau', 'motdepasse7', '1995-02-09', 'Je suis un grand sportif et je pratique régulièrement la course à pied.', 'jrousseau@example.com', 40),
('Elodie', 'Mercier', 'emercier', 'motdepasse8', '2004-09-25', 'Je suis passionnée de cuisine et j''adore préparer de bons petits plats pour mes amis.', 'emercier@example.com', 383),
('Antoine', 'Berger', 'aberger', 'motdepasse9', '1964-07-11', 'Je suis un grand amateur de vin et j''aime découvrir de nouveaux crus.', 'aberger@example.com', 285),
('Aurélie', 'Girard', 'agirard', 'motdepasse10', '1994-04-26', 'Je suis passionnée par la mode et les tendances.', 'agirard@example.com', 165);



INSERT INTO "activity" ("title", "note", "description", "family_tag", "sport_id", "user_id", "location_id")
VALUES
-- Insertion d'une liste d'activités par défaut
('Escalade en falaise', 1, 'Sortie d''escalade en falaise, niveau confirmé.', true, 1, 2, 326),
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
('Initiation à l''escrime', 1, 'Découverte de l''escrime avec un maître d''armes.', false, 12, 4, 343);

INSERT INTO "comment"("content","activity_note","user_id","activity_id")
VALUES
-- Commentaires pour l'activité "Escalade en falaise"
('Superbe sortie, la falaise était magnifique !', 3, 5, 1),
('Belle journée, le niveau était bien adapté pour moi.', 2, 9, 1),
('J''ai beaucoup appris avec le guide, je recommande.', 3, 8, 1),
('Une sortie mémorable, merci à toute l''équipe !', 3, 4, 1),
('Pas facile mais tellement satisfaisant, je suis fier de moi !', 2, 6, 1),

-- Commentaires pour l'activité "Jogging en forêt"
('Un moment de détente et de nature, j''ai adoré.', 3, 3, 2),
('Parfait pour se vider la tête et se ressourcer.', 2, 10, 2),
('Belle découverte de la forêt, je suis enchanté.', 3, 7, 2),
('Séance sportive agréable, à refaire sans hésitation.', 2, 2, 2),
('J''ai trouvé la motivation pour me remettre au sport, merci !', 1, 1, 2),

-- Commentaires pour l'activité "Sortie à vélo"
('Un parcours magnifique, merci pour cette belle journée.', 3, 6, 3),
('J''ai adoré les paysages et les sensations sur le vélo.', 2, 7, 3),
('Très bon encadrement, je me suis senti en sécurité tout le long.', 3, 8, 3),
('Belle sortie sportive en montagne, je recommande vivement.', 2, 3, 3),
('J''ai été impressionné par la beauté des montagnes, merci !', 1, 1, 3),

-- Commentaires pour l'activité "Surf en mer"
('Superbe expérience, les vagues étaient parfaites !', 3, 5, 4),
('Une belle journée en mer, j''ai progressé en surf.', 2, 9, 4),
('Merci au moniteur pour ses conseils, je me suis régalé.', 3, 8, 4),
('Séance de surf géniale, je recommande à tous les amateurs.', 3, 4, 4),
('J''ai pris mon premier tube, c''était magique !', 2, 6, 4),

-- Commentaires pour l'activité "Ski freeride"
('Descente incroyable, une journée que je n''oublierai pas !', 3, 3, 5),
('Le guide était super, j''ai pu découvrir de nouveaux spots.', 2, 10, 5),
('La poudreuse était au rendez-vous, merci pour cette sortie.', 3, 7, 5),
('J''ai pris beaucoup de plaisir, même si j''ai chuté plusieurs fois.', 2, 2, 5),
('Une journée de ski freeride inoubliable, merci à tous !', 1, 1, 5),

-- Commentaires pour l'activité "Roller urbain"
('J''ai adoré cette activité ! Les guides étaient super sympas et le parcours était vraiment fun. Je recommande !', 5, 3, 6),
('Super sortie en roller ! Les paysages étaient magnifiques et l''ambiance était géniale.', 4, 8, 6),
('Une super expérience ! Le guide était très professionnel et nous avons pu découvrir la ville sous un autre angle.', 5, 2, 6),
('Une super activité en famille, les enfants ont adoré ! Les guides étaient très sympas et ont su s''adapter à notre rythme.', 4, 7, 6),
('Une balade en roller très agréable, les guides ont été aux petits soins avec nous. Je recommande !', 5, 9, 6),

-- Commentaires pour l'activité "Randonnée en montagne"
('Magnifique randonnée en montagne ! Notre guide a été super et les vues étaient époustouflantes.', 5, 1, 7),
('Une superbe expérience de randonnée, nous avons vu des paysages incroyables ! Notre guide était très compétent et sympathique.', 5, 5, 7),
('Randonnée difficile mais magnifique, notre guide a été très encourageant et nous a permis de réaliser cet exploit !', 1, 6, 7),
('Superbe randonnée en montagne, les paysages étaient grandioses et notre guide était très sympathique.', 3, 10, 7),

-- Commentaires pour l'activité "VTT en forêt"

('Super parcours en VTT, notre guide était très sympa et les pistes étaient top !', 5, 8, 8),
('Une belle aventure en VTT en forêt, les paysages étaient magnifiques et notre guide était très compétent.', 4, 4, 8),
('Journée superbe en VTT ! Notre guide était très professionnel et nous avons découvert des paysages exceptionnels.', 5, 2, 8),
('Super expérience de VTT en forêt, les pistes étaient très bien entretenues et notre guide a été super !', 5, 6, 8),
('VTT en forêt très sympa, notre guide était très pédagogue et nous avons appris plein de choses sur la nature.', 4, 9, 8),

-- Commentaires pour l'activité "Fitness en salle"
('La salle de sport était très bien équipée et l''entraîneur était super motivant !', 5, 3, 9),
('Super salle de sport, les équipements sont top et les coachs sont très professionnels.', 2, 7, 9),
('Une super séance de fitness en salle, le coach était très motivant et les exercices étaient variés.', 3, 5, 9),
('Séance de fitness très agréable, les équipements étaient modernes et notre coach était très sympa.', 4, 10, 9),
('Très bonne séance de sport, la salle était très bien équipée et le coach était très compétent.', 5, 2, 9),

-- Commentaires pour l'activité "Nage en eau libre"
('La baignade en mer était rafraîchissante et le guide était très professionnel.', 4, 4, 10),
('Super expérience de nage en eau libre, les paysages étaient magnifiques et notre guide était très compétent.', 5, 1, 10),
('Très belle sortie en mer pour nager en eau libre, le guide était très sympa et les conditions étaient parfaites.', 2, 6, 10),
('Une superbe expérience de baignade en mer, notre guide était très professionnel et nous avons pu voir des poissons magnifiques.', 3, 9, 10),
('Très belle sortie en mer pour nager, le guide était très pédagogue et nous avons appris plein de choses sur la faune et la flore sous-marine.', 4, 8, 10),

-- Commentaires pour l'activité "Yoga en plein air"
('Le cours de yoga était très relaxant et l''instructeur était très compétent.', 4, 4, 11),
('Superbe séance de yoga en plein air, les paysages étaient magnifiques et notre instructeur était très professionnel.', 5, 1, 11),
('Une belle expérience de yoga en plein air, notre instructeur était très sympa et les exercices étaient adaptés à tous les niveaux.', 5, 6, 11),
('Une superbe expérience de yoga en pleine nature, notre instructeur était très compétent et nous avons pu nous relaxer pleinement.', 5, 9, 11),
('Très belle séance de yoga en plein air, notre instructeur était très pédagogue et nous avons pu nous reconnecter avec la nature.', 4, 8, 11),

-- Commentaires pour l'activité "Initiation à l'escrime"
('J''ai adoré cette initiation à l''escrime, l''instructeur était très compétent et l''ambiance était géniale !', 5, 3, 12),
('Super expérience d''initiation à l''escrime, l''instructeur était très professionnel et nous avons beaucoup appris.', 1, 7, 12),
('Très bonne initiation à l''escrime, l''instructeur était très sympathique et les exercices étaient adaptés à tous les niveaux.', 2, 5, 12),
('Séance d''initiation à l''escrime très agréable, l''instructeur était très compétent et nous avons beaucoup apprécié l''activité.', 3, 10, 12),
('Très bonne séance d''initiation à l''escrime, l''instructeur était très pédagogue et nous avons pu découvrir les bases de ce sport.', 5, 2, 12);

INSERT INTO "photo"("name","activity_id")
VALUES
-- Insertion des photos pour les activités
('01.01.jpg',1),('01.02.jpg',1),('01.03.jpg',1),('01.04.jpg',1),('01.05.jpg',1),('01.06.jpg',1),('01.07.jpg',1),('01.08.jpg',1),
('02.01.jpg',2),('02.02.jpg',2),('02.03.jpg',2),('02.04.jpg',2),('02.05.jpg',2),('02.06.jpg',2),
('03.01.jpg',3),('03.02.jpg',3),('03.03.jpg',3),('03.04.jpg',3),('03.05.jpg',3),('03.06.jpg',3),
('04.01.jpg',4),('04.02.jpg',4),('04.03.jpg',4),('04.04.jpg',4),('04.05.jpg',4),('04.06.jpg',4),('04.07.jpg',4),('04.08.jpg',4),('04.09.jpg',4),('04.10.jpg',4),('04.11.jpg',4),
('05.01.jpg',5),('05.02.jpg',5),('05.03.jpg',5),('05.04.jpg',5),('05.05.jpg',5),('05.06.jpg',5),('05.07.jpg',5),('05.08.jpg',5),('05.09.jpg',5),('05.10.jpg',5),('05.11.jpg',5),('05.12.jpg',5),('05.13.jpg',5),
('06.01.jpg',6),('06.02.jpg',6),('06.03.jpg',6),('06.04.jpg',6),('06.05.jpg',6),('06.06.jpg',6),('06.07.jpg',6),('06.08.jpg',6),('06.09.jpg',6),('06.10.jpg',6),
('07.01.jpg',7),('07.02.jpg',7),('07.03.jpg',7),('07.04.jpg',7),('07.05.jpg',7),('07.06.jpg',7),('07.07.jpg',7),('07.08.jpg',7),('07.09.jpg',7),('07.10.jpg',7),('07.11.jpg',7),
('08.01.jpg',8),('08.02.jpg',8),('08.03.jpg',8),('08.04.jpg',8),('08.05.jpg',8),('08.06.jpg',8),
('09.01.jpg',9),('09.02.jpg',9),('09.03.jpg',9),('09.04.jpg',9),('09.05.jpg',9),('09.06.jpg',9),('09.07.jpg',9),('09.08.jpg',9),
('10.01.jpg',10),('10.02.jpg',10),('10.03.jpg',10),('10.04.jpg',10),('10.05.jpg',10),('10.06.jpg',10),
('11.01.jpg',11),('11.02.jpg',11),('11.03.jpg',11),('11.04.jpg',11),('11.05.jpg',11),('11.06.jpg',11),('11.07.jpg',11),('11.08.jpg',11),
('12.01.jpg',12),('12.02.jpg',12),('12.03.jpg',12),('12.04.jpg',12),('12.05.jpg',12),('12.06.jpg',12);

INSERT INTO "photo"("name","user_id")
VALUES
-- Insertion des photos de profil pour les users
('PR01.jpg',1),('PR02.jpg',2),('PR03.jpg',3),('PR04.jpg',4),('PR05.jpg',5),('PR06.jpg',6),('PR07.jpg',7),('PR08.jpg',8),('PR09.jpg',9),('PR10.jpg',10);