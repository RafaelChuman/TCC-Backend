import psycopg2
import pandas as pd
from psycopg2 import sql
import datetime
import uuid
from random import randint
from dataclasses import dataclass
from sqlalchemy import create_engine, Table, Column, String, Boolean, DateTime, MetaData


# Define the INSERT queries with placeholders for the data

# insertUser = sql.SQL("INSERT INTO public.\"User\"( \
# 	id, name, \"userName\", password, \"imgPath\", email, cellphone, telegram, \"isAdmin\", \"createdAt\", deleted, updated) \
# 	VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);")
		 

# id = str(uuid.uuid4())
# createdAt = datetime.datetime.now() 
# cur.execute(insertIoTUser, (id, "Rafael", "chuman", "20101994", "", "rafael_chumansantana@outlook.com", 12997200179, "12997200179", True, createdAt, False, createdAt))

# # Define the INSERT queries with placeholders for the data
# insertIoTMonitor = sql.SQL("INSERT INTO public.\"IoTMonitor\"( \
# 	id, temperature, humidity, \"createdAt\", \"ioTId\", \"noBreak\") \
# 	VALUES (%s, %s, %s, %s, %s, %s);")

# ioTIds = ["86cba34b-484e-4c85-9706-0b000b5fee49", "915b09ae-2a15-4e24-b345-08e5663b8618", "791cc2a0-7f03-48fa-bb44-f27ad85af152", "b32aafe1-344b-49c1-97ab-962ccbebf91f"]

# # Insert the data into the PostgreSQL database
# for i in range(10000):
    
#     index = 0
#     while(index < 4):
#         ioTId = ioTIds[index]
#         temperature = randint(23, 27)
#         humidity = randint(50, 60)
#         noBreak = True

#         now = datetime.datetime.now()
#         createdAt = now + datetime.timedelta(minutes=((i*5)-60))
        
#         id = str(uuid.uuid4())
#         cur.execute(insertIoTMonitor, (id, temperature, humidity, createdAt, ioTId, noBreak))

#         index=index+1
        
@dataclass
class ClienteData:
    codigo: int
    cliente: str
    endereco: str
    bairro: str
    cidade: str
    uf: str
    cep: str
    residencial: str
    celular: str
    comercial: str
    ramal: str
    recado: str
    com_quem: str
    email: str
    rg: str
    cpf: str
    solteiro: int
    casado: int
    cnpj: str
    cadastro: str
    inscricao: str
    obs: str
    dia: int
    mes: int
    ano: int


def row_to_cliente(row):
    
    return ClienteData(
        codigo=row['Código'],
        cliente=row['Cliente'],
        endereco=row['Endereço'],
        bairro=row['Bairro'],
        cidade=row['Cidade'],
        uf=row['UF'],
        cep=row['CEP'],
        residencial=row['Residencial'],
        celular=row['Celular'],
        comercial=row['Comercial'],
        ramal=row['Ramal'],
        recado=row['Recado'],
        com_quem=row['Com quem'],
        email=row['E-mail'],
        rg=row['RG'],
        cpf=row['CPF'],
        solteiro=row['Solteiro'],
        casado=row['Casado'],
        cnpj=row['CNPJ'],
        cadastro=row['Cadastro'],
        inscricao=row['Inscrição'],
        obs=row['Obs'],
        dia=row['Dia'],
        mes=row['Mês'],
        ano=row['Ano']
    )

# Função para converter ClienteData em dados compatíveis com o PostgreSQL
def cliente_to_db(cliente):

    cadastro_datetime = pd.to_datetime(cliente.cadastro, format='%m/%d/%y %H:%M:%S', errors='coerce')

    return (
        str(uuid.uuid4()),
        cliente.cliente ,
        str(cliente.cliente).replace(' ', '_').lower() ,
        'default_password' ,
        '',
        cliente.email if cliente.email else '',
        cliente.celular if cliente.celular else '',
        cliente.comercial if cliente.comercial else '',
        False,
        cadastro_datetime,
        False,
        cadastro_datetime,
        int(cliente.codigo),
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
insertUser = sql.SQL("INSERT INTO public.\"User\"( \
	\"userId\", name, \"userName\", password, \"imgPath\", email, cellphone, telegram, \"isAdmin\", \"createdAt\", deleted, updated, id) \
	VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);")

# Lendo o CSV
df = pd.read_csv('OficinaCarros_Clientes.csv', delimiter=',')  # Defina o caminho correto do arquivo CSV


# Convertendo o DataFrame para uma lista de objetos ClienteData
clientes_list = [row_to_cliente(row) for index, row in df.iterrows()]

for cliente in clientes_list:
    cur.execute(insertUser, cliente_to_db(cliente))
#print(cliente_to_db(clientes_list[0]))


# Commit the changes and close the cursor and connection
conn.commit()
cur.close()
conn.close()

print("Dados inseridos com sucesso no PostgreSQL!")