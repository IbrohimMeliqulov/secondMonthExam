-- Active: 1759236939102@@127.0.0.1@5432@erp

CREATE table users (
    id serial PRIMARY KEY,
    full_name varchar(120) not NULL,
    age INT not NULL,
    email VARCHAR(80) not NULL UNIQUE,
    phone VARCHAR(40) not NULL
);

create Table cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) not NULL,
    year INT,
    model VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    color VARCHAR(60)
);

create table orders (
    id SERIAL PRIMARY KEY,
    car_id int REFERENCES cars (id) on delete set NULL,
    user_id int REFERENCES users (id) on delete cascade,
    month_count INT NOT NULL,
    start_date DATE,
    end_date DATE
);

create Table payments (
    id SERIAL PRIMARY KEY,
    order_id int REFERENCES orders (id) on delete set NULL,
    amount INT NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
);