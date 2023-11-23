CREATE DATABASE mqtt_esp32;

-- CREATE TABLE sensor (
--     id  INT AUTO_INCREMENT PRIMARY KEY,
--     datetime TIMESTAMP NOT NULL,
--     heartbeat INT NOT NULL,
--     Spo2 INT NOT NULL,
--     body_temperature INT NOT NULL,
--     Environment_temp INT NOT NULL,
-- );

CREATE TABLE datanode_1 (
    id  INT AUTO_INCREMENT PRIMARY KEY,
    datetime TIMESTAMP NOT NULL,
    heartbeat INT NOT NULL,
    Spo2 INT NOT NULL,
    body_temperature INT NOT NULL,
    Environment_temp INT NOT NULL,
    
);

CREATE TABLE datanode_2 (
    id  INT AUTO_INCREMENT PRIMARY KEY,
    datetime TIMESTAMP NOT NULL,
    heartbeat INT NOT NULL,
    Spo2 INT NOT NULL,
    body_temperature INT NOT NULL,
    Environment_temp INT NOT NULL,
);
