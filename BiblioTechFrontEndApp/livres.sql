/* ============================
   NETTOYAGE DES TABLES
============================ */
DELETE FROM Livres;
DELETE FROM Categories;

DBCC CHECKIDENT ('Categories', RESEED, 0);
DBCC CHECKIDENT ('Livres', RESEED, 0);

/* ============================
   INSERTION DES CATEGORIES
============================ */
INSERT INTO Categories (Nom, Description) VALUES
('Romans classiques', 'Grands romans de la littérature classique'),
('Science-Fiction', 'Anticipation, futur et technologies'),
('Fantasy', 'Magie, mondes imaginaires et quêtes'),
('Policier / Thriller', 'Enquêtes, suspense et crimes'),
('Romance', 'Histoires d’amour et relations'),
('Philosophie', 'Réflexions et pensée philosophique'),
('Histoire', 'Histoire du monde et témoignages'),
('Jeunesse', 'Livres pour enfants et adolescents'),
('Poésie', 'Œuvres poétiques et vers'),
('Sciences', 'Vulgarisation et sciences pures');

/* ============================
   LIVRES - CATEGORIE 1
============================ */
INSERT INTO Livres (Titre, Auteur, Annee, NbExemplaires, CategorieId) VALUES
('Les Misérables','Victor Hugo',1862,5,1),
('Madame Bovary','Gustave Flaubert',1857,4,1),
('Germinal','Émile Zola',1885,6,1),
('Le Rouge et le Noir','Stendhal',1830,3,1),
('La Chartreuse de Parme','Stendhal',1839,3,1),
('Notre-Dame de Paris','Victor Hugo',1831,5,1),
('Bel-Ami','Guy de Maupassant',1885,4,1),
('Le Père Goriot','Balzac',1835,2,1),
('Candide','Voltaire',1759,6,1),
('L’Étranger','Albert Camus',1942,5,1);

/* ============================
   LIVRES - CATEGORIE 2
============================ */
INSERT INTO Livres VALUES
('Dune','Frank Herbert',1965,5,2),
('Fondation','Isaac Asimov',1951,4,2),
('Neuromancien','William Gibson',1984,3,2),
('1984','George Orwell',1949,6,2),
('Fahrenheit 451','Ray Bradbury',1953,4,2),
('Le Meilleur des mondes','Aldous Huxley',1932,5,2),
('Blade Runner','Philip K. Dick',1968,3,2),
('La Guerre des mondes','H.G. Wells',1898,2,2),
('Snow Crash','Neal Stephenson',1992,4,2),
('Hyperion','Dan Simmons',1989,3,2);

/* ============================
   LIVRES - CATEGORIE 3
============================ */
INSERT INTO Livres VALUES
('Le Seigneur des Anneaux 1','J.R.R. Tolkien',1954,6,3),
('Le Seigneur des Anneaux 2','J.R.R. Tolkien',1954,6,3),
('Le Seigneur des Anneaux 3','J.R.R. Tolkien',1955,6,3),
('Harry Potter 1','J.K. Rowling',1997,8,3),
('Harry Potter 2','J.K. Rowling',1998,8,3),
('Harry Potter 3','J.K. Rowling',1999,7,3),
('Le Hobbit','J.R.R. Tolkien',1937,5,3),
('Eragon','Christopher Paolini',2002,4,3),
('La Roue du Temps','Robert Jordan',1990,3,3),
('The Witcher','Andrzej Sapkowski',1993,4,3);

/* ============================
   LIVRES - CATEGORIE 4
============================ */
INSERT INTO Livres VALUES
('Le Crime de l’Orient-Express','Agatha Christie',1934,5,4),
('Mort sur le Nil','Agatha Christie',1937,4,4),
('Da Vinci Code','Dan Brown',2003,6,4),
('Shutter Island','Dennis Lehane',2003,3,4),
('Millénium 1','Stieg Larsson',2005,5,4),
('Millénium 2','Stieg Larsson',2006,4,4),
('Millénium 3','Stieg Larsson',2007,4,4),
('Le Silence des Agneaux','Thomas Harris',1988,3,4),
('Gone Girl','Gillian Flynn',2012,4,4),
('Le Chien des Baskerville','Arthur Conan Doyle',1902,2,4);

