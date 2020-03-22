from twilio.rest import Client
import subprocess
import os
# STUFF BELOW HERE IS ONLY NEEDE FOR TESTING, NOT FOR MAIN CONTENT
import threading
import http.server
import socketserver
import time

class twInteractions:
    def __init__(self):
        print("init twilio")
        accountSID = os.environ["TWILIO_ID"]
        accessToken = os.environ["TWILIO_TOKEN"]
        self.client = Client(accountSID, accessToken)
        self.callXmlServePath = "twilioServer/call.xml"

    def prepareCall(self, callMessage):
        print("creating new call")
        xmlCall = '<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="alice" language="de-DE">{}</Say></Response>'.format(callMessage)
        print(xmlCall)
        with open(self.callXmlServePath, "w") as xmlFile:
            print(xmlCall, file=xmlFile)

    def performCall(self, publicPath, fromNumber, toNumber):
        print("making call")
        call = self.client.calls.create(url=publicPath,from_=fromNumber,to=toNumber,method="GET")
        return call

# THIS IS A SHIT FUNCTION THAT IS REPLACED BY OUR OWN NGINX INFRASTRUCTURE!
def serveCallDirectory():
    PORT = 8000
    Handler = http.server.SimpleHTTPRequestHandler
    httpd = socketserver.TCPServer(("", PORT), Handler)
    print("serving at port", PORT)
    httpd.serve_forever()


print("First do: source ~/.env")
print("What is your phone number (starts with +49)")
toNumber=input()

tw = twInteractions()
tw.prepareCall("Dies ist ein Beispielanruf. Alles könnte hier gesagt werden")
thread = threading.Thread(target=serveCallDirectory, args=())
thread.daemon = True
thread.start()
tw.performCall("http://corona-atlas.de:8000/twilioServer/call.xml", fromNumber=os.environ["TWILIO_CALLER_NUMBER"], toNumber=toNumber)
time.sleep(30) 
# This sleep can be avoided by using custom call ids and serving them separately. The most important thing is that the call.xml is online for ~1 minute after the api is called.
print("Thanks for your attention")
print("TODO: https://www.twilio.com/docs/usage/security")
