CREATE TABLE if not exists locacao_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    locacao_id INT NOT NULL,
    filme_id INT NOT NULL,
    preco FLOAT NOT NULL,
    FOREIGN KEY (locacao_id) REFERENCES locacao(id) ON DELETE CASCADE,
    FOREIGN KEY (filme_id) REFERENCES filme(id) ON DELETE CASCADE
);