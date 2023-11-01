CREATE TABLE Reservations (
    id INTEGER PRIMARY KEY,
    client_name TEXT NOT NULL,
    reservation_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    sport_type TEXT NOT NULL,
    course TEXT NOT NULL,
    class TEXT NOT NULL,
    FOREIGN KEY (sport_type) REFERENCES Sports(name)
);

CREATE TABLE Sports (
    name TEXT PRIMARY KEY
);

CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);