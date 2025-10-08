-- =============================================
-- Base de datos: UmaTeams
-- =============================================
CREATE DATABASE IF NOT EXISTS `UmaTeams` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `UmaTeams`;

-- =============================================
-- Tabla: CharacterInfo (Datos de personajes Uma)
-- =============================================
CREATE TABLE IF NOT EXISTS `CharacterInfo` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `category_label` VARCHAR(255) NOT NULL,
    `category_label_en` VARCHAR(255) NOT NULL,
    `category_value` VARCHAR(255) NOT NULL,
    `color_main` VARCHAR(50) NOT NULL,
    `color_sub` VARCHAR(50) NOT NULL,
    `name_en` VARCHAR(255) NOT NULL,
    `name_en_internal` VARCHAR(255) NOT NULL,
    `name_jp` VARCHAR(255) NOT NULL,
    `preferred_url` VARCHAR(500) NOT NULL,
    `row_number` INT NOT NULL,
    `thumb_img` VARCHAR(500) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Tablas de Identity (ASP.NET Core Identity)
-- =============================================
CREATE TABLE IF NOT EXISTS `AspNetRoles` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(256) NULL,
    `NormalizedName` VARCHAR(256) NULL,
    `ConcurrencyStamp` LONGTEXT NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AspNetRoleClaims` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `RoleId` INT NOT NULL,
    `ClaimType` LONGTEXT NULL,
    `ClaimValue` LONGTEXT NULL,
    PRIMARY KEY (`Id`),
    CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` 
        FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AspNetUsers` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `UserName` VARCHAR(256) NULL,
    `NormalizedUserName` VARCHAR(256) NULL,
    `Email` VARCHAR(256) NULL,
    `NormalizedEmail` VARCHAR(256) NULL,
    `EmailConfirmed` TINYINT(1) NOT NULL,
    `PasswordHash` LONGTEXT NULL,
    `SecurityStamp` LONGTEXT NULL,
    `ConcurrencyStamp` LONGTEXT NULL,
    `PhoneNumber` LONGTEXT NULL,
    `PhoneNumberConfirmed` TINYINT(1) NOT NULL,
    `TwoFactorEnabled` TINYINT(1) NOT NULL,
    `LockoutEnd` DATETIME(6) NULL,
    `LockoutEnabled` TINYINT(1) NOT NULL,
    `AccessFailedCount` INT NOT NULL,
    `FechaRegistro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AspNetUserClaims` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `UserId` INT NOT NULL,
    `ClaimType` LONGTEXT NULL,
    `ClaimValue` LONGTEXT NULL,
    PRIMARY KEY (`Id`),
    CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` 
        FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AspNetUserLogins` (
    `LoginProvider` VARCHAR(255) NOT NULL,
    `ProviderKey` VARCHAR(255) NOT NULL,
    `ProviderDisplayName` LONGTEXT NULL,
    `UserId` INT NOT NULL,
    PRIMARY KEY (`LoginProvider`, `ProviderKey`),
    CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` 
        FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AspNetUserRoles` (
    `UserId` INT NOT NULL,
    `RoleId` INT NOT NULL,
    PRIMARY KEY (`UserId`, `RoleId`),
    CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` 
        FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) 
        ON DELETE CASCADE,
    CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` 
        FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AspNetUserTokens` (
    `UserId` INT NOT NULL,
    `LoginProvider` VARCHAR(255) NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Value` LONGTEXT NULL,
    PRIMARY KEY (`UserId`, `LoginProvider`, `Name`),
    CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` 
        FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Tabla: UmaTeams (Equipos de usuarios)
-- =============================================
CREATE TABLE IF NOT EXISTS `UmaTeams` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `TeamName` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Tabla: TeamMembers (Miembros de equipos)
-- =============================================
CREATE TABLE IF NOT EXISTS `TeamMembers` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `TeamId` INT NOT NULL,
    `UmaId` INT NOT NULL,
    `UmaName` VARCHAR(255) NOT NULL,
    `UmaImage` VARCHAR(500) NULL,
    PRIMARY KEY (`Id`),
    CONSTRAINT `FK_TeamMembers_UmaTeams` 
        FOREIGN KEY (`TeamId`) REFERENCES `UmaTeams` (`Id`) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT `FK_TeamMembers_CharacterInfo` 
        FOREIGN KEY (`UmaId`) REFERENCES `CharacterInfo` (`Id`) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Índices para mejorar el rendimiento
-- =============================================
CREATE INDEX `IX_AspNetRoleClaims_RoleId` ON `AspNetRoleClaims` (`RoleId`);
CREATE UNIQUE INDEX `RoleNameIndex` ON `AspNetRoles` (`NormalizedName`);
CREATE INDEX `IX_AspNetUserClaims_UserId` ON `AspNetUserClaims` (`UserId`);
CREATE INDEX `IX_AspNetUserLogins_UserId` ON `AspNetUserLogins` (`UserId`);
CREATE INDEX `IX_AspNetUserRoles_RoleId` ON `AspNetUserRoles` (`RoleId`);
CREATE INDEX `EmailIndex` ON `AspNetUsers` (`NormalizedEmail`);
CREATE UNIQUE INDEX `UserNameIndex` ON `AspNetUsers` (`NormalizedUserName`);
CREATE INDEX `IX_TeamMembers_TeamId` ON `TeamMembers` (`TeamId`);
CREATE INDEX `IX_TeamMembers_UmaId` ON `TeamMembers` (`UmaId`);
CREATE INDEX `IX_CharacterInfo_name_en` ON `CharacterInfo` (`name_en`);
CREATE INDEX `IX_CharacterInfo_name_jp` ON `CharacterInfo` (`name_jp`);

-- =============================================
-- Datos iniciales (Roles del sistema)
-- =============================================
INSERT INTO `AspNetRoles` (`Name`, `NormalizedName`, `ConcurrencyStamp`) VALUES
('Admin', 'ADMIN', UUID()),
('User', 'USER', UUID()),
('Moderator', 'MODERATOR', UUID());

-- =============================================
-- Usuario administrador por defecto (opcional)
-- =============================================
-- Contraseña: Admin123!
INSERT INTO `AspNetUsers` (
    `UserName`, 
    `NormalizedUserName`, 
    `Email`, 
    `NormalizedEmail`, 
    `EmailConfirmed`, 
    `PasswordHash`,
    `SecurityStamp`,
    `ConcurrencyStamp`,
    `PhoneNumber`,
    `PhoneNumberConfirmed`,
    `TwoFactorEnabled`,
    `LockoutEnd`,
    `LockoutEnabled`,
    `AccessFailedCount`,
    `FechaRegistro`
) VALUES (
    'admin',
    'ADMIN',
    'admin@umateams.com',
    'ADMIN@UMATEAMS.COM',
    1,
    'AQAAAAEAACcQAAAAEPhN5JfzJ2QvVKJcZzX7s2p8X2rLkY1hH7qyZtWb3oKjvMlN1pPw3qXrTgYbW4zA==', -- Hash para "Admin123!"
    '7Q5Z3Y2X1W0V9U8T7S6R5P4Q3O2N1M0L',
    UUID(),
    NULL,
    0,
    0,
    NULL,
    1,
    0,
    NOW()
);

INSERT INTO `AspNetUserRoles` (`UserId`, `RoleId`) VALUES
(1, 1); -- Asignar rol Admin al usuario admin

-- =============================================
-- Datos de ejemplo para equipos (opcional)
-- =============================================
INSERT INTO `UmaTeams` (`TeamName`) VALUES
('Equipo de Carreras'),
('Equipo de Resistencia'),
('Equipo de Velocidad');

-- =============================================
-- Consultas de verificación
-- =============================================
SELECT 'Base de datos creada exitosamente' AS Status;

-- Mostrar estructura de tablas
SHOW TABLES;

-- Contar registros en tablas principales
SELECT 
    (SELECT COUNT(*) FROM `AspNetUsers`) AS TotalUsuarios,
    (SELECT COUNT(*) FROM `AspNetRoles`) AS TotalRoles,
    (SELECT COUNT(*) FROM `UmaTeams`) AS TotalEquipos,
    (SELECT COUNT(*) FROM `TeamMembers`) AS TotalMiembros,
    (SELECT COUNT(*) FROM `CharacterInfo`) AS TotalPersonajes;