```
Syntax:
USECASE
/api_internal/your_favourite_endpoint
result



Buchungsübersicht

SLOTS ANZEIGEN MONATSÜBERSICHT
/api_internal/sample_collection/<ID>/slots/<MONTH NUMBER>
[
  {
    "day" : 1,
    "free_appointments" : 5,
    "max_appointments" : 60
  },
  {
    "day" : 2,
    "free_appointments" : 50,
    "max_appointments" : 60
  },
  ....
]

SLOTS ANZEIGEN TAGESÜBERSICHT
/api_internal/sample_collection/<ID>/slots/<MONTH NUMBER>/<DAY NUMBER>
[
  {
    "start" : "8:00",
    "end" : "10:00",
    "free_appointments" : 3,
    "max_appointments" : 10
  },
  {
    "start" : "10:00",
    "end" : "12:00",
    "free_appointments" : 8,
    "max_appointments" : 10
  },
  ...
]





Patient Kontaktdaten für verschiedene Wege:

ROBOCALL
/api_internal/patient/<ID>/phone
004912345

EPOSTBRIEF
/api_internal/patient/<ID>/post_address
{
  "name" : "Max Mustermann",
  "street" : "Musterallee 1337a",
  "plz" : "12345"
  "city" : "Mainz"  
}

EMAIL
/api_internal/patient/<ID>/email
max@mustermann.de


```
