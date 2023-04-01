CREATE SCHEMA IF NOT EXISTS docManager;

-- marcar banco de dados para uso
-- ------------------------------
USE docManager;

-- menha tabela de banco de dados
-- ------------------------------
CREATE TABLE IF NOT EXISTS docManager.user
(
 `id` char(36) NOT NULL Default 'uuid()' COMMENT 'Identificador unico do registro',
 `userName` varchar(50) NOT NULL COMMENT 'nome de usuário',
 `email` varchar(100) NOT NULL COMMENT 'email do usuário',
 `password` varchar(50) NOT NULL COMMENT 'senha do usuário',
 `active` bit NOT NULL DEFAULT false COMMENT 'indicador se o usuário esta ativo ou inativo',
 `createdDate` DateTime NOT NULL DEFAULT NOW() COMMENT 'Data de criação do usuário',
 `updatedDate` Datetime NULL COMMENT 'Data de alteração do reguistro',
 PRIMARY KEY(`id`)
);

-- -----------------------------------------------------
-- Table `docManager`.`documentType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS docManager.documentType (
  `id` CHAR(36) not null default 'uuid()' comment 'Identificador do registro',
  `name` varchar(100) not null comment 'Nome',
  `active` bit NOT NULL default false comment 'Ativo ou inativo',
  `createdDate` datetime not null default NOW() comment 'data de criação do registro',
  `updatedDate` datetime null  comment 'data de atualização do registro',
  PRIMARY KEY (`id`)
  );

-- ---------------------------
-- tabela de documentos
-- ---------------------------
CREATE TABLE IF NOT EXISTS docManager.documents
(
`id` char(36) NOT NULL DEFAULT 'uuid()' COMMENT 'Identificador unico do registro',
`title` varchar(50) NOT NULL COMMENT 'nome',
`description` varchar(50) NOT NULL COMMENT 'descrição do documento',
`documentTypeId`  varchar(50) NOT NULL COMMENT 'tipo do documento',
`validity` DateTime NOT NULL DEFAULT NOW() COMMENT 'data de vigencia do documento',
`active` bit NOT NULL DEFAULT false COMMENT 'indicador se o documento esta ativo ou inativo',
`creationDate` DateTime NOT NULL DEFAULT NOW() COMMENT 'data de criação do registro',
`updateDate` DateTime NULL COMMENT 'data de atualização do registro',
PRIMARY KEY(`id`),
KEY `fk_documentType` (`documentTypeId`),
CONSTRAINT `fk_documentType` FOREIGN KEY (`documentTypeId`) REFERENCES `documentType` (`id`)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);