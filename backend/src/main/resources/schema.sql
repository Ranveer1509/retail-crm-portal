CREATE DATABASE IF NOT EXISTS retail_crm_portal;

USE retail_crm_portal;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(80) NOT NULL,
    email VARCHAR(160) NOT NULL UNIQUE,
    password VARCHAR(255),
    google_id VARCHAR(160),
    provider VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS profiles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    full_name VARCHAR(120) NOT NULL,
    photo_url VARCHAR(500),
    address VARCHAR(500) NOT NULL,
    CONSTRAINT fk_profiles_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS education (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    degree VARCHAR(80) NOT NULL,
    stream VARCHAR(120) NOT NULL,
    college_name VARCHAR(160) NOT NULL,
    education_address VARCHAR(160) NOT NULL,
    start_date VARCHAR(20) NOT NULL,
    end_date VARCHAR(20) NOT NULL,
    cgpa VARCHAR(20) NOT NULL,
    CONSTRAINT fk_education_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
