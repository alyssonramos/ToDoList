create database dbToDoList;

use dbToDoList;

create table Tarefa(
id int primary key auto_increment,
nome varchar(50) not null CHECK (CHAR_LENGTH(nome) >= 5),
descricao varchar(140),
finalizada bool not null,
data_termino datetime,
prioridade varchar(10) not null
);

create table Membro(
id int primary key auto_increment,
email varchar(50) not null unique,
nome varchar(50) not null CHECK (CHAR_LENGTH(nome) >= 5)
);