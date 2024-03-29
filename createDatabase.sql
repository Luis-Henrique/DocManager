CREATE SCHEMA IF NOT EXISTS docManager;

-- marcar banco de dados para uso
-- ------------------------------
USE docManager;

-- menha tabela de banco de dados
-- ------------------------------
CREATE TABLE IF NOT EXISTS docManager.user
(
 `id` char(36) NOT NULL Default 'uuid()' COMMENT 'Identificador unico do registro',
 `userName` varchar(50) NOT NULL COMMENT 'nome de usu�rio',
 `email` varchar(100) NOT NULL COMMENT 'email do usu�rio',
 `password` varchar(50) NOT NULL COMMENT 'senha do usu�rio',
 `active` bit NOT NULL DEFAULT false COMMENT 'indicador se o usu�rio esta ativo ou inativo',
 `forgetPasswordToken` varchar(100) NULL COMMENT 'token recupera�ao da senha',
 `forgetPasswordExpiration` DateTime NULL COMMENT 'expira��o do token',
 `userAutorization` tinyint NULL COMMENT 'Nivel de autoriza��o',
 `userGroupAutorization` varchar(50) NULL COMMENT 'Grupo de autoriza��o',
 `createdDate` DateTime NOT NULL DEFAULT NOW() COMMENT 'Data de cria��o do usu�rio',
 `updatedDate` Datetime NULL COMMENT 'Data de altera��o do reguistro',
 PRIMARY KEY(`id`)
);

-- -----------------------------------------------------
-- Table `docManager`.`documentType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS docManager.documentType (
  `id` CHAR(36) not null default 'uuid()' comment 'Identificador do registro',
  `name` varchar(100) not null comment 'Nome',
  `description` varchar(200) not null comment 'Descri��o',
  `active` bit NOT NULL default false comment 'Ativo ou inativo',
  `createdDate` datetime not null default NOW() comment 'data de cria��o do registro',
  `updatedDate` datetime null  comment 'data de atualiza��o do registro',
  PRIMARY KEY (`id`)
  );

-- -----------------------------------------------------
-- Table `docManager`.`groupAutorization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS docManager.groupAutorization (
  `id` CHAR(36) not null default 'uuid()' comment 'Identificador do registro',
  `name` varchar(100) not null comment 'Nome',
  `active` bit NOT NULL default false comment 'Ativo ou inativo',
  `createdDate` datetime not null default NOW() comment 'data de cria��o do registro',
  `updatedDate` datetime null  comment 'data de atualiza��o do registro',
  PRIMARY KEY (`id`)
  );
  
  -- -----------------------------------------------------
-- Table `docManager`.`documentParthers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS docManager.documentPartners (
  `id` CHAR(36) not null default 'uuid()' comment 'Identificador do registro',
  `name` varchar(100) not null comment 'Nome',
  `description` varchar(200) not null comment 'Descri��o',
  `active` bit NOT NULL default false comment 'Ativo ou inativo',
  `createdDate` datetime not null default NOW() comment 'data de cria��o do registro',
  `updatedDate` datetime null  comment 'data de atualiza��o do registro',
  PRIMARY KEY (`id`)
  );

-- ---------------------------
-- tabela de documentos
-- ---------------------------
CREATE TABLE IF NOT EXISTS docManager.documents
(
`id` char(36) NOT NULL DEFAULT 'uuid()' COMMENT 'Identificador unico do registro',
`title` varchar(100) NOT NULL COMMENT 'nome',
`description` varchar(200) NOT NULL COMMENT 'descri��o do documento',
`documentTypeId`  varchar(50) NOT NULL COMMENT 'tipo do documento',
`documentPartnersId`  varchar(50) NOT NULL COMMENT 'parceiros',
`userAutorizationGroupId` varchar(50) NULL COMMENT 'Grupo de autoriza��o',
`validity` DateTime NOT NULL DEFAULT NOW() COMMENT 'data de vigencia do documento',
`active` bit NOT NULL DEFAULT false COMMENT 'indicador se o documento esta ativo ou inativo',
`url` varchar(350) NOT NULL COMMENT 'link do documento',
`creationDate` DateTime NOT NULL DEFAULT NOW() COMMENT 'data de cria��o do registro',
`updateDate` DateTime NULL COMMENT 'data de atualiza��o do registro',
PRIMARY KEY(`id`),
KEY `fk_documentType` (`documentTypeId`),
KEY `fk_documentPartners` (`documentPartnersId`),
CONSTRAINT `fk_documentType` FOREIGN KEY (`documentTypeId`) REFERENCES `documentType` (`id`),
CONSTRAINT `fk_documentPartners` FOREIGN KEY (`documentPartnersId`) REFERENCES `documentPartners` (`id`)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);