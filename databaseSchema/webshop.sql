-- Exported from QuickDBD: https://www.quickdatatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/schema/mNQsUQujLk-s_5hGe1_d2A
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify the code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).
drop DATABASE webshop;

create DATABASE webshop;

use webshop;

select * from account;

CREATE TABLE account
(
    Username VARCHAR(16)  NOT NULL,
    Email    VARCHAR(200) NOT NULL,
    Password BINARY(60)   NOT NULL,
    Admin    TINYINT(1)   NOT NULL,
    token    VARCHAR(200) NULL,
    Name     VARCHAR(200) NULL,
    Address1 VARCHAR(200) NULL,
    Address2 VARCHAR(200) NULL,
    Phone    VARCHAR(200) NULL,
    userID   INT AUTO_INCREMENT
    PRIMARY KEY,
    CONSTRAINT account_Username_uindex
    UNIQUE (Username),
    CONSTRAINT account_Email_uindex
    UNIQUE (Email),
    CONSTRAINT account_userID_uindex
    UNIQUE (userID)
)

CREATE TABLE purchase
(
    PurchaseID     INT          NOT NULL
        PRIMARY KEY,
    AccountID      INT          NOT NULL,
    ShoppingCartID INT          NOT NULL,
    Address        VARCHAR(200) NOT NULL,
    CustomerName   VARCHAR(200) NOT NULL
)


CREATE TABLE shoppingcartproduct
(
    ProductID      INT NOT NULL,
    ShoppingCartID INT NOT NULL
)


CREATE TABLE SaleProduct (
    ProductID int  NOT NULL ,
    SaleID int  NOT NULL 
);



CREATE TABLE ShoppingCart (
    ShoppingCartID int  NOT NULL ,
    AccountID int  NOT NULL ,
    Quantity int  NOT NULL ,
    TotalPrice int  NOT NULL ,
    PRIMARY KEY (ShoppingCartID)
);



CREATE TABLE Sale (
    SaleID int  NOT NULL ,
    SaleModifier int  NOT NULL ,
  --  StartDate DateTime  NOT NULL ,
  --  EndDate DateTime  NOT NULL ,
    PRIMARY KEY (SaleID)
);

CREATE TABLE Product (
    ProductID int  NOT NULL ,
    Name varchar(200)  NOT NULL ,
    Description varchar(200)  NOT NULL ,
    Price int  NOT NULL ,
    SalePrice double NOT NULL,
    Genre varchar(200)  NOT NULL ,
    PRIMARY KEY (ProductID)
);

