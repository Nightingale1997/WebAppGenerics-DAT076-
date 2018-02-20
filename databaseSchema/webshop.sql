-- Exported from QuickDBD: https://www.quickdatatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/schema/mNQsUQujLk-s_5hGe1_d2A
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify the code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE Account (
    AccountID int  NOT NULL ,
    Email varchar(200)  NOT NULL ,
    Password varchar(200)  NOT NULL ,
    Admin boolean  NOT NULL ,
    Name varchar(200)  NULL ,
    Address1 varchar(200)  NULL ,
    Address2 varchar(200)  NULL ,
    Phone varchar(200)  NULL ,
    PRIMARY KEY (AccountID)
);



CREATE TABLE Purchase (
    PurchaseID int  NOT NULL ,
    AccountID int  NOT NULL ,
    ShoppingCartID int  NOT NULL ,
    Address varchar(200)  NOT NULL ,
    CustomerName varchar(200)  NOT NULL ,
    PurchaseStatus ENUM ('Success','Fail', 'Cancel')  NOT NULL ,
    PRIMARY KEY (PurchaseID)
);



CREATE TABLE ShoppingCartProduct (
    ProductID int  NOT NULL ,
    ShoppingCartID int  NOT NULL 
);



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
    StartDate DateTime  NOT NULL ,
    EndDate DateTime  NOT NULL ,
    PRIMARY KEY (SaleID)
);

CREATE TABLE Product (
    ProductID int  NOT NULL ,
    Name varchar(200)  NOT NULL ,
    Description text  NOT NULL ,
    Price int  NOT NULL ,
    PRIMARY KEY (ProductID)
);

