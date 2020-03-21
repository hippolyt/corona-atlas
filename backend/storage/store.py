from copy import copy


class UserStore:
    def __init__(self):
        self._data = {}

    def save(self, user):
        self._data[user.id] = copy(user)
