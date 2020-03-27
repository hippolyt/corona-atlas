from db.setupDb import Slot, Case
from sqlalchemy import func, and_


def get_slot_stats(session, start, end):
    #max_capacity
    stats = []

    subquery = session.query(
        Slot.capacity.label("capa"), 
        func.count(Case.id).label("assigned"), 
        func.date(Slot.start).label("date")
    ) \
        .outerjoin(Case) \
        .group_by(Slot.id) \
        .subquery('sub')

    q = session.query(
        func.sum(subquery.c.capa).label("capa"), 
        subquery.c.date.label("date"), 
        func.sum(subquery.c.assigned).label("assigned")
    )\
        .filter(
            subquery.c.date.between(start, end)
        ) \
        .group_by(subquery.c.date)

   
    res = q.all()
    for row in res:
        stat = {
            "date": row.date.isoformat(),
            "maxCapacity": row.capa,
            "booked": int(row.assigned)
        }
        stats.append(stat)

    #true_capacity
    return stats