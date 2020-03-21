from db.setupDb import Slot
from sqlalchemy import func


def get_slot_stats(session, start, end):
    #max_capacity
    stats = []
    res = session.query(func.sum(Slot.capacity).label("capa"), func.date(Slot.start).label("date")).filter(Slot.start.between(start, end)).group_by(func.date(Slot.start)).all()
    for row in res:
        stat = {
            "date": row.date,
            "max_capacity": row.capa
        }
        stats.append(stat)

    #true_capacity
    