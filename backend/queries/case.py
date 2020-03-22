from db.setupDb import Case, Doctor, CommsHistory
from sqlalchemy import and_

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
    if slot_id is not 0:
        # return all cases with slot id
        return {}
    if search is not '':
        if closed is True:
            pass
            # return query for search in fields and contacted not true
        #else:
            # return query for search in fields
    #else:
        # return query for top (limit)


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