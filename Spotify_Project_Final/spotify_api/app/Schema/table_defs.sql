/**************************************************************************** 
* This is the SQL tables for the local database                             *
*****************************************************************************/

use spotify_api;

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
    FOREIGN KEY (playlist) REFERENCES Playlist(id),
    FOREIGN KEY (song) REFERENCES Song(id)
);

CREATE TABLE Genres (
	song VARCHAR(200),
    genre VARCHAR(50),
    PRIMARY KEY (song, genre),
    FOREIGN KEY (song) REFERENCES Song(id)
);
