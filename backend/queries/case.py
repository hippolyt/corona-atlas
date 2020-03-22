from db.setupDb import Case, Doctor, Patient
from sqlalchemy import and_, or_

def add_case(session, slot_id, doctor_id, testcenter_id, referral_type, patient, address):
    session.add(address)
    session.commit()
    address_id = address.id
    print(address.id)

    patient.address_id = address_id
    session.add(patient)
    session.commit()

    patient_id = patient.id

    case = Case(patient_id=patient_id, doctor_id=doctor_id, testcenter_id=testcenter_id, slot_id=slot_id, referral_type=referral_type, contacted=False)
    session.add(case)
    session.commit()

    case.doctor = session.query(Doctor).filter_by(id=doctor_id).first()

    return case.to_json()

def get_cases(session, limit, search, closed,slot_id):
    cases = []
    if slot_id != 0:
        # return all cases with slot id
        res = session.query(Case).filter(Case.slot_id==slot_id).limit(limit).all()
        print("slotid")

    elif search is not '':
        if closed is True:
            # return query for search in fields and contacted not true
            res = session.query(Case, Patient).filter(and_(Case.patient_id== Patient.id, Case.contacted.isnot(False),or_(Patient.name.like(search), Patient.email.like(search)))).limit(limit).all()
            
            print("search and closed")
            for case, _ in res:
                cases.append(case.to_json())
            return cases
        else:
            # return query for search in fields
            res = session.query(Case, Patient).filter(and_(Case.patient_id== Patient.id, or_(Patient.name.like(search), Patient.email.like(search)))).limit(limit).all()
            
            for case, _ in res:
                cases.append(case.to_json())
            return cases
     
    else:
        # return query for top (limit)
        if closed is True:
            res = session.query(Case).filter(Case.contacted.isnot(False)).limit(limit).all()
            print("closed")
        else:
            res = session.query(Case).limit(limit).all()
            print("default")
    
    for row in res:
        cases.append(row.to_json())
    return cases
