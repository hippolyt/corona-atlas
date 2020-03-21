from sqlalchemy import create_engine, MetaData
from sqlalchemy import Column, Sequence, Integer, String, ForeignKey, Boolean, DateTime, Interval
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os

# get connection string from env variable
connection = os.environ["DB_CREATION_CREDS"]
engine = create_engine(connection)

meta = MetaData()

Base = declarative_base(metadata=meta)

class Patient(Base):
    __tablename__ = 'patient'
    id = Column(Integer, Sequence('patient_id_seq'), primary_key=True)
    name = Column('name', String(60))
    email = Column('email', String(30))
    address_id = Column(Integer, ForeignKey('address.id'))
    address = relationship("Address")
    phone = Column('phone', String(30))
    mobile = Column('mobile', String(30))
    consent = Column('consent', Boolean)
    tested = Column('is_tested', Boolean)
    high_risk = Column('high_risk', Boolean)


class Address(Base):
    __tablename__ = 'address'
    id = Column(Integer, Sequence('address_id_seq'), primary_key=True)
    zip_code = Column('zip', String(10))
    city = Column('city', String(50))
    street = Column('street', String(60))
    no = Column('no', String(10))


class Doctor(Base):
    __tablename__ = 'doctor'
    id = Column(Integer, Sequence('doctor_id_seq'), primary_key=True)
    name = Column('name', String(60))
    email = Column('email', String(30))
    has_access = Column('has_access', Boolean)
    


class Testcenter(Base):
    __tablename__ = 'testcenter'
    id = Column(Integer, Sequence('testcenter_id_seq'), primary_key=True)
    name = Column('name', String(60))
    email = Column('email', String(30))
    address_id = Column(Integer, ForeignKey('address.id'))
    address = relationship("Address")
    phone = Column('phone', String(30))

class Slot(Base):
    __tablename__ = 'slot'
    id = Column(Integer, Sequence('slot_id_seq'), primary_key=True)
    start = Column('start', DateTime)
    end = Column('end', DateTime)
    capacity = Column('capacity', Integer)
    testcenter_id = Column(Integer, ForeignKey('testcenter.id'))
    testcenter = relationship("Testcenter")


class SlotConfig(Base):
    __tablename__ = 'slotConfig'
    id = Column(Integer, Sequence('slot_id_seq'), primary_key=True)
    days_per_week = Column('days_per_week', Integer)
    start_time = Column('start_time', DateTime)
    end_time = Column('end_time', DateTime)
    slot_size = Column('slotsize', Interval)

class Case(Base):
    __tablename__ = 'case'
    id = Column(Integer, Sequence('case_id_seq'), primary_key=True)
    patient_id = Column(Integer, ForeignKey('patient.id'))
    patient = relationship("Patient")
    doctor_id = Column(Integer, ForeignKey('doctor.id'))
    doctor = relationship("Doctor")
    testcenter_id = Column(Integer, ForeignKey('testcenter.id'))
    testcenter = relationship("Testcenter")
    slot_id = Column(Integer, ForeignKey('slot.id'))
    slot = relationship("Slot")
    contacted = Column('contacted', Boolean)
    referral_type = Column('referralType', String(30))
    comment = Column('comment', String(500))

class CommsHistory(Base):
    __tablename__ = 'commshistory'
    id = Column(Integer, Sequence('comms_id_seq'), primary_key=True)
    timestamp = Column('timestamp', DateTime)
    comm_type = Column('type', String(30))
    case_id = Column(Integer, ForeignKey('case.id'))
    case = relationship("Case")

meta.create_all(bind=engine)
