CREATE DATABASE IF NOT EXISTS fullstack_rating;

USE fullstack_rating;

-- users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  address VARCHAR(255),
  password VARCHAR(255),
  role ENUM('admin', 'user', 'store_owner') NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active'
);

-- stores table
CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  owner_id INT,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- ratings table
CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  store_id INT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  UNIQUE(user_id, store_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE roles (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

INSERT INTO roles (id, name) VALUES
  (1, 'admin'),
  (2, 'user'),
  (3, 'store_owner');

INSERT INTO users (name, email, password, address, role, status )
VALUES (
  'Admin',
  'admin@example.com',
  '$2b$10$9JHg2njPRgqH5YaOQ299lOC6c4oT1WWYxThGavCY4q9DDF10l.mDW', -- hashed
  'Admin HQ',
  1,
  'active'
);

INSERT INTO users (name, email, password, address, role, status)
VALUES (
  'Owner One',
  'owner1@example.com',
  '$2b$10$Vj0RUYMgMrfhQ4iJjoi22eQWaDee1aGGZX96PZQct3xfhF.t6P72O', -- bcrypt for 'owner123'
    'Owner Address',
    3,
  'active'
);

INSERT INTO stores (name, description, owner_id)
VALUES ('Tech Haven', 'Gadgets and electronics store.', 2);