/* ============================
   LIVRES - CATEGORIE 5
============================ */
INSERT INTO Livres VALUES
('Orgueil et Préjugés','Jane Austen',1813,5,5),
('Jane Eyre','Charlotte Brontë',1847,4,5),
('Outlander','Diana Gabaldon',1991,4,5),
('After','Anna Todd',2014,6,5),
('Me Before You','Jojo Moyes',2012,5,5),
('PS I Love You','Cecelia Ahern',2004,4,5),
('Twilight','Stephenie Meyer',2005,6,5),
('Call Me By Your Name','André Aciman',2007,3,5),
('Love Story','Erich Segal',1970,2,5),
('The Notebook','Nicholas Sparks',1996,3,5);

/* ============================
   LIVRES - CATEGORIE 6
============================ */
INSERT INTO Livres VALUES
('Le Banquet','Platon',-380,3,6),
('La République','Platon',-375,2,6),
('Ainsi parlait Zarathoustra','Nietzsche',1883,4,6),
('Critique de la raison pure','Kant',1781,2,6),
('Le Contrat social','Rousseau',1762,5,6),
('Discours de la méthode','Descartes',1637,4,6),
('L’Être et le Néant','Sartre',1943,3,6),
('Le Mythe de Sisyphe','Camus',1942,4,6),
('Éthique','Spinoza',1677,2,6),
('Méditations','Marc Aurèle',180,3,6);

/* ============================
   LIVRES - CATEGORIE 7
============================ */
INSERT INTO Livres VALUES
('Histoire de France','Georges Duby',1990,4,7),
('La Révolution française','François Furet',1978,3,7),
('Napoléon','Jean Tulard',1987,2,7),
('Histoire romaine','Tite-Live',20,2,7),
('Seconde Guerre mondiale','Antony Beevor',2012,4,7),
('La Guerre froide','Eric Hobsbawm',1994,3,7),
('Moyen Âge','Jacques Le Goff',1980,4,7),
('Histoire de l’Islam','Malek Chebel',2004,3,7),
('Empire ottoman','Gilles Veinstein',2002,2,7),
('Antiquité grecque','Pierre Vidal-Naquet',1995,3,7);

/* ============================
   LIVRES - CATEGORIE 8
============================ */
INSERT INTO Livres VALUES
('Le Petit Prince','Saint-Exupéry',1943,8,8),
('Charlie et la chocolaterie','Roald Dahl',1964,6,8),
('Matilda','Roald Dahl',1988,5,8),
('Chair de poule','R.L. Stine',1992,6,8),
('Percy Jackson','Rick Riordan',2005,5,8),
('Journal d’un dégonflé','Jeff Kinney',2007,7,8),
('Narnia','C.S. Lewis',1950,4,8),
('Astérix','Goscinny',1961,8,8),
('Les Schtroumpfs','Peyo',1960,6,8),
('Tintin','Hergé',1930,7,8);

/* ============================
   LIVRES - CATEGORIE 9
============================ */
INSERT INTO Livres VALUES
('Les Fleurs du mal','Baudelaire',1857,4,9),
('Poésies','Rimbaud',1870,3,9),
('Alcools','Apollinaire',1913,3,9),
('Les Contemplations','Victor Hugo',1856,4,9),
('Calligrammes','Apollinaire',1918,2,9),
('Paroles','Jacques Prévert',1946,4,9),
('Poèmes saturniens','Verlaine',1866,3,9),
('Odes','Horace',-23,2,9),
('Sonnets','Shakespeare',1609,3,9),
('Élégies','Rilke',1923,2,9);

/* ============================
   LIVRES - CATEGORIE 10
============================ */
INSERT INTO Livres VALUES
('Une brève histoire du temps','Stephen Hawking',1988,4,10),
('Le Grand Design','Stephen Hawking',2010,3,10),
('Cosmos','Carl Sagan',1980,5,10),
('L’Origine des espèces','Darwin',1859,2,10),
('Astrophysique pour les nuls','Neil Tyson',2017,4,10),
('Le Gène égoïste','Richard Dawkins',1976,3,10),
('Physique quantique','Einstein',1920,2,10),
('Biologie moléculaire','Watson',1968,3,10),
('Mathématiques','Bourbaki',1950,2,10),
('Intelligence artificielle','Russell & Norvig',2020,5,10);

/* ============================
   VERIFICATION
============================ */
SELECT * FROM Categories;
SELECT COUNT(*) AS TotalLivres FROM Livres;
