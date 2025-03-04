create table if not exists locacao (
  id int AUTO_INCREMENT PRIMARY key,
  data_inicio date,
  data_final date,
  data_devolucao date,
  cliente_id int not null,
  FOREIGN KEY (cliente_id) REFERENCES cliente(id) on delete cascade
);