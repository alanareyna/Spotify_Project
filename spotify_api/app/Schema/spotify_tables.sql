use spotify_api;

DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS Artist_Album;
DROP TABLE IF EXISTS Artist_Song;
DROP TABLE IF EXISTS Playlist_Song;
DROP TABLE IF EXISTS Song;
DROP TABLE IF EXISTS Playlist;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS Artist;
DROP TABLE IF EXISTS Album;

CREATE TABLE `User` 
(
	username VARCHAR(50) PRIMARY KEY,
    `password` VARCHAR(20),
    firstName VARCHAR(30),
    lastName VARCHAR(30)
);

CREATE TABLE Artist (
	id VARCHAR(200) PRIMARY KEY,
    name VARCHAR(60),
    popularity BIGINT,
    type VARCHAR(20)
);

CREATE TABLE Album (
	id VARCHAR(200) PRIMARY KEY,
    album_type ENUM('album', 'single','compilation'),
    total_tracks BIGINT,
    `name` VARCHAR(100),
    release_date VARCHAR(30),
    release_date_percision VARCHAR(10),
    `type` VARCHAR(6)
);

CREATE TABLE Playlist (
	id VARCHAR(200),
    username VARCHAR(50),
    `name` VARCHAR(100),
    total BIGINT,
    PRIMARY KEY(id, username),
    FOREIGN KEY (username) REFERENCES `User`(username)
);

CREATE TABLE Song(
	id VARCHAR(200),
    album VARCHAR(200),
    dancebility FLOAT,
    duration_ms BIGINT,
    energy FLOAT,
    `key` BIGINT,
    loudness FLOAT,
    `mode` BIGINT,
    tempo FLOAT,
    time_signature BIGINT,
    valence FLOAT,
    explicit BOOL,
    PRIMARY KEY (id, album),
    FOREIGN KEY (album) REFERENCES Album(id)
);

CREATE TABLE Playlist_Song
(
	playlist VARCHAR(200),
    song VARCHAR(200),
    PRIMARY KEY (Playlist, Song),
    FOREIGN KEY (playlist) REFERENCES Playlist(id),
    FOREIGN KEY (song) REFERENCES Song(id)
);

CREATE TABLE Artist_Song
(
	artist VARCHAR(200),
    song VARCHAR(200),
    PRIMARY KEY (artist, song),
    FOREIGN KEY (artist) REFERENCES Artist(id),
    FOREIGN KEY (song) REFERENCES Song(id)
);

CREATE TABLE Artist_Album
(
	artist VARCHAR(200),
    album VARCHAR(200),
    album_group ENUM('album', 'single', 'compilation', 'appears_on'),
    PRIMARY KEY (artist, album),
    FOREIGN KEY (artist) REFERENCES Artist(id),
    FOREIGN KEY (album) REFERENCES Album(id)
);

CREATE TABLE Genres
(
	artist VARCHAR(200) PRIMARY KEY,
    genre VARCHAR(50),
    FOREIGN KEY (artist) REFERENCES Artist(id)
);

