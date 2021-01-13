CREATE DATABASE db_tictactoe;
-- \c in to db_tictactoe
CREATE TABLE tb_user(
  id SERIAL PRIMARY KEY,
  nama VARCHAR(30),
  username VARCHAR(30),
  password VARCHAR(30)
);