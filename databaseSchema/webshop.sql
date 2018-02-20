-- Exported from QuickDBD: https://www.quickdatatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/schema/mNQsUQujLk-s_5hGe1_d2A
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify the code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "Account" (
    "AccountID" int  NOT NULL ,
    "Email" varchar(200)  NOT NULL ,
    "Password" varchar(200)  NOT NULL ,
    "Level" int  NOT NULL ,
    "Name" string  NULL ,
    "Address1" string  NULL ,
    "Address2" string  NULL ,
    "Phone" string  NULL ,
    CONSTRAINT "pk_Account" PRIMARY KEY (
        "AccountID"
    )
)

GO

CREATE TABLE "Order" (
    "OrderID" int  NOT NULL ,
    "AccountID" int  NOT NULL ,
    "ShoppingCartID" int  NOT NULL ,
    "Address" string  NOT NULL ,
    "CustomerName" string  NOT NULL ,
    "OrderStatus" enum  NOT NULL ,
    CONSTRAINT "pk_Order" PRIMARY KEY (
        "OrderID"
    )
)

GO

CREATE TABLE "ShoppingCartProduct" (
    "ProductID" int  NOT NULL ,
    "ShoppingCartID" int  NOT NULL 
)

GO

CREATE TABLE "SaleProduct" (
    "ProductID" int  NOT NULL ,
    "SaleID" int  NOT NULL 
)

GO

CREATE TABLE "ShoppingCart" (
    "ShoppingCartID" int  NOT NULL ,
    "AccountID" int  NOT NULL ,
    "Quantity" int  NOT NULL ,
    "TotalPrice" int  NOT NULL ,
    CONSTRAINT "pk_ShoppingCart" PRIMARY KEY (
        "ShoppingCartID"
    )
)

GO

CREATE TABLE "Sale" (
    "SaleID" int  NOT NULL ,
    "SaleModifier" int  NOT NULL ,
    "StartDate" DateTime  NOT NULL ,
    "EndDate" DateTime  NOT NULL ,
    CONSTRAINT "pk_Sale" PRIMARY KEY (
        "SaleID"
    )
)

GO

-- Table documentation comment 1 (try the PDF/RTF export)
-- Table documentation comment 2
CREATE TABLE "Product" (
    "ProductID" int  NOT NULL ,
    -- Field documentation comment 1
    -- Field documentation comment 2
    -- Field documentation comment 3
    "Name" varchar(200)  NOT NULL ,
    "Description" string  NOT NULL ,
    "Price" money  NOT NULL ,
    CONSTRAINT "pk_Product" PRIMARY KEY (
        "ProductID"
    )
)

GO

ALTER TABLE "Order" ADD CONSTRAINT "fk_Order_AccountID" FOREIGN KEY("AccountID")
REFERENCES "Account" ("AccountID")
GO

ALTER TABLE "Order" ADD CONSTRAINT "fk_Order_ShoppingCartID" FOREIGN KEY("ShoppingCartID")
REFERENCES "ShoppingCart" ("ShoppingCartID")
GO

ALTER TABLE "ShoppingCartProduct" ADD CONSTRAINT "fk_ShoppingCartProduct_ProductID" FOREIGN KEY("ProductID")
REFERENCES "Product" ("ProductID")
GO

ALTER TABLE "ShoppingCartProduct" ADD CONSTRAINT "fk_ShoppingCartProduct_ShoppingCartID" FOREIGN KEY("ShoppingCartID")
REFERENCES "ShoppingCart" ("ShoppingCartID")
GO

ALTER TABLE "SaleProduct" ADD CONSTRAINT "fk_SaleProduct_ProductID" FOREIGN KEY("ProductID")
REFERENCES "Product" ("ProductID")
GO

ALTER TABLE "SaleProduct" ADD CONSTRAINT "fk_SaleProduct_SaleID" FOREIGN KEY("SaleID")
REFERENCES "Sale" ("SaleID")
GO

ALTER TABLE "ShoppingCart" ADD CONSTRAINT "fk_ShoppingCart_AccountID" FOREIGN KEY("AccountID")
REFERENCES "Account" ("AccountID")
GO

