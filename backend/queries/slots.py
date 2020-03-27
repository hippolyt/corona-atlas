from db.setupDb import Slot, Case
from sqlalchemy import func

def get_slots_by_time(start, end, session):
    slots = []

    subquery = session.query(
        func.count(Case.id).label("booked"), 
        Slot.id.label("id")
    ) \
        .outerjoin(Case) \
        .group_by(Slot.id) \
        .subquery('sub')

    query = session.query(
            Slot.capacity.label("capacity"),
            subquery.c.booked, 
            Slot.start.label("start"),
            Slot.end.label("end"),
            subquery.c.id.label("id")
        )\
        .outerjoin(subquery, subquery.c.id==Slot.id) \
        .filter(
            Slot.start.between(start, end)
        )\
    
    res = query.all()

    for row in res:
        slot = {
            "slotId": row.id,
            "start": row.start,
            "end": row.end,
            "capacity": row.capacity,
            "booked": row.booked
        }
        slots.append(slot)

    return slots

