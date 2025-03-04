create table if not exists cliente (
	id int AUTO_INCREMENT PRIMARY KEY,
    nome varchar(100) not null,
    endereco varchar(300) not null,
    email varchar(250) not null,
    cpf varchar(15) not null
);