import psycopg2
import pandas as pd
from psycopg2 import sql
from datetime import datetime
import uuid
from random import randint
from dataclasses import dataclass
from sqlalchemy import create_engine, Table, Column, String, Boolean, DateTime, MetaData

       
@dataclass
class OrderCSV:
        CodigoDaFatura : int
        CodigoCliente : int
        GarantiaPC : str
        GarantiaMO : str
        Hoje : str
        Entrada : str
        Saida : str
        Funcionario : str
        Cliente : str
        Endereço : str
        Bairro : str
        Residencial : str
        Comercial : str
        Celular : str
        Placa : str
        Modelo : str
        Ano : int
        Defeito : str


def row_to_car(row):
    
    return OrderCSV(
        CodigoDaFatura = row['CódigoDaFatura'],
        CodigoCliente = row['CódigoCliente'],
        GarantiaPC = row['Garantia PÇ'],
        GarantiaMO = row['Garantia MO'],
        Hoje = row['Hoje'],
        Entrada = row['Entrada'],
        Saida = row['Saída'],
        Funcionario	 = row['Funcionário'],
        Cliente = row['Cliente'],
        Endereço = row['Endereço'],
        Bairro	 = row['Bairro'],
        Residencial	 = row['Residencial'],
        Comercial = row['Comercial'],
        Celular = row['Celular'],
        Placa	 = row['Placa'],
        Modelo = row['Modelo'],
        Ano = row['Ano'],
        Defeito = row['Defeito'],
    )

# Função para converter carData em dados compatíveis com o PostgreSQL
def order_to_db(order: OrderCSV, userList, carList):

    cadastro_datetime = pd.to_datetime(order.Entrada, format='%m/%d/%y %H:%M:%S', errors='coerce')
    userId = ""
    carId = ""

    for user in userList:
        if(user[1] == order.Cliente):
            userId = str(user[0])
            break

    for car in carList:
        if(car[5] == order.Placa):
            carId = str(car[0])
            break    

    if(userId == ""): userId = "aa7e2806-a982-406a-8735-4150367e7ec2"
    if(carId == ""): carId = "79bc6877-7ce0-4e9d-b528-5f6431a6b8b9"


    return (
        str(uuid.uuid4()),
        0,
        0,
        'finished',
        True,
        cadastro_datetime,
        False,
        cadastro_datetime,
        userId,
        carId,
        int(order.CodigoDaFatura),
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
insertOrder = sql.SQL("INSERT INTO public.\"Orders\"( \
	\"orderId\", km, fuel, \"statusExecution\", \"statusOrder\", \"createdAt\", deleted, updated, \"userId\", \"carId\", id) \
	VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);")

# Lendo o CSV
df = pd.read_csv('OficinaCarros_Faturas.csv', delimiter=',')  # Defina o caminho correto do arquivo CSV


cur.execute("SELECT * FROM public.\"User\";")
userList = cur.fetchall()



cur.execute("SELECT * FROM public.\"Car\";")
carList = cur.fetchall()

# Convertendo o DataFrame para uma lista de objetos carData
cars_list = [row_to_car(row) for index, row in df.iterrows()]

for car in cars_list:
    print(order_to_db(car, userList, carList))
    cur.execute(insertOrder, order_to_db(car, userList, carList))
    
# print('\nUser')
# print(userList[0])
# print('\nCar')
# print(cars_list[0])
# print('\nConverted')
# print(order_to_db(cars_list[0], userList))


# Commit the changes and close the cursor and connection
conn.commit()
cur.close()
conn.close()

print("Dados inseridos com sucesso no PostgreSQL!")