INSERT INTO sport("name","icon") VALUES('Escalade','escalade');
INSERT INTO sport("name","icon") VALUES('Running','running');
INSERT INTO sport("name","icon") VALUES('Cyclisme','cyclisme');
INSERT INTO sport("name","icon") VALUES('Sport de glisse - MER','glisse_mer');
__

INSERT INTO location("department","city") VALUES('Seine et Marne','Fontainebleau');
INSERT INTO location("department","city") VALUES('Rhône Alpes','Lyon');
INSERT INTO location("department","city") VALUES('Hauts-de-France','Roubaix');
INSERT INTO location("department","city") VALUES('Landes','Hossejor');
__

INSERT INTO user("firstname","lastname","login","password","email")
VALUES('John','Doe','johndoe','test','john.doe@gmail.com');
__

INSERT INTO activity("title","sport_id","user_id")VALUES('Parcours 5C',1,1);

__

INSERT INTO comment("content","user_id","activity_id")VALUES('Très bonne journée, activité top',1,1);