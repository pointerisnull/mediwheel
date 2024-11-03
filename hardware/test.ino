#include <Stepper.h>

const float STEPS_PER_REV = 32; 
const float GEAR_RED = 64;
const float STEPS_PER_OUT_REV = STEPS_PER_REV * GEAR_RED;
int divs = 1; //default
const int SWITCH_PIN = 7;
const int BUZZER_PIN = 6;
                                  /* pins connected*/
Stepper steppermotor(STEPS_PER_REV, 8, 10, 9, 11);

void correct_position() {
  int divs = 90;
  int steps = STEPS_PER_OUT_REV / divs;
  while(digitalRead(SWITCH_PIN) == LOW) {
        steppermotor.setSpeed(1000);  
        steppermotor.step(steps);

        delay(100);
  }
}

void present_meds(int d, int i) {
  int steps = STEPS_PER_OUT_REV / divs;
  for (int j = 0; j < i; j++) {
    steppermotor.setSpeed(1000);
    steppermotor.step(steps);
    
  }

  tone(BUZZER_PIN, 1000, 4000);
  delay(10000);
  noTone(BUZZER_PIN);
  delay(10);

  steps = - STEPS_PER_OUT_REV / divs;
  for (int j = 0; j < i; j++) {
    steppermotor.setSpeed(1000);
    steppermotor.step(steps);
  }
   
}

void setup() {
    pinMode(BUZZER_PIN, OUTPUT);
  pinMode(SWITCH_PIN, INPUT_PULLUP);

  Serial.begin(9600);
}

void loop() {
  if (digitalRead(SWITCH_PIN) == LOW) { //if correcting position
    correct_position();
  } else if (Serial.available() > 0) { 
    int serial_in = Serial.parseInt();
    divs = 6;
    present_meds(divs, serial_in);
    
  }

}