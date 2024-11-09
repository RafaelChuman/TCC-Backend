import psycopg2
import pandas as pd
from psycopg2 import sql
from datetime import datetime
import uuid
from random import randint
from dataclasses import dataclass
from sqlalchemy import create_engine, Table, Column, String, Boolean, DateTime, MetaData

       
@dataclass
class OrderItemsCSV:
    CodigoDoDetalheDaFatura : int
    CodigoDaFatura : int
    Cod : str
    Ref : str
    Discriminacao : str
    QTD : str
    UNIT : str
    Custo : str
    Data : str


def row_to_orderAndItems(row):
    
    return OrderItemsCSV(
        CodigoDoDetalheDaFatura = row['CódigoDoDetalheDaFatura'],
        CodigoDaFatura = row['CódigoDaFatura'],
        Cod = row['Cód'],
        Ref = row['Ref'],
        Discriminacao = row['Discriminação'],
        QTD = row['QTD'],
        UNIT = row['UNIT'],
        Custo	 = row['Custo'],
        Data = row['Data'],
    )

# Função para converter orderAndItemsData em dados compatíveis com o PostgreSQL
def orderItems_to_db(orderItems: OrderItemsCSV, ordList):

    cadastro_datetime = ""
    ordId = ""
    price = 0.0
    qtd = 0
    type = "PC"
    
    for ord in ordList:
        if(ord[10] == orderItems.CodigoDaFatura):
            ordId = str(ord[0])
            break

    if(ordId == ""):ordId = '41f1151b-f33b-469f-bd37-87f5f683ee79'

    try:
        cadastro_datetime = pd.to_datetime(orderItems.Data, format='%m/%d/%y %H:%M:%S')
    except ValueError:
        cadastro_datetime = pd.to_datetime('01/01/00 00:00:00', format='%m/%d/%y %H:%M:%S')

    try:
        type = str(orderItems.Ref)
    except ValueError:
        type = "PC"

    try:
        qtd = int(float(orderItems.QTD))
    except ValueError:
        qtd = 0

    try:
        price = float(orderItems.UNIT)
    except ValueError:
        price = 0.0


    return (
        str(uuid.uuid4()),
        qtd,
        price,
        0,
        cadastro_datetime,
        False,
        cadastro_datetime,
        ordId,
        type,
        orderItems.Discriminacao,
        type
    )

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host= "127.0.0.1",
    database= "postgres",
    user="postgres",
    password="tcc_univesp!"
)


# Create a cursor object to execute SQL queries
cur = conn.cursor()


# Define the INSERT queries with placeholders for the data
insertOrder = sql.SQL("INSERT INTO public.\"OrderAndItems\"( \
	\"id\", quantity, price, discount, \"createdAt\", deleted, updated, \"orderId\", type, name, \"unitMeasurement\") \
	VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);")

# Lendo o CSV
df = pd.read_csv('OficinaCarros_DetalhesdaFatura.csv', delimiter=',')  # Defina o caminho correto do arquivo CSV


cur.execute("SELECT * FROM public.\"Orders\";")
ordersList = cur.fetchall()

# Convertendo o DataFrame para uma lista de objetos orderAndItemsData
orderAndItems_list = [row_to_orderAndItems(row) for index, row in df.iterrows()]

i = 0
for orderAndItems in orderAndItems_list:
    #print(orderAndItems.CodigoDoDetalheDaFatura , orderAndItems.Data)
    #print(orderItems_to_db(orderAndItems, ordersList))
    cur.execute(insertOrder, orderItems_to_db(orderAndItems, ordersList))
    
# print('\nUser')
# print(ordersList[0])
# print('\norderAndItems')
# print(orderAndItems_list[0])
# print('\nConverted')
# print(orderItems_to_db(orderAndItems_list[0], ordersList))


# Commit the changes and close the cursor and connection
conn.commit()
cur.close()
conn.close()

print("Dados inseridos com sucesso no PostgreSQL!")