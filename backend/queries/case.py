from db.setupDb import Case, Doctor

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
            # return query for search in fields and contacted not true
        #else:
            # return query for search in fields
    #else:
        # return query for top (limit)

