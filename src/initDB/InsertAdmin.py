import psycopg2
import pandas as pd
from psycopg2 import sql
import datetime
import uuid
from random import randint
from dataclasses import dataclass
from sqlalchemy import create_engine, Table, Column, String, Boolean, DateTime, MetaData


# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host= "127.0.0.1",
    database= "postgres",
    user="postgres",
    password="tcc_univesp!"
)


# Create a cursor object to execute SQL queries
cur = conn.cursor()


insertUser = sql.SQL("INSERT INTO public.\"User\"( \
	\"userId\", name, \"userName\", password, \"imgPath\", email, cellphone, telegram, \"isAdmin\", \"createdAt\", deleted, updated) \
	VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);")
		 

id = str(uuid.uuid4())
createdAt = datetime.datetime.now() 
cur.execute(insertUser, (id, "Rafael Santana", "chuman", "20101994", "", "rafael_chumansantana@outlook.com", 12997200179, "12997200179", True, createdAt, False, createdAt))


# Commit the changes and close the cursor and connection
conn.commit()
cur.close()
conn.close()
