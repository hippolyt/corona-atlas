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
    email = Column('email', String(100))
    address_id = Column(Integer, ForeignKey('address.id'))
    address = relationship("Address")
    phone = Column('phone', String(30))
    mobile = Column('mobile', String(30))
    consent = Column('consent', Boolean)
    tested = Column('is_tested', Boolean)
    high_risk = Column('high_risk', Boolean)

    def to_json(self):
        return {
            "id": self.id, "name": self.name, "email": self.email, "phone": self.phone, "mobile": self.mobile,
            "consent": self.consent, "tested": self.tested, "high_risk": self.high_risk, "address": self.address.to_json()
        }


class Address(Base):
    __tablename__ = 'address'
    id = Column(Integer, Sequence('address_id_seq'), primary_key=True)
    zip_code = Column('zip', String(10))
    city = Column('city', String(50))
    street = Column('street', String(60))
    no = Column('no', String(10))
    
    
    def to_json(self):
        return {"id":self.id, "zip_code":self.zip_code, "city": self.city, "street": self.street, "no": self.no}


class Doctor(Base):
    __tablename__ = 'doctor'
    id = Column(Integer, Sequence('doctor_id_seq'), primary_key=True)
    name = Column('name', String(60))
    email = Column('email', String(100))
    has_access = Column('has_access', Boolean)

    def to_json(self):
        return {"id": self.id, "name": self.name, "email": self.email, "has_access": self.has_access}
    


class Testcenter(Base):
    __tablename__ = 'testcenter'
    id = Column(Integer, Sequence('testcenter_id_seq'), primary_key=True)
    name = Column('name', String(60))
    email = Column('email', String(100))
    address_id = Column(Integer, ForeignKey('address.id'))
    address = relationship("Address")
    phone = Column('phone', String(30))

    def to_json(self):
        return {"id": self.id, "name": self.name, "email": self.email, "phone": self.phone}

class Slot(Base):
    __tablename__ = 'slot'
    id = Column(Integer, Sequence('slot_id_seq'), primary_key=True)
    start = Column('start', DateTime)
    end = Column('end', DateTime)
    capacity = Column('capacity', Integer)
    testcenter_id = Column(Integer, ForeignKey('testcenter.id'))
    testcenter = relationship("Testcenter")

    def to_json(self):
        return {"id": self.id, "start": self.start, "end": self.end, "capacity": self.capacity}


class SlotConfig(Base):
    __tablename__ = 'slotConfig'
    id = Column(Integer, Sequence('slot_id_seq'), primary_key=True)
    days_per_week = Column('days_per_week', Integer)
    start_time = Column('start_time', DateTime)
    end_time = Column('end_time', DateTime)
    slot_size = Column('slotsize', Integer)
    slot_capacity = Column('slotcapacity', Integer)

    def to_json(self):
        return {"id": self.id, "days_per_week": self.days_per_week, "start_time": self.start_time, 
        "end_time": self.end_time, "slot_size": self.slot_size, "slot_capacity": self.slot_capacity}

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

    def to_json(self):
        return {"id": self.id, "contacted": self.contacted, "referral_type": self.referral_type,
        "comment": self.comment, "patient": self.patient.to_json(), "doctor": self.doctor.to_json(),
        "slot": self.slot.to_json()}

class CommsHistory(Base):
    __tablename__ = 'commshistory'
    id = Column(Integer, Sequence('comms_id_seq'), primary_key=True)
    timestamp = Column('timestamp', DateTime)
    comm_type = Column('type', String(30))
    case_id = Column(Integer, ForeignKey('case.id'))
    case = relationship("Case")

    def to_json(self):
        return {"id": self.id, "timestamp": self.timestamp, "comm_type": self.comm_type}

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    display_name = Column('display_name', String(60))
    email = Column('email', String(100), unique=True)
    role = Column('role', String(20))
    doctor_id = Column(Integer, ForeignKey('doctor.id'))
    doctor = relationship("Doctor")
    testcenter_id = Column(Integer, ForeignKey('testcenter.id'))
    testcenter = relationship("Testcenter")
    logon_pwd_hash = Column('logon_pwd_hash', String(200))
    logon_pwd_salt = Column('logon_pwd_salt', String(200))
    logon_pwd_valid_thru = Column('logon_pwd_valid_thru', DateTime)

    def to_json(self):
        return {"id": self.id, "display_name": self.display_name, "email": self.email, "role":self.role, "logon_pwd_hash": self.logon_pwd_hash, "logon_pwd_salt": self.logon_pwd_salt, "logon_pwd_valid_thru": self.logon_pwd_valid_thru}


meta.create_all(bind=engine)
