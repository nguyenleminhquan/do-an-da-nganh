import sys
import random
import time
import serial . tools . list_ports

from Adafruit_IO import MQTTClient

AIO_FEED_ID=["cnpm-led","cnpm-fan","cnpm-door"]
AIO_USERNAME="TSang2907"
AIO_KEY="aio_lRuD95GgLRLbkoF52yOsJ94alaxg"

def connected(client):
    print("Ket noi thanh cong ...")
    for feed in AIO_FEED_ID:
        client.subscribe(feed)

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

def message(client , feed_id , payload):
    print("Nhan du lieu tu "+feed_id+": "+payload)
    if MicrobitConected:
        if feed_id == "cnpm-led":
            ser.write(("LED:" + str(payload) + "#").encode())
        elif feed_id == "cnpm-fan":
            ser.write(("FAN:" + str(payload) + "#").encode())
        elif feed_id == "cnpm-door":
            ser.write(("DOR:" + str(payload) + "#").encode())
def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB Serial Device" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort

mess = ""
def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    if splitData[1] == "TEMP":
        client.publish("cnpm_temp", splitData[5])
    if splitData[2] == "HUMI":
        client.publish("cnpm-humi", splitData[6])
    if splitData[3] == "INF":
        client.publish("cnpm-inf", splitData[7])
    if splitData[4] == "GAS":
        client.publish("cnpm-gas", splitData[8])

mess = ""
def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]
MicrobitConected=False
if getPort()!="None":
    ser = serial . Serial ( port = getPort () , baudrate =115200)
    MicrobitConected = True
client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    if MicrobitConected:
        #readSerial()
        time.sleep(1)
