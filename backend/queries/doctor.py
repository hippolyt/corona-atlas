from db.setupDb import Doctor
from sqlalchemy import or_

def disable_doctor_by_id(id, session):
    doctor = session.query(Doctor).filter_by(id=id).first()
    doctor.has_access = False
    session.commit()

    doctor = {
        "id": doctor.id,
        "name": doctor.name,
        "email": doctor.email,
        "access": doctor.has_access
    }
    return doctor

def get_doctors(session, limit, search):
    doctors = []
    if search is not '':
        res = session.query(Doctor).filter(or_(Doctor.name.like(search), (Doctor.email.like(search)))).limit(limit).all()

    else:
        res = session.query(Doctor).limit(limit).all()

    for row in res:
        doctor = {
            "id": row.id,
            "name": row.name,
            "email": row.email,
            "access": row.has_access
        }
        doctors.append(doctor)
    
    return doctors
    
def add_doctor(session, name, email, access):
    doctor = Doctor(name=name, email=email, has_access=access)
    session.add(doctor)
    session.commit()
    doctor = {
        "id": doctor.id,
        "name": doctor.name,
        "email": doctor.email,
        "access": doctor.has_access
    }
    return doctor