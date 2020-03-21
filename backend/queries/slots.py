from db.setupDb import Slot

def get_slots_by_time(start, end, session):
    slots = []
    query = session.query(Slot).filter(Slot.start >= start, Slot.end <= end).all()
    for row in query:
        slot = {
            "slotId": row.id,
            "start": row.start,
            "end": row.end,
            "capacity": row.capacity
        }
        slots.append(slot)

    return slots

