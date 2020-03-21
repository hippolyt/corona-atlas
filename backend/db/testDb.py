import os
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from datetime import datetime as dt

from setupDb import Address, Testcenter, Slot



connection = os.environ["DB_READ_CREDS"]
engine = create_engine(connection)

Session = sessionmaker()
Session.configure(bind=engine)
session = Session()

address = Address(zip_code='12345', city='Wonderland', no='42')
session.add(address)
session.commit()

testcenter = Testcenter(name='Berlin', email='berlin@testcenter.com', address_id = address.id, phone='0192853')
session.add(testcenter)
session.commit()

slot1 = Slot(start=dt(2020,3,22,9,0,0,0), end=dt(2020,3,22,10,0,0,0), capacity=10, testcenter_id=testcenter.id)
slot2 = Slot(start=dt(2020,3,22,10,0,0,0), end=dt(2020,3,22,11,0,0,0), capacity=10, testcenter_id=testcenter.id)
slot3 = Slot(start=dt(2020,3,22,13,0,0,0), end=dt(2020,3,22,14,0,0,0), capacity=10, testcenter_id=testcenter.id)

session.add(slot1)
session.add(slot2)
session.add(slot3)
session.commit()



