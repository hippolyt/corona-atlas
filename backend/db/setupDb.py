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
    consent = Column('consent', Boolean)
    risky = Column('Risk patient', Boolean)



class Address(Base):
    __tablename__ = 'address'
    id = Column(Integer, Sequence('address_id_seq'), primary_key=True)
    zip_code = Column('zip', String(10))
    city = Column('city', String(50))
    no = Column('no', String(10))


class Doctor(Base):
    __tablename__ = 'doctor'
    id = Column(Integer, Sequence('doctor_id_seq'), primary_key=True)
    name = Column('name', String(60))
    email = Column('email', String(30))
    referral_type = Column('referralType', String(30))


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
    start_time = Column('start', DateTime)
    end_time = Column('end', DateTime)
    capacity = Column('capacity', Integer)
    testcenter_id = Column(Integer, ForeignKey('testcenter.id'))
    testcenter = relationship("Testcenter")


class SlotConfig(Base):
    __tablename__ = 'slotConfig'
    id = Column(Integer, Sequence('slot_id_seq'), primary_key=True)
    days_per_week = Column('days_per_week', Integer)
    startTime = Column('start_time', DateTime)
    endTime = Column('end_time', DateTime)
    slotSize = Column('slotsize', Interval)

class Case(Base):
    __tablename__ = 'case'
    id = Column(Integer, Sequence('case_id_seq'), primary_key=True)
    patient_id = Column(Integer, ForeignKey('patient.id'))
    patient = relationship("Patient")
    doctor_id = Column(Integer, ForeignKey('doctor.id'))
    doctor = relationship("Doctor")
    testcenter_id = Column(Integer, ForeignKey('testcenter.id'))
    testcenter = relationship("Testcenter")
    contacted = Column('contacted', Boolean)

meta.create_all(bind=engine)
