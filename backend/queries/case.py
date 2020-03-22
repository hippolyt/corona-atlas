from db.setupDb import Case, Doctor, Patient, CommsHistory
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

def get_case_by_id(session, id):
    case = session.query(Case).filter_by(id=id).first()
    
    return case.to_json()

def update_case_by_id(session, id, params):
    case = session.query(Case).filter_by(id=id).first()
    if params.get('comment', '') != '':
        case.comment = params.get('comment')
    if params.get('slotId', '') != '':
        case.slot_id = int(params.get('slotId'))
    if params.get('contacted', '') != '':
        case.contacted = params.get('contacted')
    if params.get('tested', '') != '':
        case.patient.tested = bool(params.get('tested'))
    session.commit()
    return case.to_json()

def delete_case_by_id(session, id):
    case = session.query(Case).filter_by(id=id).first()
    patient = session.query(Patient).filter_by(id=case.patient_id).first()
    session.delete(patient.address)
    session.delete(case.patient)
    session.delete(case)
    session.commit()

def get_cases(session, limit, search, closed,slot_id):
    cases = []
    if slot_id != 0:
        # return all cases with slot id
        res = session.query(Case).filter(Case.slot_id==slot_id).limit(limit).all()
        print("slotid")

    elif search is not '':
        if closed is True:
            pass
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


def get_comm_history(session, case_id, type):
    # get comm history for case id and type (if specified)
    # if type == "":
    #     res = session.query(CommsHistory).filter_by(case_id=case_id).all()
    # else:
    #     res = session.query(CommsHistory).filter(and_(CommsHistory.case_id.like(case_id), CommsHistory.comm_type.like(type))).all()

    res = session.query(CommsHistory).filter_by(case_id=case_id).all()

    history = []
    for row in res:
        h = {
            'id': row.id,
            'timestamp': row.timestamp,
            'comm_type': row.comm_type,
            'case_id': row.case_id
        }
        history.append(h)

    return history

def add_comm_history(session, case_id, timestamp, comm_type):
    # add comm history
    history = CommsHistory(timestamp=timestamp, comm_type=comm_type, case_id=case_id)
    session.add(history)
    session.commit()

    history = {
        "id": history.id,
        "timestamp": history.timestamp,
        "comm_type": history.comm_type,
        "case_id": history.case_id
    }
    
    return history

def get_case_and_patient(session, case_id):
    # get case and patient for case id
    case = session.query(Case).filter_by(id=case_id).first()
    session.commit()

    patient = case.patient

    return case, patient
