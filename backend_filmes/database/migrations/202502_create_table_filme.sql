CREATE TABLE IF NOT EXISTS filme (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  ano INT,
  diretor VARCHAR(200),
  sinopse LONGTEXT,
  classificacao VARCHAR(100),
  elenco longtext,
  genero_id INT NOT NULL,
  status integer,
  FOREIGN KEY (genero_id) REFERENCES genero(id) ON DELETE CASCADE
);