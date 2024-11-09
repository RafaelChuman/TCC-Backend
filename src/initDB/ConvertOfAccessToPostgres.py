from random import randint

#pip install psycopg2-binary
#pip install pyodbc
#sudo apt-get install unixodbc unixodbc-dev -y
#sudo apt-get install libsqliteodbc -y
#sudo apt-get install mdbtools -y
#sudo apt-get install unixodbc odbc-mdbtools -y
import pyodbc
import psycopg2


# Define the DSN that you configured earlier
# Config the file /etc/odbc.ini
# Config the file /etc/odbcinst.ini
dsn = 'MyAccessDB'

# String de conexão
connection_string = (f'DSN={dsn}')

# Connect to the PostgreSQL database
connPostgres = psycopg2.connect(
    host= "127.0.0.1",
    database= "postgres",
    user="postgres",
    password="tcc_univesp!"
)
# Create a cursor object to execute SQL queries
cursorPostgres = connPostgres.cursor()

# Conectando ao banco de dados
conAccess = pyodbc.connect(connection_string)
cursorAccess = conAccess.cursor()


accessSql = []
# Executando uma consulta SQL para listar todas as tabelas do Access

accessSql.append('SELECT name FROM MSysObjects WHERE Type=1 AND Flags=0')
accessSql.append('SELECT TOP 5 * FROM [Veículos]')
accessSql.append('SELECT TOP 5 * FROM [Avarias]')
accessSql.append('SELECT TOP 5 * FROM [Avarias1]')
accessSql.append('SELECT TOP 5 * FROM [Cheques]')
accessSql.append('SELECT TOP 5 * FROM [Clientes]')
accessSql.append('SELECT TOP 5 * FROM [Combustivél]')
accessSql.append('SELECT TOP 5 * FROM [Contas a pagar receber]')
accessSql.append('SELECT TOP 5 * FROM [Descrição RECEBIMENTO PAGAMENTO]')
accessSql.append('SELECT TOP 5 * FROM [Detalhes da Fatura]')
accessSql.append('SELECT TOP 5 * FROM [Detalhes do cheque]')
accessSql.append('SELECT TOP 5 * FROM [Dia]')
accessSql.append('SELECT TOP 5 * FROM [Empresa]')
accessSql.append('SELECT TOP 5 * FROM [Estoque]')
accessSql.append('SELECT TOP 5 * FROM [Fabricante]')
accessSql.append('SELECT TOP 5 * FROM [Faturas]')
accessSql.append('SELECT TOP 5 * FROM [Avaliação]')
accessSql.append('SELECT TOP 5 * FROM [Faturas1]')
accessSql.append('SELECT TOP 5 * FROM [Faturas2]')
accessSql.append('SELECT TOP 5 * FROM [Faturas3]')
accessSql.append('SELECT TOP 5 * FROM [Forma]')
accessSql.append('SELECT TOP 5 * FROM [Fornecedor]')
accessSql.append('SELECT TOP 5 * FROM [Funcionário]')
accessSql.append('SELECT TOP 5 * FROM [Garantia]')
accessSql.append('SELECT TOP 5 * FROM [Mês]')
accessSql.append('SELECT TOP 5 * FROM [Óleo]')
accessSql.append('SELECT TOP 5 * FROM [Pagamento]')
accessSql.append('SELECT TOP 5 * FROM [Pprazo]')
accessSql.append('SELECT TOP 5 * FROM [Pprazo detalhe]')
accessSql.append('SELECT TOP 5 * FROM [Rastreador]')
accessSql.append('SELECT TOP 5 * FROM [Referencia]')
accessSql.append('SELECT TOP 5 * FROM [Status]')
accessSql.append('SELECT TOP 5 * FROM [Status cheque]')
accessSql.append('SELECT TOP 5 * FROM [Tabela1]')
accessSql.append('SELECT TOP 5 * FROM [Tipo de finalidade]')
accessSql.append('SELECT TOP 5 * FROM [Troca de óleo]')
accessSql.append('SELECT TOP 5 * FROM [Erros ao colar]')
accessSql.append('SELECT TOP 5 * FROM [Extintor]')



