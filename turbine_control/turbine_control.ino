#include <Stepper.h>
#include "orientation_stepper.h"
#include <ArduinoJson.h>
#include <SoftwareSerial.h>


const int stepsPerRevolution = 200;
String message = "";
bool msgReady = false;
unsigned long lastMsg = 0;

// initialize the stepper library on pins 8 through 11:
Stepper myStepper(stepsPerRevolution, 9, 10, 11, 12);
OrientationPID* orientationPID = NULL;
OrientationStepper* orientationStepper = NULL;


const byte rxPin = 2;
const byte txPin = 3;
SoftwareSerial espSerial(rxPin, txPin);

void setup() {
  analogReference(EXTERNAL);
  pinMode(8, OUTPUT);
  digitalWrite(8, HIGH);
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  Serial.begin(9600);
  espSerial.begin(9600);
}

void loop() {
  unsigned long now = millis();

  //every 2s send an initialization request or turbine metrics to ESP8266
  if (now - lastMsg > 2000) {
      lastMsg = now;

    if (orientationStepper == NULL) {
      DynamicJsonDocument doc(1024);
      doc["type"] = "INIT_REQ";
      serializeJson(doc, espSerial);
      espSerial.write('\n');
    } else {
      DynamicJsonDocument doc(1024);
      doc["type"] = "METRICS";
      doc["voltage"] = analogRead(A0) * 1.65 / 1023;
      serializeJson(doc, espSerial);
      espSerial.write('\n');
    }
  }

  if (espSerial.available()) {
    char buffer[100] = "";
    espSerial.readBytesUntil('\n', buffer, 100);
    char bufferCopy[100] = "";

    strcpy(bufferCopy, buffer);
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, buffer);
    if (error) {
      Serial.println("Deserialization Failed!");
      Serial.println(bufferCopy);
    } else {
      if (doc["type"] == "SETTINGS") {
        Serial.println("GOT HERE");
        int kp = doc["kp"];
        int ki = doc["ki"];
        int kd = doc["kd"];
        int state = doc["stepperState"];

        if (orientationStepper == NULL) {
          orientationPID = new OrientationPID(0, 0, 0, kp, ki, kd);
          orientationStepper = new OrientationStepper(&myStepper, orientationPID);
          Serial.println("INITIALIZED");
        } else {
          orientationPID->setConstants(kp, ki, kd);
          orientationStepper->setState(state);
        }
      }
    }
  }

  //Serial.println();
  if (orientationStepper != NULL) {
    orientationStepper->update();
  }
}
