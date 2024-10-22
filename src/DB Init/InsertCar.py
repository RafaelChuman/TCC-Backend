import psycopg2
import pandas as pd
from psycopg2 import sql
from datetime import datetime
import uuid
from random import randint
from dataclasses import dataclass
from sqlalchemy import create_engine, Table, Column, String, Boolean, DateTime, MetaData

       
@dataclass
class CarCSV:
    Controle: int
    Codigo: str
    Placa: str
    Ano: str
    Fabricante: str
    Modelo: str
    Cor: str
    Injecao: str
    Carburado: str
    Turbinado: str
    Motor: str
    Alcool: str
    Diesel: str
    Gasolina: str
    Gas: str
    Outros: str
    Acessorios: str
    Alarmes: str
    Original: str
    Instalado: str
    Segredo: str
    Seguro: str
    Empresa: str
    Obs: str
    Cliente: str
    Rastreador: str
    InstaladoLoja: str


def row_to_car(row):
    
    return CarCSV(
        Controle = row['Controle'],
        Codigo = row['Código'],
        Placa = row['Placa'],
        Ano = row['Ano'],
        Fabricante = row['Fabricante'],
        Modelo = row['Modelo'],
        Cor = row['Cor'],
        Injecao	 = row['Injeção'],
        Carburado = row['Carburado'],
        Turbinado = row['Turbinado'],
        Motor	 = row['Motor'],
        Alcool	 = row['Alcool'],
        Diesel = row['Diesel'],
        Gasolina = row['Gasolina'],
        Gas	 = row['Gás'],
        Outros = row['Outros'],
        Acessorios = row['Acessórios'],
        Alarmes = row['Alarmes'],
        Original = row['Original'],
        Instalado = row['Instalado'],
        Segredo = row['Segredo'],
        Seguro = row['Seguro'],
        Empresa = row['Empresa'],
        Obs = row['Obs'],
        Cliente = row['Cliente'],
        Rastreador = row['Rastreador'],
        InstaladoLoja = row['Instalado na loja']
    )

# Função para converter carData em dados compatíveis com o PostgreSQL
def car_to_db(car: CarCSV, userList):

    cadastro_datetime = datetime.now()
    userId = ""

    for user in userList:
        if(user[1] == car.Cliente):
            userId = str(user[0])
            break

    #Inserir carros no cliente Default
    if(userId == ""): userId = "aa7e2806-a982-406a-8735-4150367e7ec2"

    ano = 1000
    if(str(car.Ano) != "nan"): 
        ano = int(car.Ano)

    return (
        str(uuid.uuid4()),
        car.Fabricante ,
        car.Modelo,
        'kind',
        'type',
        car.Placa,
        ano,
        ano,
        car.Cor,
        cadastro_datetime,
        False,
        cadastro_datetime,
        userId,
        int(car.Controle),
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
insertCar = sql.SQL("INSERT INTO public.\"Car\"( \
	\"carId\", brand, model, kind, type, plate, \"yearOfFabrication\", \"yearOfModel\", color, \"createdAt\", deleted, updated, \"userId\", id) \
	VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);")

# Lendo o CSV
df = pd.read_csv('OficinaCarros_Veículos.csv', delimiter=',')  # Defina o caminho correto do arquivo CSV


cur.execute("SELECT * FROM public.\"User\";")
userList = cur.fetchall()


# Convertendo o DataFrame para uma lista de objetos carData
cars_list = [row_to_car(row) for index, row in df.iterrows()]

for car in cars_list:
    #print(car_to_db(car, userList))
    cur.execute(insertCar, car_to_db(car, userList))
    
# print('\nUser')
# print(userList[0])
# print('\nCar')
# print(cars_list[0])
# print('\nConverted')
# print(car_to_db(cars_list[0], userList))


# Commit the changes and close the cursor and connection
conn.commit()
cur.close()
conn.close()

print("Dados inseridos com sucesso no PostgreSQL!")