for asql in accessSql:
    cursorAccess.execute(asql)

    # Obtendo os resultados
    rows = cursorAccess.fetchall()

    print(asql)
    # Iterando sobre os resultados e imprimindo-os
    for row in rows:
        print(row)
    print('\n\n\n\n')




# Commit the changes and close the cursor and connection
cursorAccess.close()
conAccess.close()

# cursorPostgres.commit()
cursorPostgres.close()
connPostgres.close()


# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Avarias1' > /home/chuman/Documentos/TCC/OficinaCarros_Avarias1.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Cheques' > /home/chuman/Documentos/TCC/OficinaCarros_Cheques.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Clientes' > /home/chuman/Documentos/TCC/OficinaCarros_Clientes.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Combustivél' > /home/chuman/Documentos/TCC/OficinaCarros_Combustivél.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Contas a pagar receber' > /home/chuman/Documentos/TCC/OficinaCarros_Contasapagarreceber.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Descrição RECEBIMENTO PAGAMENTO' > /home/chuman/Documentos/TCC/OficinaCarros_DescriçãoRECEBIMENTOPAGAMENTO.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Detalhes da Fatura' > /home/chuman/Documentos/TCC/OficinaCarros_DetalhesdaFatura.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Detalhes do cheque' > /home/chuman/Documentos/TCC/OficinaCarros_Detalhesdocheque.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Dia' > /home/chuman/Documentos/TCC/OficinaCarros_Dia.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Empresa' > /home/chuman/Documentos/TCC/OficinaCarros_Empresa.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Estoque' > /home/chuman/Documentos/TCC/OficinaCarros_Estoque.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Fabricante' > /home/chuman/Documentos/TCC/OficinaCarros_Fabricante.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Faturas' > /home/chuman/Documentos/TCC/OficinaCarros_Faturas.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Avaliação' > /home/chuman/Documentos/TCC/OficinaCarros_Avaliação.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Faturas1' > /home/chuman/Documentos/TCC/OficinaCarros_Faturas1.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Faturas2' > /home/chuman/Documentos/TCC/OficinaCarros_Faturas2.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Faturas3' > /home/chuman/Documentos/TCC/OficinaCarros_Faturas3.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Forma' > /home/chuman/Documentos/TCC/OficinaCarros_Forma.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Fornecedor' > /home/chuman/Documentos/TCC/OficinaCarros_Fornecedor.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Funcionário' > /home/chuman/Documentos/TCC/OficinaCarros_Funcionário.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Garantia' > /home/chuman/Documentos/TCC/OficinaCarros_Garantia.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Mês' > /home/chuman/Documentos/TCC/OficinaCarros_Mês.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Óleo' > /home/chuman/Documentos/TCC/OficinaCarros_Óleo.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Pagamento' > /home/chuman/Documentos/TCC/OficinaCarros_Pagamento.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Pprazo' > /home/chuman/Documentos/TCC/OficinaCarros_Pprazo.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Pprazo detalhe' > /home/chuman/Documentos/TCC/OficinaCarros_Pprazodetalhe.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Rastreador' > /home/chuman/Documentos/TCC/OficinaCarros_Rastreador.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Referencia' > /home/chuman/Documentos/TCC/OficinaCarros_Referencia.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Status' > /home/chuman/Documentos/TCC/OficinaCarros_Status.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Status cheque' > /home/chuman/Documentos/TCC/OficinaCarros_Statuscheque.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Tabela1' > /home/chuman/Documentos/TCC/OficinaCarros_Tabela1.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Tipo de finalidade' > /home/chuman/Documentos/TCC/OficinaCarros_Tipodefinalidade.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Troca de óleo' > /home/chuman/Documentos/TCC/OficinaCarros_Trocadeóleo.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Erros ao colar' > /home/chuman/Documentos/TCC/OficinaCarros_Errosaocolar.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Extintor' > /home/chuman/Documentos/TCC/OficinaCarros_Extintor.csv
# mdb-export /home/chuman/Documentos/TCC/OficinaCarros.accdb 'Veículos' > /home/chuman/Documentos/TCC/OficinaCarros_Veículos.csv
