import os
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from setupDb import Address

connection = os.environ["DB_READ_CREDS"]
engine = create_engine(connection)

Session = sessionmaker()
Session.configure(bind=engine)
session = Session()

address = Address(zip_code='12345', city='Wonderland', no='42')
session.add(address)
session.commit()



