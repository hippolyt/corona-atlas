

class User:

    def __init__(self, role, name, email):
        self._role = role
        self._name = name
        self._email = email

    @property
    def role(self):
        return self._role

    @role.setter
    def role(self, role):
        self._role = role

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):
        self._name = name

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, email):
        self._email = email
    