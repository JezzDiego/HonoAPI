CREATE TABLE Reservations (
    id INTEGER PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_id INTEGER NOT NULL,
    reservation_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    sport_type TEXT NOT NULL,
    course TEXT NOT NULL,
    class TEXT NOT NULL,
    FOREIGN KEY (sport_type) REFERENCES Sports(name),
    FOREIGN KEY (client_id) REFERENCES Users(id)
);

CREATE TABLE Sports (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
