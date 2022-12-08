use areyna_cs355fa22;

DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS Playlist_Song;
DROP TABLE IF EXISTS Song;
DROP TABLE IF EXISTS Playlist;
DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
	username VARCHAR(50) PRIMARY KEY,
    `password` VARCHAR(20),
    firstName VARCHAR(30),
    lastName VARCHAR(30)
);

CREATE TABLE Playlist (
	id VARCHAR(200),
    username VARCHAR(50),
    `name` VARCHAR(100),
    PRIMARY KEY(id, username),
    FOREIGN KEY (username) REFERENCES `User`(username)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Song (
	id VARCHAR(200),
    `name` VARCHAR(200),
    album VARCHAR(200),
    artist VARCHAR(200),
    release_date VARCHAR(200),
    popularity BIGINT,
    danceability FLOAT,
    duration_ms BIGINT,
    energy FLOAT,
    valence FLOAT,
    explicit BOOL,
    PRIMARY KEY (id)
);

CREATE TABLE Playlist_Song (
	playlist VARCHAR(200),
    song VARCHAR(200),
    PRIMARY KEY (Playlist, Song),
    FOREIGN KEY (playlist) REFERENCES Playlist(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (song) REFERENCES Song(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Genres (
	song VARCHAR(200),
    genre VARCHAR(50),
    PRIMARY KEY (song, genre),
    FOREIGN KEY (song) REFERENCES Song(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- VIEW: RETURNS ALL USERS FIRST AND LAST NAME -- 
DROP VIEW IF EXISTS all_users_names;

CREATE OR REPLACE VIEW all_users_names AS 
	SELECT firstname, lastname
    FROM `User`;
    
-- VIEW: RETURNS A LIST OF SONGS THAT ARE EXPLICIT --

DROP VIEW IF EXISTS explicit_playlist_songs;

CREATE OR REPLACE VIEW explicit_playlist_songs AS
	SELECT DISTINCT S.name as 'Song', P.name as 'Playlist', P.id as 'playlist_id'
	FROM Song S
	JOIN Playlist_Song PS
    JOIN Playlist P
	WHERE S.explicit = true
	ORDER BY S.name;

-- PROCEDURE: DELETES A USER IF THEY HAVE NO ASSOCIATED PLAYLISTS -- 
DROP PROCEDURE IF EXISTS delete_noplaylist_users;
DELIMITER //

CREATE PROCEDURE delete_noplaylist_users
(
	IN in_username VARCHAR(50)
)
BEGIN
	DECLARE hasPlaylist BOOLEAN DEFAULT FALSE;
    
    SET hasPlaylist = (SELECT EXISTS (
		SELECT *
        FROM Playlist
        WHERE username = in_username
    ));
    
    IF NOT hasPlaylist THEN
		DELETE FROM User WHERE username = in_username;
	END IF;
END //

DELIMITER ;

INSERT INTO User (username, `password`, firstname, lastname) VALUES ('areyna', 'password', 'Alana', 'Reyna');
INSERT INTO User (username, `password`, firstname, lastname) VALUES ('jhend', '1234', 'Joseph', 'Henderson');

INSERT INTO Playlist (id, username, name) VALUES ('15QIc4VPmevse1O4LYBpza', 'jhend', 'Plastic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('3I7OmVsk4Hm5LBbs2GmhlD', 'Reality In Motion', 'Currents', 'Tame Impala', '2015-07-17', 58, 0.536, 252026, 0.915, 0.472, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '3I7OmVsk4Hm5LBbs2GmhlD');
INSERT INTO Genres (song, genre) VALUES ('3I7OmVsk4Hm5LBbs2GmhlD', 'australian psych');
INSERT INTO Genres (song, genre) VALUES ('3I7OmVsk4Hm5LBbs2GmhlD', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('4RpwQDPnn1GhWpZooUcCzd', 'On the Level', 'This Old Dog', 'Mac DeMarco', '2017-05-05', 67, 0.573, 227653, 0.473, 0.523, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '4RpwQDPnn1GhWpZooUcCzd');
INSERT INTO Genres (song, genre) VALUES ('4RpwQDPnn1GhWpZooUcCzd', 'edmonton indie');
INSERT INTO Genres (song, genre) VALUES ('4RpwQDPnn1GhWpZooUcCzd', 'lo-fi indie');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('2lwi35A2ym3FAmSlvOGnQp', 'So Good At Being in Trouble', 'II', 'Unknown Mortal Orchestra', '2013-02-05', 66, 0.829, 230146, 0.435, 0.594, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '2lwi35A2ym3FAmSlvOGnQp');
INSERT INTO Genres (song, genre) VALUES ('2lwi35A2ym3FAmSlvOGnQp', 'alternative dance');
INSERT INTO Genres (song, genre) VALUES ('2lwi35A2ym3FAmSlvOGnQp', 'chillwave');
INSERT INTO Genres (song, genre) VALUES ('2lwi35A2ym3FAmSlvOGnQp', 'indie rock');
INSERT INTO Genres (song, genre) VALUES ('2lwi35A2ym3FAmSlvOGnQp', 'kiwi rock');
INSERT INTO Genres (song, genre) VALUES ('2lwi35A2ym3FAmSlvOGnQp', 'neo-psychedelic');
INSERT INTO Genres (song, genre) VALUES ('2lwi35A2ym3FAmSlvOGnQp', 'new rave');
INSERT INTO Genres (song, genre) VALUES ('2lwi35A2ym3FAmSlvOGnQp', 'portland hip hop');
INSERT INTO Genres (song, genre) VALUES ('2lwi35A2ym3FAmSlvOGnQp', 'psychedelic pop');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('0LtOwyZoSNZKJWHqjzADpW', 'Feels Like We Only Go Backwards', 'Lonerism', 'Tame Impala', '2012-01-01', 74, 0.303, 192960, 0.9, 0.491, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '0LtOwyZoSNZKJWHqjzADpW');
INSERT INTO Genres (song, genre) VALUES ('0LtOwyZoSNZKJWHqjzADpW', 'australian psych');
INSERT INTO Genres (song, genre) VALUES ('0LtOwyZoSNZKJWHqjzADpW', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('67PE7PvEYWXd2Ct6TBB2Ax', 'It Is Not Meant To Be', 'InnerSpeaker', 'Tame Impala', '2010-05-21', 42, 0.423, 321746, 0.9, 0.471, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '67PE7PvEYWXd2Ct6TBB2Ax');
INSERT INTO Genres (song, genre) VALUES ('67PE7PvEYWXd2Ct6TBB2Ax', 'australian psych');
INSERT INTO Genres (song, genre) VALUES ('67PE7PvEYWXd2Ct6TBB2Ax', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('4aetgBuI5iRQpjy8gdGxY8', 'Lucidity', 'InnerSpeaker', 'Tame Impala', '2010-05-21', 42, 0.37, 271880, 0.876, 0.515, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '4aetgBuI5iRQpjy8gdGxY8');
INSERT INTO Genres (song, genre) VALUES ('4aetgBuI5iRQpjy8gdGxY8', 'australian psych');
INSERT INTO Genres (song, genre) VALUES ('4aetgBuI5iRQpjy8gdGxY8', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('6eKEJZFWllRX4UALhPU967', 'Pseudologia Fantastica', 'Supermodel', 'Foster The People', '2014-03-14', 44, 0.286, 331186, 0.892, 0.374, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '6eKEJZFWllRX4UALhPU967');
INSERT INTO Genres (song, genre) VALUES ('6eKEJZFWllRX4UALhPU967', 'indietronica');
INSERT INTO Genres (song, genre) VALUES ('6eKEJZFWllRX4UALhPU967', 'modern rock');
INSERT INTO Genres (song, genre) VALUES ('6eKEJZFWllRX4UALhPU967', 'rock');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('4BdGO1CaObRD4La9l5Zanz', 'Sit Next to Me', 'Sacred Hearts Club', 'Foster The People', '2017-07-21', 70, 0.638, 243146, 0.738, 0.657, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '4BdGO1CaObRD4La9l5Zanz');
INSERT INTO Genres (song, genre) VALUES ('4BdGO1CaObRD4La9l5Zanz', 'indietronica');
INSERT INTO Genres (song, genre) VALUES ('4BdGO1CaObRD4La9l5Zanz', 'modern rock');
INSERT INTO Genres (song, genre) VALUES ('4BdGO1CaObRD4La9l5Zanz', 'rock');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('2a2MbiJN2skOxohykOVcss', 'Solitude Is Bliss', 'InnerSpeaker', 'Tame Impala', '2010-05-21', 57, 0.588, 235866, 0.849, 0.629, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '2a2MbiJN2skOxohykOVcss');
INSERT INTO Genres (song, genre) VALUES ('2a2MbiJN2skOxohykOVcss', 'australian psych');
INSERT INTO Genres (song, genre) VALUES ('2a2MbiJN2skOxohykOVcss', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('7qU7vhCPKhkDiJYGoboISc', 'Apocalypse Dreams', 'Lonerism', 'Tame Impala', '2012-01-01', 57, 0.496, 356946, 0.929, 0.267, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '7qU7vhCPKhkDiJYGoboISc');
INSERT INTO Genres (song, genre) VALUES ('7qU7vhCPKhkDiJYGoboISc', 'australian psych');
INSERT INTO Genres (song, genre) VALUES ('7qU7vhCPKhkDiJYGoboISc', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('2CgUaNGnbBYEIaKGzoLksn', 'Giant Tortoise', 'Hobo Rocket', 'Pond', '2013-01-01', 44, 0.297, 252653, 0.7, 0.259, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '2CgUaNGnbBYEIaKGzoLksn');
INSERT INTO Genres (song, genre) VALUES ('2CgUaNGnbBYEIaKGzoLksn', 'indie rock');
INSERT INTO Genres (song, genre) VALUES ('2CgUaNGnbBYEIaKGzoLksn', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('0SfIHS5x1gOCVVvnYFbw26', 'Windowpane', 'Timeline', 'Mild High Club', '2015-09-18', 53, 0.507, 237300, 0.722, 0.303, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '0SfIHS5x1gOCVVvnYFbw26');
INSERT INTO Genres (song, genre) VALUES ('0SfIHS5x1gOCVVvnYFbw26', 'indie garage rock');
INSERT INTO Genres (song, genre) VALUES ('0SfIHS5x1gOCVVvnYFbw26', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('6YGVK9xgH2LI4Ghw6gqUxx', 'Paint Me Silver', 'The Weather', 'Pond', '2017-05-05', 56, 0.335, 224973, 0.825, 0.682, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '6YGVK9xgH2LI4Ghw6gqUxx');
INSERT INTO Genres (song, genre) VALUES ('6YGVK9xgH2LI4Ghw6gqUxx', 'indie rock');
INSERT INTO Genres (song, genre) VALUES ('6YGVK9xgH2LI4Ghw6gqUxx', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('5VdLK7Kcqyf5RstFU0lhwh', 'Skeleton Tiger', 'Tame Impala', 'Tame Impala', '2008-01-01', 35, 0.611, 264800, 0.679, 0.495, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '5VdLK7Kcqyf5RstFU0lhwh');
INSERT INTO Genres (song, genre) VALUES ('5VdLK7Kcqyf5RstFU0lhwh', 'australian psych');
INSERT INTO Genres (song, genre) VALUES ('5VdLK7Kcqyf5RstFU0lhwh', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('6IY3cC281mz9q0bViUEldz', "It's A Trip!", 'Content', 'Joywave', '2017-07-28', 60, 0.673, 183524, 0.716, 0.727, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '6IY3cC281mz9q0bViUEldz');
INSERT INTO Genres (song, genre) VALUES ('6IY3cC281mz9q0bViUEldz', 'indie poptimism');
INSERT INTO Genres (song, genre) VALUES ('6IY3cC281mz9q0bViUEldz', 'indie rock');
INSERT INTO Genres (song, genre) VALUES ('6IY3cC281mz9q0bViUEldz', 'indietronica');
INSERT INTO Genres (song, genre) VALUES ('6IY3cC281mz9q0bViUEldz', 'modern alternative rock');
INSERT INTO Genres (song, genre) VALUES ('6IY3cC281mz9q0bViUEldz', 'modern rock');
INSERT INTO Genres (song, genre) VALUES ('6IY3cC281mz9q0bViUEldz', 'rochester ny indie');
INSERT INTO Genres (song, genre) VALUES ('6IY3cC281mz9q0bViUEldz', 'rock');
INSERT INTO Genres (song, genre) VALUES ('6IY3cC281mz9q0bViUEldz', 'shimmer pop');
INSERT INTO Genres (song, genre) VALUES ('6IY3cC281mz9q0bViUEldz', 'vapor soul');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('7aTL6T0ajAxzZcNHAMr1Wp', 'Oh the Saviour', 'Volcano', 'Temples', '2017-03-03', 29, 0.422, 225453, 0.749, 0.491, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '7aTL6T0ajAxzZcNHAMr1Wp');
INSERT INTO Genres (song, genre) VALUES ('7aTL6T0ajAxzZcNHAMr1Wp', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('5uIRujGRZv5t4fGKkUTv4n', 'Feeling Lonely', 'Soy Pablo', 'boy pablo', '2018-10-05', 62, 0.633, 197946, 0.537, 0.889, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '5uIRujGRZv5t4fGKkUTv4n');
INSERT INTO Genres (song, genre) VALUES ('5uIRujGRZv5t4fGKkUTv4n', 'bedroom pop');
INSERT INTO Genres (song, genre) VALUES ('5uIRujGRZv5t4fGKkUTv4n', 'bergen indie');
INSERT INTO Genres (song, genre) VALUES ('5uIRujGRZv5t4fGKkUTv4n', 'norwegian indie');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('7BaDRi8gmRnOducT6KaOfc', 'Put a Flower in Your Pocket', 'Yours, Dreamily,', 'The Arcs', '2015-08-28', 54, 0.492, 235320, 0.378, 0.428, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '7BaDRi8gmRnOducT6KaOfc');
INSERT INTO Genres (song, genre) VALUES ('7BaDRi8gmRnOducT6KaOfc', 'double drumming');
INSERT INTO Genres (song, genre) VALUES ('7BaDRi8gmRnOducT6KaOfc', 'garage rock');
INSERT INTO Genres (song, genre) VALUES ('7BaDRi8gmRnOducT6KaOfc', 'indie rock');
INSERT INTO Genres (song, genre) VALUES ('7BaDRi8gmRnOducT6KaOfc', 'modern blues rock');
INSERT INTO Genres (song, genre) VALUES ('7BaDRi8gmRnOducT6KaOfc', 'modern rock');
INSERT INTO Genres (song, genre) VALUES ('7BaDRi8gmRnOducT6KaOfc', 'punk blues');
INSERT INTO Genres (song, genre) VALUES ('7BaDRi8gmRnOducT6KaOfc', 'rock');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('4OQ9QaKIGEElvMb5edFo0h', 'Warmth of the Sun', 'Warmth of the Sun', 'levitation room', '2018-04-27', 43, 0.347, 168070, 0.737, 0.751, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '4OQ9QaKIGEElvMb5edFo0h');
INSERT INTO Genres (song, genre) VALUES ('4OQ9QaKIGEElvMb5edFo0h', 'indie garage rock');
INSERT INTO Genres (song, genre) VALUES ('4OQ9QaKIGEElvMb5edFo0h', 'neo-psychedelic');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ('6iCJCZqDJjmBxt07Oid6FI', 'Buttercup', 'Landmark', 'Hippo Campus', '2017-02-24', 62, 0.623, 226610, 0.763, 0.199, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ('15QIc4VPmevse1O4LYBpza', '6iCJCZqDJjmBxt07Oid6FI');
INSERT INTO Genres (song, genre) VALUES ('6iCJCZqDJjmBxt07Oid6FI', 'indie pop');
INSERT INTO Genres (song, genre) VALUES ('6iCJCZqDJjmBxt07Oid6FI', 'indie poptimism');
INSERT INTO Genres (song, genre) VALUES ('6iCJCZqDJjmBxt07Oid6FI', 'indie rock');
INSERT INTO Genres (song, genre) VALUES ('6iCJCZqDJjmBxt07Oid6FI', 'minneapolis indie');
INSERT INTO Genres (song, genre) VALUES ('6iCJCZqDJjmBxt07Oid6FI', 'modern rock');

INSERT INTO Playlist (id, username, name) VALUES ('6UG231qsIRfhtQ9MfPBmZD', 'areyna', 'Rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("4YH7AZpdCXEAGOsSAZYPOq", "My Mind Playin Tricks on Me", "Uncut Dope", "Geto Boys", "1992-11-17", 46, 0.888, 311786, 0.625, 0.421, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "4YH7AZpdCXEAGOsSAZYPOq");
INSERT INTO Genres (song, genre) VALUES ('4YH7AZpdCXEAGOsSAZYPOq', 'conscious hip hop');
INSERT INTO Genres (song, genre) VALUES ('4YH7AZpdCXEAGOsSAZYPOq', 'dirty south rap');
INSERT INTO Genres (song, genre) VALUES ('4YH7AZpdCXEAGOsSAZYPOq', 'g funk');
INSERT INTO Genres (song, genre) VALUES ('4YH7AZpdCXEAGOsSAZYPOq', 'gangster rap');
INSERT INTO Genres (song, genre) VALUES ('4YH7AZpdCXEAGOsSAZYPOq', 'golden age hip hop');
INSERT INTO Genres (song, genre) VALUES ('4YH7AZpdCXEAGOsSAZYPOq', 'hardcore hip hop');
INSERT INTO Genres (song, genre) VALUES ('4YH7AZpdCXEAGOsSAZYPOq', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('4YH7AZpdCXEAGOsSAZYPOq', 'old school hip hop');
INSERT INTO Genres (song, genre) VALUES ('4YH7AZpdCXEAGOsSAZYPOq', 'rap');
INSERT INTO Genres (song, genre) VALUES ('4YH7AZpdCXEAGOsSAZYPOq', 'southern hip hop');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("4ydmav4vl7hebadtfZtMrg", "SIR BAUDELAIRE (feat. DJ Drama)", "CALL ME IF YOU GET LOST", "Tyler, The Creator", "2021-06-25", 64, 0.467, 88624, 0.635, 0.51, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "4ydmav4vl7hebadtfZtMrg");
INSERT INTO Genres (song, genre) VALUES ('4ydmav4vl7hebadtfZtMrg', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('4ydmav4vl7hebadtfZtMrg', 'rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("7xQAfvXzm3AkraOtGPWIZg", "Wow.", "Hollywood's Bleeding", "Post Malone", "2019-09-06", 81, 0.829, 149546, 0.539, 0.388, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "7xQAfvXzm3AkraOtGPWIZg");
INSERT INTO Genres (song, genre) VALUES ('7xQAfvXzm3AkraOtGPWIZg', 'dfw rap');
INSERT INTO Genres (song, genre) VALUES ('7xQAfvXzm3AkraOtGPWIZg', 'melodic rap');
INSERT INTO Genres (song, genre) VALUES ('7xQAfvXzm3AkraOtGPWIZg', 'rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("66Q3fAmSX5eHamgbKa9alP", "Real Friends", "The Life Of Pablo", "Kanye West", "2016-06-10", 64, 0.441, 251573, 0.744, 0.124, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "66Q3fAmSX5eHamgbKa9alP");
INSERT INTO Genres (song, genre) VALUES ('66Q3fAmSX5eHamgbKa9alP', 'chicago rap');
INSERT INTO Genres (song, genre) VALUES ('66Q3fAmSX5eHamgbKa9alP', 'rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("0zLClc0emc6qUeV1p5nc99", "No More Parties In LA", "The Life Of Pablo", "Kanye West", "2016-06-10", 70, 0.508, 374413, 0.921, 0.681, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "0zLClc0emc6qUeV1p5nc99");
INSERT INTO Genres (song, genre) VALUES ('0zLClc0emc6qUeV1p5nc99', 'chicago rap');
INSERT INTO Genres (song, genre) VALUES ('0zLClc0emc6qUeV1p5nc99', 'rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("2CHmgtK8OCL28WtIK96u4N", "30 Hours", "The Life Of Pablo", "Kanye West", "2016-06-10", 63, 0.823, 323302, 0.813, 0.373, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "2CHmgtK8OCL28WtIK96u4N");
INSERT INTO Genres (song, genre) VALUES ('2CHmgtK8OCL28WtIK96u4N', 'chicago rap');
INSERT INTO Genres (song, genre) VALUES ('2CHmgtK8OCL28WtIK96u4N', 'rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("2lD6AoA8qf2t4Dkf2TcmNK", "Rigamortus", "Section.80", "Kendrick Lamar", "2011-07-02", 63, 0.52, 168591, 0.807, 0.628, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "2lD6AoA8qf2t4Dkf2TcmNK");
INSERT INTO Genres (song, genre) VALUES ('2lD6AoA8qf2t4Dkf2TcmNK', 'conscious hip hop');
INSERT INTO Genres (song, genre) VALUES ('2lD6AoA8qf2t4Dkf2TcmNK', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('2lD6AoA8qf2t4Dkf2TcmNK', 'rap');
INSERT INTO Genres (song, genre) VALUES ('2lD6AoA8qf2t4Dkf2TcmNK', 'west coast rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("7BR8gWAmH0NSEgLG5aVqww", "All Outta Ale", "The Prof Meets The SUPER VILLAIN", "MF DOOM", "2002-10-01", 35, 0.731, 206066, 0.838, 0.371, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "7BR8gWAmH0NSEgLG5aVqww");
INSERT INTO Genres (song, genre) VALUES ('7BR8gWAmH0NSEgLG5aVqww', 'alternative hip hop');
INSERT INTO Genres (song, genre) VALUES ('7BR8gWAmH0NSEgLG5aVqww', 'east coast hip hop');
INSERT INTO Genres (song, genre) VALUES ('7BR8gWAmH0NSEgLG5aVqww', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('7BR8gWAmH0NSEgLG5aVqww', 'rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("4WM1hvYr2NC6bQnQXcj3sH", "Meat Grinder", "Madvillainy", "Madvillain", "2004-03-24", 69, 0.571, 131866, 0.717, 0.881, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "4WM1hvYr2NC6bQnQXcj3sH");
INSERT INTO Genres (song, genre) VALUES ('4WM1hvYr2NC6bQnQXcj3sH', 'abstract hip hop');
INSERT INTO Genres (song, genre) VALUES ('4WM1hvYr2NC6bQnQXcj3sH', 'alternative hip hop');
INSERT INTO Genres (song, genre) VALUES ('4WM1hvYr2NC6bQnQXcj3sH', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('4WM1hvYr2NC6bQnQXcj3sH', 'psychedelic hip hop');
INSERT INTO Genres (song, genre) VALUES ('4WM1hvYr2NC6bQnQXcj3sH', 'rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("2goHCrsDJaflEwQ930ef0o", "MASSA", "CALL ME IF YOU GET LOST", "Tyler, The Creator", "2021-06-25", 63, 0.685, 223718, 0.855, 0.46, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "2goHCrsDJaflEwQ930ef0o");
INSERT INTO Genres (song, genre) VALUES ('2goHCrsDJaflEwQ930ef0o', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('2goHCrsDJaflEwQ930ef0o', 'rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("6rje9f1wRFJDO2iTORw0lH", "I Know", "Dark Sky Paradise", "Big Sean", "2015-02-24", 73, 0.733, 319973, 0.334, 0.267, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "6rje9f1wRFJDO2iTORw0lH");
INSERT INTO Genres (song, genre) VALUES ('6rje9f1wRFJDO2iTORw0lH', 'detroit hip hop');
INSERT INTO Genres (song, genre) VALUES ('6rje9f1wRFJDO2iTORw0lH', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('6rje9f1wRFJDO2iTORw0lH', 'pop');
INSERT INTO Genres (song, genre) VALUES ('6rje9f1wRFJDO2iTORw0lH', 'pop rap');
INSERT INTO Genres (song, genre) VALUES ('6rje9f1wRFJDO2iTORw0lH', 'rap');
INSERT INTO Genres (song, genre) VALUES ('6rje9f1wRFJDO2iTORw0lH', 'southern hip hop');
INSERT INTO Genres (song, genre) VALUES ('6rje9f1wRFJDO2iTORw0lH', 'trap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("3CA9pLiwRIGtUBiMjbZmRw", "Nice For What", "Scorpion", "Drake", "2018-06-29", 77, 0.585, 210746, 0.909, 0.758, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "3CA9pLiwRIGtUBiMjbZmRw");
INSERT INTO Genres (song, genre) VALUES ('3CA9pLiwRIGtUBiMjbZmRw', 'canadian hip hop');
INSERT INTO Genres (song, genre) VALUES ('3CA9pLiwRIGtUBiMjbZmRw', 'canadian pop');
INSERT INTO Genres (song, genre) VALUES ('3CA9pLiwRIGtUBiMjbZmRw', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('3CA9pLiwRIGtUBiMjbZmRw', 'rap');
INSERT INTO Genres (song, genre) VALUES ('3CA9pLiwRIGtUBiMjbZmRw', 'toronto rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("6DCZcSspjsKoFjzjrWoCdn", "God's Plan", "Scorpion", "Drake", "2018-06-29", 83, 0.754, 198973, 0.449, 0.357, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "6DCZcSspjsKoFjzjrWoCdn");
INSERT INTO Genres (song, genre) VALUES ('6DCZcSspjsKoFjzjrWoCdn', 'canadian hip hop');
INSERT INTO Genres (song, genre) VALUES ('6DCZcSspjsKoFjzjrWoCdn', 'canadian pop');
INSERT INTO Genres (song, genre) VALUES ('6DCZcSspjsKoFjzjrWoCdn', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('6DCZcSspjsKoFjzjrWoCdn', 'rap');
INSERT INTO Genres (song, genre) VALUES ('6DCZcSspjsKoFjzjrWoCdn', 'toronto rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("7L4AtavGZEEDkVw1E0mDYn", "Three Man Weave", "Injury Reserve", "Injury Reserve", "2019-05-17", 52, 0.285, 206693, 0.875, 0.646, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "7L4AtavGZEEDkVw1E0mDYn");
INSERT INTO Genres (song, genre) VALUES ('7L4AtavGZEEDkVw1E0mDYn', 'alternative hip hop');
INSERT INTO Genres (song, genre) VALUES ('7L4AtavGZEEDkVw1E0mDYn', 'conscious hip hop');
INSERT INTO Genres (song, genre) VALUES ('7L4AtavGZEEDkVw1E0mDYn', 'escape room');
INSERT INTO Genres (song, genre) VALUES ('7L4AtavGZEEDkVw1E0mDYn', 'rap');
INSERT INTO Genres (song, genre) VALUES ('7L4AtavGZEEDkVw1E0mDYn', 'underground hip hop');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("7satW8tFLasyZbftvrWFBP", "Legend Has It", "Run The Jewels 3", "Run The Jewels", "2016-12-25", 60, 0.827, 205866, 0.575, 0.467, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "7satW8tFLasyZbftvrWFBP");
INSERT INTO Genres (song, genre) VALUES ('7satW8tFLasyZbftvrWFBP', 'alternative hip hop');
INSERT INTO Genres (song, genre) VALUES ('7satW8tFLasyZbftvrWFBP', 'escape room');
INSERT INTO Genres (song, genre) VALUES ('7satW8tFLasyZbftvrWFBP', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('7satW8tFLasyZbftvrWFBP', 'political hip hop');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("3Zau3JcrZcBfw8aVjKGkSX", "Amphetamine", "blkswn", "Smino", "2017-03-14", 63, 0.619, 469830, 0.532, 0.401, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("6UG231qsIRfhtQ9MfPBmZD", "3Zau3JcrZcBfw8aVjKGkSX");
INSERT INTO Genres (song, genre) VALUES ('3Zau3JcrZcBfw8aVjKGkSX', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('3Zau3JcrZcBfw8aVjKGkSX', 'rap');
INSERT INTO Genres (song, genre) VALUES ('3Zau3JcrZcBfw8aVjKGkSX', 'underground hip hop');

INSERT INTO Playlist (id, username, name) VALUES ('4BYZhEWoXNLnDq9hPM1TPe', 'jhend', 'My Playlist #1');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("57iDDD9N9tTWe75x6qhStw", "Bitter Sweet Symphony", "Urban Hymns (Remastered 2016)", "The Verve", "1997-09-29", 79, 0.356, 357266, 0.917, 0.518, false);        
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "57iDDD9N9tTWe75x6qhStw");
INSERT INTO Genres (song, genre) VALUES ('57iDDD9N9tTWe75x6qhStw', 'alternative rock');
INSERT INTO Genres (song, genre) VALUES ('57iDDD9N9tTWe75x6qhStw', 'britpop');
INSERT INTO Genres (song, genre) VALUES ('57iDDD9N9tTWe75x6qhStw', 'permanent wave');
INSERT INTO Genres (song, genre) VALUES ('57iDDD9N9tTWe75x6qhStw', 'pop rock');
INSERT INTO Genres (song, genre) VALUES ('57iDDD9N9tTWe75x6qhStw', 'rock');
INSERT INTO Genres (song, genre) VALUES ('57iDDD9N9tTWe75x6qhStw', 'shoegaze');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("0VjIjW4GlUZAMYd2vXMi3b", "Blinding Lights", "After Hours", "The Weeknd", "2020-03-20", 90, 0.514, 200040, 0.73, 0.334, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "0VjIjW4GlUZAMYd2vXMi3b");
INSERT INTO Genres (song, genre) VALUES ('0VjIjW4GlUZAMYd2vXMi3b', 'canadian contemporary r&b');
INSERT INTO Genres (song, genre) VALUES ('0VjIjW4GlUZAMYd2vXMi3b', 'canadian pop');
INSERT INTO Genres (song, genre) VALUES ('0VjIjW4GlUZAMYd2vXMi3b', 'pop');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("7pMmxAbSPWF4sYojVqu9jj", "Girl In The Fire", "Hold Your Colour", "Pendulum", "2007-05-19", 35, 0.46, 293520, 0.87, 0.719, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "7pMmxAbSPWF4sYojVqu9jj");
INSERT INTO Genres (song, genre) VALUES ('7pMmxAbSPWF4sYojVqu9jj', 'australian dance');
INSERT INTO Genres (song, genre) VALUES ('7pMmxAbSPWF4sYojVqu9jj', 'dancefloor dnb');
INSERT INTO Genres (song, genre) VALUES ('7pMmxAbSPWF4sYojVqu9jj', 'drum and bass');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("1gk3FhAV07q9Jg77UxnVjX", "Gooey", "ZABA", "Glass Animals", "2014-06-03", 69, 0.487, 289306, 0.369, 0.106, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "1gk3FhAV07q9Jg77UxnVjX");
INSERT INTO Genres (song, genre) VALUES ('1gk3FhAV07q9Jg77UxnVjX', 'gauze pop');
INSERT INTO Genres (song, genre) VALUES ('1gk3FhAV07q9Jg77UxnVjX', 'indietronica');
INSERT INTO Genres (song, genre) VALUES ('1gk3FhAV07q9Jg77UxnVjX', 'shiver pop');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("3pRaLNL3b8x5uBOcsgvdqM", "Hallelujah", "Grace", "Jeff Buckley", "1994", 70, 0.324, 413826, 0.136, 0.0831, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "3pRaLNL3b8x5uBOcsgvdqM");
INSERT INTO Genres (song, genre) VALUES ('3pRaLNL3b8x5uBOcsgvdqM', 'art rock');
INSERT INTO Genres (song, genre) VALUES ('3pRaLNL3b8x5uBOcsgvdqM', 'melancholia');
INSERT INTO Genres (song, genre) VALUES ('3pRaLNL3b8x5uBOcsgvdqM', 'permanent wave');
INSERT INTO Genres (song, genre) VALUES ('3pRaLNL3b8x5uBOcsgvdqM', 'rock');
INSERT INTO Genres (song, genre) VALUES ('3pRaLNL3b8x5uBOcsgvdqM', 'singer-songwriter');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("64Ny7djQ6rNJspquof2KoX", "Hound Dog", "Elvis' Golden Records", "Elvis Presley", "1958-03-21", 64, 0.494, 136026, 0.756, 0.949, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "64Ny7djQ6rNJspquof2KoX");
INSERT INTO Genres (song, genre) VALUES ('64Ny7djQ6rNJspquof2KoX', 'rock-and-roll');
INSERT INTO Genres (song, genre) VALUES ('64Ny7djQ6rNJspquof2KoX', 'rockabilly');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("5OQsiBsky2k2kDKy2bX2eT", "Learn to Fly", "There Is Nothing Left To Lose", "Foo Fighters", "1999-11-02", 76, 0.465, 235293, 0.919, 0.537, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "5OQsiBsky2k2kDKy2bX2eT");
INSERT INTO Genres (song, genre) VALUES ('5OQsiBsky2k2kDKy2bX2eT', 'alternative metal');
INSERT INTO Genres (song, genre) VALUES ('5OQsiBsky2k2kDKy2bX2eT', 'alternative rock');
INSERT INTO Genres (song, genre) VALUES ('5OQsiBsky2k2kDKy2bX2eT', 'modern rock');
INSERT INTO Genres (song, genre) VALUES ('5OQsiBsky2k2kDKy2bX2eT', 'permanent wave');
INSERT INTO Genres (song, genre) VALUES ('5OQsiBsky2k2kDKy2bX2eT', 'post-grunge');
INSERT INTO Genres (song, genre) VALUES ('5OQsiBsky2k2kDKy2bX2eT', 'rock');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("1CxvQ7PBZAa6TRgTTsSyhl", "library of the universe", "internet dump", "cosmic collective", "2021-11-19", 48, 0.723, 62215, 0.801, 0.918, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "1CxvQ7PBZAa6TRgTTsSyhl");
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("6txWz9UapYHVxEd7dDIHXT", "No Rain", "Blind Melon", "Blind Melon", "1992-01-01", 75, 0.389, 217106, 0.476, 0.566, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "6txWz9UapYHVxEd7dDIHXT");
INSERT INTO Genres (song, genre) VALUES ('6txWz9UapYHVxEd7dDIHXT', 'alternative metal');
INSERT INTO Genres (song, genre) VALUES ('6txWz9UapYHVxEd7dDIHXT', 'alternative rock');
INSERT INTO Genres (song, genre) VALUES ('6txWz9UapYHVxEd7dDIHXT', 'blues rock');
INSERT INTO Genres (song, genre) VALUES ('6txWz9UapYHVxEd7dDIHXT', 'grunge');
INSERT INTO Genres (song, genre) VALUES ('6txWz9UapYHVxEd7dDIHXT', 'pop rock');
INSERT INTO Genres (song, genre) VALUES ('6txWz9UapYHVxEd7dDIHXT', 'rock');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("1pHP4JeQV9wDx87D6qH9hD", "Here It Goes Again", "Oh No", "OK Go", "2005-01-01", 66, 0.537, 179813, 0.882, 0.81, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "1pHP4JeQV9wDx87D6qH9hD");
INSERT INTO Genres (song, genre) VALUES ('1pHP4JeQV9wDx87D6qH9hD', 'alternative rock');
INSERT INTO Genres (song, genre) VALUES ('1pHP4JeQV9wDx87D6qH9hD', 'chicago indie');
INSERT INTO Genres (song, genre) VALUES ('1pHP4JeQV9wDx87D6qH9hD', 'indie rock');
INSERT INTO Genres (song, genre) VALUES ('1pHP4JeQV9wDx87D6qH9hD', 'modern alternative rock');
INSERT INTO Genres (song, genre) VALUES ('1pHP4JeQV9wDx87D6qH9hD', 'modern rock');
INSERT INTO Genres (song, genre) VALUES ('1pHP4JeQV9wDx87D6qH9hD', 'permanent wave');
INSERT INTO Genres (song, genre) VALUES ('1pHP4JeQV9wDx87D6qH9hD', 'pop rock');
INSERT INTO Genres (song, genre) VALUES ('1pHP4JeQV9wDx87D6qH9hD', 'rock');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("4XDpeWqPADoWRKcUY3dC84", "November", "Flower Boy", "Tyler, The Creator", "2017-07-21", 63, 0.547, 225346, 0.759, 0.575, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "4XDpeWqPADoWRKcUY3dC84");
INSERT INTO Genres (song, genre) VALUES ('4XDpeWqPADoWRKcUY3dC84', 'hip hop');
INSERT INTO Genres (song, genre) VALUES ('4XDpeWqPADoWRKcUY3dC84', 'rap');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("0wJoRiX5K5BxlqZTolB2LD", "Purple Haze", "Are You Experienced", "Jimi Hendrix", "1967-05-12", 70, 0.533, 170813, 0.905, 0.486, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "0wJoRiX5K5BxlqZTolB2LD");
INSERT INTO Genres (song, genre) VALUES ('0wJoRiX5K5BxlqZTolB2LD', 'acid rock');
INSERT INTO Genres (song, genre) VALUES ('0wJoRiX5K5BxlqZTolB2LD', 'album rock');
INSERT INTO Genres (song, genre) VALUES ('0wJoRiX5K5BxlqZTolB2LD', 'blues rock');
INSERT INTO Genres (song, genre) VALUES ('0wJoRiX5K5BxlqZTolB2LD', 'classic rock');
INSERT INTO Genres (song, genre) VALUES ('0wJoRiX5K5BxlqZTolB2LD', 'hard rock');
INSERT INTO Genres (song, genre) VALUES ('0wJoRiX5K5BxlqZTolB2LD', 'proto-metal');
INSERT INTO Genres (song, genre) VALUES ('0wJoRiX5K5BxlqZTolB2LD', 'psychedelic rock');
INSERT INTO Genres (song, genre) VALUES ('0wJoRiX5K5BxlqZTolB2LD', 'rock');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("42et6fnHCw1HIPSrdPprMl", "Semi-Charmed Life", "Third Eye Blind", "Third Eye Blind", "1997-04-08", 73, 0.64, 268360, 0.864, 0.701, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "42et6fnHCw1HIPSrdPprMl");
INSERT INTO Genres (song, genre) VALUES ('42et6fnHCw1HIPSrdPprMl', 'alternative rock');
INSERT INTO Genres (song, genre) VALUES ('42et6fnHCw1HIPSrdPprMl', 'neo mellow');
INSERT INTO Genres (song, genre) VALUES ('42et6fnHCw1HIPSrdPprMl', 'pop rock');
INSERT INTO Genres (song, genre) VALUES ('42et6fnHCw1HIPSrdPprMl', 'post-grunge');
INSERT INTO Genres (song, genre) VALUES ('42et6fnHCw1HIPSrdPprMl', 'rock');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("2WfaOiMkCvy7F5fcp2zZ8L", "Take on Me", "Hunting High and Low", "a-ha", "1985-06-01", 85, 0.573, 225280, 0.902, 0.876, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "2WfaOiMkCvy7F5fcp2zZ8L");
INSERT INTO Genres (song, genre) VALUES ('2WfaOiMkCvy7F5fcp2zZ8L', 'new romantic');
INSERT INTO Genres (song, genre) VALUES ('2WfaOiMkCvy7F5fcp2zZ8L', 'new wave');
INSERT INTO Genres (song, genre) VALUES ('2WfaOiMkCvy7F5fcp2zZ8L', 'new wave pop');
INSERT INTO Genres (song, genre) VALUES ('2WfaOiMkCvy7F5fcp2zZ8L', 'permanent wave');
INSERT INTO Genres (song, genre) VALUES ('2WfaOiMkCvy7F5fcp2zZ8L', 'soft rock');
INSERT INTO Genres (song, genre) VALUES ('2WfaOiMkCvy7F5fcp2zZ8L', 'synthpop');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("751srcHf5tUqcEa9pRCQwP", "Tek It", "Running", "Cafuné", "2021-07-20", 78, 0.423, 191823, 0.913, 0.596, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "751srcHf5tUqcEa9pRCQwP");
INSERT INTO Genres (song, genre) VALUES ('751srcHf5tUqcEa9pRCQwP', 'brooklyn indie');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("0Dw9z44gXhplDh5HCWZIxP", "You Oughta Know", "Jagged Little Pill", "Alanis Morissette", "1995-06-09", 55, 0.66, 249200, 0.831, 0.43, true);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("4BYZhEWoXNLnDq9hPM1TPe", "0Dw9z44gXhplDh5HCWZIxP");
INSERT INTO Genres (song, genre) VALUES ('0Dw9z44gXhplDh5HCWZIxP', 'canadian pop');
INSERT INTO Genres (song, genre) VALUES ('0Dw9z44gXhplDh5HCWZIxP', 'canadian singer-songwriter');
INSERT INTO Genres (song, genre) VALUES ('0Dw9z44gXhplDh5HCWZIxP', 'pop rock');
INSERT INTO Genres (song, genre) VALUES ('0Dw9z44gXhplDh5HCWZIxP', 'singer-songwriter');

INSERT INTO Playlist (id, username, name) VALUES ('2rZCMy9EFrBqd4h0wbKqNz', 'areyna', 'Jazz Fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("3WgZIh2sIMhaH4yLnZj9ep", "Cafe Amore", "Carnaval", "Spyro Gyra", "1980-01-01", 20, 0.697, 305440, 0.536, 0.918, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "3WgZIh2sIMhaH4yLnZj9ep");
INSERT INTO Genres (song, genre) VALUES ('3WgZIh2sIMhaH4yLnZj9ep', 'jazz funk');
INSERT INTO Genres (song, genre) VALUES ('3WgZIh2sIMhaH4yLnZj9ep', 'jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('3WgZIh2sIMhaH4yLnZj9ep', 'progressive jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('3WgZIh2sIMhaH4yLnZj9ep', 'smooth jazz');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("0vPIxkes0dlATamjuRJdcb", "What You Won't Do for Love", "What Did He Say? (Remastered)", "Victor Wooten", "1997-08-19", 38, 0.608, 282946, 0.5, 0.42, false);  
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "0vPIxkes0dlATamjuRJdcb");
INSERT INTO Genres (song, genre) VALUES ('0vPIxkes0dlATamjuRJdcb', 'electric bass');
INSERT INTO Genres (song, genre) VALUES ('0vPIxkes0dlATamjuRJdcb', 'instrumental funk');
INSERT INTO Genres (song, genre) VALUES ('0vPIxkes0dlATamjuRJdcb', 'jazz');
INSERT INTO Genres (song, genre) VALUES ('0vPIxkes0dlATamjuRJdcb', 'jazz funk');
INSERT INTO Genres (song, genre) VALUES ('0vPIxkes0dlATamjuRJdcb', 'jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('0vPIxkes0dlATamjuRJdcb', 'modern funk');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("22MmpJPOTKEadHzKmoutx2", "Night Rhythms - Remastered", "Festival (Remastered)", "Lee Ritenour", "1988", 31, 0.619, 270986, 0.909, 0.864, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "22MmpJPOTKEadHzKmoutx2");
INSERT INTO Genres (song, genre) VALUES ('22MmpJPOTKEadHzKmoutx2', 'jazz funk');
INSERT INTO Genres (song, genre) VALUES ('22MmpJPOTKEadHzKmoutx2', 'jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('22MmpJPOTKEadHzKmoutx2', 'jazz guitar');
INSERT INTO Genres (song, genre) VALUES ('22MmpJPOTKEadHzKmoutx2', 'smooth jazz');
INSERT INTO Genres (song, genre) VALUES ('22MmpJPOTKEadHzKmoutx2', 'yacht rock');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("4r1xPBKe9q1zJmMD77cADj", "Coast to Coast", "Asian Dreamer", "CASIOPEA", "2017-11-01", 33, 0.541, 281866, 0.712, 0.788, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "4r1xPBKe9q1zJmMD77cADj");
INSERT INTO Genres (song, genre) VALUES ('4r1xPBKe9q1zJmMD77cADj', 'japanese jazz');
INSERT INTO Genres (song, genre) VALUES ('4r1xPBKe9q1zJmMD77cADj', 'japanese jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('4r1xPBKe9q1zJmMD77cADj', 'jazz fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("6uYlYDNbwA2y9QUatVp0wY", "Down the Wire", "Down the Wire", "Spyro Gyra", "2009-04-24", 29, 0.754, 357826, 0.759, 0.826, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "6uYlYDNbwA2y9QUatVp0wY");
INSERT INTO Genres (song, genre) VALUES ('6uYlYDNbwA2y9QUatVp0wY', 'jazz funk');
INSERT INTO Genres (song, genre) VALUES ('6uYlYDNbwA2y9QUatVp0wY', 'jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('6uYlYDNbwA2y9QUatVp0wY', 'progressive jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('6uYlYDNbwA2y9QUatVp0wY', 'smooth jazz');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("03U1UYeTZOs0QpB10PN1BK", "YELLOW ART", "MODERN BEAT", "NANIWA EXPRESS", "1984", 9, 0.469, 303000, 0.644, 0.328, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "03U1UYeTZOs0QpB10PN1BK");
INSERT INTO Genres (song, genre) VALUES ('03U1UYeTZOs0QpB10PN1BK', 'classic city pop');
INSERT INTO Genres (song, genre) VALUES ('03U1UYeTZOs0QpB10PN1BK', 'japanese jazz');
INSERT INTO Genres (song, genre) VALUES ('03U1UYeTZOs0QpB10PN1BK', 'japanese jazz fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("4LwKOZzPxRQrhzI8ByM0wk", "Agatha", "Studio Cat", "Tsuyoshi Kon", "2017-11-01", 11, 0.602, 313853, 0.894, 0.565, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "4LwKOZzPxRQrhzI8ByM0wk");
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("0kOJ2jsjLGuEmWhfwGxZru", "INSIDE OF YOU", "MODERN BEAT", "NANIWA EXPRESS", "1984", 28, 0.541, 263560, 0.858, 0.8, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "0kOJ2jsjLGuEmWhfwGxZru");
INSERT INTO Genres (song, genre) VALUES ('0kOJ2jsjLGuEmWhfwGxZru', 'classic city pop');
INSERT INTO Genres (song, genre) VALUES ('0kOJ2jsjLGuEmWhfwGxZru', 'japanese jazz');
INSERT INTO Genres (song, genre) VALUES ('0kOJ2jsjLGuEmWhfwGxZru', 'japanese jazz fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("0F79QAGawM9bMrK11YGHru", "BELIEVIN'", "NO FUSE", "NANIWA EXPRESS", "1982", 31, 0.374, 267426, 0.947, 0.531, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "0F79QAGawM9bMrK11YGHru");
INSERT INTO Genres (song, genre) VALUES ('0F79QAGawM9bMrK11YGHru', 'classic city pop');
INSERT INTO Genres (song, genre) VALUES ('0F79QAGawM9bMrK11YGHru', 'japanese jazz');
INSERT INTO Genres (song, genre) VALUES ('0F79QAGawM9bMrK11YGHru', 'japanese jazz fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("4sParTwdXj8D6PoqxfMGOO", "FAR AWAY", "WIND UP", "NANIWA EXPRESS", "1983", 7, 0.656, 229360, 0.676, 0.289, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "4sParTwdXj8D6PoqxfMGOO");
INSERT INTO Genres (song, genre) VALUES ('4sParTwdXj8D6PoqxfMGOO', 'classic city pop');
INSERT INTO Genres (song, genre) VALUES ('4sParTwdXj8D6PoqxfMGOO', 'japanese jazz');
INSERT INTO Genres (song, genre) VALUES ('4sParTwdXj8D6PoqxfMGOO', 'japanese jazz fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("3Y1k10FsXMXFw9H08dZlKl", "Galactic Funk", "Asian Dreamer", "CASIOPEA", "2017-11-01", 39, 0.61, 324973, 0.851, 0.66, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "3Y1k10FsXMXFw9H08dZlKl");
INSERT INTO Genres (song, genre) VALUES ('3Y1k10FsXMXFw9H08dZlKl', 'japanese jazz');
INSERT INTO Genres (song, genre) VALUES ('3Y1k10FsXMXFw9H08dZlKl', 'japanese jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('3Y1k10FsXMXFw9H08dZlKl', 'jazz fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("0l2JDUT8fo2CRj5cDoGoL2", "Shaker Song", "Spyro Gyra", "Spyro Gyra", "1978-01-01", 36, 0.706, 286946, 0.873, 0.772, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "0l2JDUT8fo2CRj5cDoGoL2");
INSERT INTO Genres (song, genre) VALUES ('0l2JDUT8fo2CRj5cDoGoL2', 'jazz funk');
INSERT INTO Genres (song, genre) VALUES ('0l2JDUT8fo2CRj5cDoGoL2', 'jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('0l2JDUT8fo2CRj5cDoGoL2', 'progressive jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('0l2JDUT8fo2CRj5cDoGoL2', 'smooth jazz');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("5zozpuIRNX7t3fR9huih1M", "Sky High", "Painted Woman", "Masaki Matsubara", "1983", 17, 0.736, 222400, 0.563, 0.801, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "5zozpuIRNX7t3fR9huih1M");
INSERT INTO Genres (song, genre) VALUES ('5zozpuIRNX7t3fR9huih1M', 'classic city pop');
INSERT INTO Genres (song, genre) VALUES ('5zozpuIRNX7t3fR9huih1M', 'japanese jazz');
INSERT INTO Genres (song, genre) VALUES ('5zozpuIRNX7t3fR9huih1M', 'japanese jazz fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("3KbFLMNzJvHC3NCY24kdiU", "Liquid Fingers", "To Chi Ka", "Kazumi Watanabe", "2010-09-01", 13, 0.476, 296866, 0.732, 0.725, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "3KbFLMNzJvHC3NCY24kdiU");
INSERT INTO Genres (song, genre) VALUES ('3KbFLMNzJvHC3NCY24kdiU', 'japanese jazz');
INSERT INTO Genres (song, genre) VALUES ('3KbFLMNzJvHC3NCY24kdiU', 'japanese jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('3KbFLMNzJvHC3NCY24kdiU', 'jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('3KbFLMNzJvHC3NCY24kdiU', 'jazz guitar');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("6CNDa7cXKwgFKAEK9BM2QI", "Hoshizora", "Asian Dreamer", "CASIOPEA", "2017-11-01", 23, 0.666, 252840, 0.459, 0.339, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "6CNDa7cXKwgFKAEK9BM2QI");
INSERT INTO Genres (song, genre) VALUES ('6CNDa7cXKwgFKAEK9BM2QI', 'japanese jazz');
INSERT INTO Genres (song, genre) VALUES ('6CNDa7cXKwgFKAEK9BM2QI', 'japanese jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('6CNDa7cXKwgFKAEK9BM2QI', 'jazz fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("3TFiPnbISzMThh0hzQSvFD", "Garden Party", "Surprise Surprise", "Mezzoforte", "1983-01-01", 41, 0.762, 370040, 0.725, 0.87, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "3TFiPnbISzMThh0hzQSvFD");
INSERT INTO Genres (song, genre) VALUES ('3TFiPnbISzMThh0hzQSvFD', 'icelandic jazz');
INSERT INTO Genres (song, genre) VALUES ('3TFiPnbISzMThh0hzQSvFD', 'smooth jazz');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("3x8WXagG37ONFz857YbeFe", "Nightfall", "Forward Motion", "Mezzoforte", "2021-07-01", 33, 0.72, 285533, 0.548, 0.628, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "3x8WXagG37ONFz857YbeFe");
INSERT INTO Genres (song, genre) VALUES ('3x8WXagG37ONFz857YbeFe', 'icelandic jazz');
INSERT INTO Genres (song, genre) VALUES ('3x8WXagG37ONFz857YbeFe', 'smooth jazz');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("00wEygLHkAzIrnM16ozvzx", "Hardwired", "Forward Motion", "Mezzoforte", "2021-07-01", 29, 0.796, 282066, 0.751, 0.736, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "00wEygLHkAzIrnM16ozvzx");
INSERT INTO Genres (song, genre) VALUES ('00wEygLHkAzIrnM16ozvzx', 'icelandic jazz');
INSERT INTO Genres (song, genre) VALUES ('00wEygLHkAzIrnM16ozvzx', 'smooth jazz');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("58DaCZEumzwanvV7ol1Saw", "Angel Town", "Islands", "Mezzoforte", "2012-06-15", 15, 0.726, 311893, 0.639, 0.78, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "58DaCZEumzwanvV7ol1Saw");
INSERT INTO Genres (song, genre) VALUES ('58DaCZEumzwanvV7ol1Saw', 'icelandic jazz');
INSERT INTO Genres (song, genre) VALUES ('58DaCZEumzwanvV7ol1Saw', 'smooth jazz');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("7xt7aS4aO0R1nHSKAMTWwx", "Time out", "Islands", "Mezzoforte", "2012-06-15", 14, 0.541, 361973, 0.327, 0.196, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "7xt7aS4aO0R1nHSKAMTWwx");
INSERT INTO Genres (song, genre) VALUES ('7xt7aS4aO0R1nHSKAMTWwx', 'icelandic jazz');
INSERT INTO Genres (song, genre) VALUES ('7xt7aS4aO0R1nHSKAMTWwx', 'smooth jazz');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("7nJc3vqcU2em6FH0c3Geox", "Birdland", "This Is Jazz #10", "Weather Report", "1996-03-27", 33, 0.585, 358400, 0.565, 0.577, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "7nJc3vqcU2em6FH0c3Geox");
INSERT INTO Genres (song, genre) VALUES ('7nJc3vqcU2em6FH0c3Geox', 'jazz');
INSERT INTO Genres (song, genre) VALUES ('7nJc3vqcU2em6FH0c3Geox', 'jazz funk');
INSERT INTO Genres (song, genre) VALUES ('7nJc3vqcU2em6FH0c3Geox', 'jazz fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("30iuU9cwgLLuLUILxdLViJ", "16 Bars", "Meta-Musica", "The Funky Knuckles", "2014-01-21", 28, 0.439, 478636, 0.88, 0.441, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "30iuU9cwgLLuLUILxdLViJ");
INSERT INTO Genres (song, genre) VALUES ('30iuU9cwgLLuLUILxdLViJ', 'instrumental funk');
INSERT INTO Genres (song, genre) VALUES ('30iuU9cwgLLuLUILxdLViJ', 'modern funk');
INSERT INTO Genres (song, genre) VALUES ('30iuU9cwgLLuLUILxdLViJ', 'uk contemporary jazz');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("7wMrnxXI88rAH2sG6zQcTB", "The Purple Bird", "Be", "CASIOPEA", "1998", 24, 0.616, 291333, 0.801, 0.72, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "7wMrnxXI88rAH2sG6zQcTB");
INSERT INTO Genres (song, genre) VALUES ('7wMrnxXI88rAH2sG6zQcTB', 'japanese jazz');
INSERT INTO Genres (song, genre) VALUES ('7wMrnxXI88rAH2sG6zQcTB', 'japanese jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('7wMrnxXI88rAH2sG6zQcTB', 'jazz fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("0gUI5GwImKcujovw2KaNBr", "Run for Cover", "Voyeur", "David Sanborn", "1981-02-14", 19, 0.815, 194493, 0.679, 0.854, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "0gUI5GwImKcujovw2KaNBr");
INSERT INTO Genres (song, genre) VALUES ('0gUI5GwImKcujovw2KaNBr', 'jazz funk');
INSERT INTO Genres (song, genre) VALUES ('0gUI5GwImKcujovw2KaNBr', 'jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('0gUI5GwImKcujovw2KaNBr', 'jazz saxophone');
INSERT INTO Genres (song, genre) VALUES ('0gUI5GwImKcujovw2KaNBr', 'smooth jazz');
INSERT INTO Genres (song, genre) VALUES ('0gUI5GwImKcujovw2KaNBr', 'smooth saxophone');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("6hp0D02uXVXvmaDSLhFjAa", "Detroit", "Renaissance", "Marcus Miller", "2012-01-01", 37, 0.809, 344706, 0.729, 0.929, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "6hp0D02uXVXvmaDSLhFjAa");
INSERT INTO Genres (song, genre) VALUES ('6hp0D02uXVXvmaDSLhFjAa', 'electric bass');
INSERT INTO Genres (song, genre) VALUES ('6hp0D02uXVXvmaDSLhFjAa', 'instrumental funk');
INSERT INTO Genres (song, genre) VALUES ('6hp0D02uXVXvmaDSLhFjAa', 'jazz fusion');
INSERT INTO Genres (song, genre) VALUES ('6hp0D02uXVXvmaDSLhFjAa', 'modern funk');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("6yoOrydjbkvRv6XtnjnNC7", "Breeze and You (Live Version)", "THE SQUARE YEAR END Live 20151226", "THE SQUARE", "2016-01-20", 33, 0.637, 310517, 0.829, 0.828, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "6yoOrydjbkvRv6XtnjnNC7");
INSERT INTO Genres (song, genre) VALUES ('6yoOrydjbkvRv6XtnjnNC7', 'japanese jazz');
INSERT INTO Genres (song, genre) VALUES ('6yoOrydjbkvRv6XtnjnNC7', 'japanese jazz fusion');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("3xePxfam2jAXpXzqBZytpV", "ZAP", "Turbo", "Cory Wong", "2021-09-03", 32, 0.683, 276250, 0.781, 0.705, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "3xePxfam2jAXpXzqBZytpV");
INSERT INTO Genres (song, genre) VALUES ('3xePxfam2jAXpXzqBZytpV', 'instrumental funk');
INSERT INTO Genres (song, genre) VALUES ('3xePxfam2jAXpXzqBZytpV', 'modern funk');
INSERT INTO Song (id, name, album, artist, release_date, popularity, danceability, duration_ms, energy, valence, explicit) VALUES ("3cTBzCdxKbuczWo9cfPic1", "Trains", "Magnetic", "Steps Ahead", "1986", 30, 0.586, 451440, 0.85, 0.435, false);
INSERT INTO Playlist_Song (Playlist, Song) VALUES ("2rZCMy9EFrBqd4h0wbKqNz", "3cTBzCdxKbuczWo9cfPic1");
INSERT INTO Genres (song, genre) VALUES ('3cTBzCdxKbuczWo9cfPic1', 'jazz fusion');

