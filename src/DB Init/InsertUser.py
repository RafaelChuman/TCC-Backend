import psycopg2
from psycopg2 import sql
import datetime
import uuid
from random import randint


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

insertIoTUser = sql.SQL("INSERT INTO public.\"User\"( \
	id, name, \"userName\", password, \"imgPath\", email, cellphone, telegram, \"isAdmin\", \"createdAt\", deleted, updated) \
	VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);")
		 

id = str(uuid.uuid4())
createdAt = datetime.datetime.now() 
cur.execute(insertIoTUser, (id, "Rafael", "chuman", "20101994", "", "rafael_chumansantana@outlook.com", 12997200179, "12997200179", True, createdAt, False, createdAt))

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
        

# Commit the changes and close the cursor and connection
conn.commit()
cur.close()
conn.close()
