#include <TFT_eSPI.h>

#include "components/btn.h"
#include "components/thermometer.h"
#include "components/wifi.h"

#define BUTTON_1 35
#define BUTTON_2 0

TFT_eSPI screen = TFT_eSPI(135, 240);

Button btn1(BUTTON_1);
Button btn2(BUTTON_2);

Wifi wifi = Wifi("Jonathan's Galaxy A50", "Azeqsdwxc123");

Thermometer *thermometer = Thermometer::get();


void setup() {
    Serial.begin(115200);
    Serial.println("Start");

    screen.init();
    screen.setRotation(1);
    screen.setTextSize(2);
    screen.fillScreen(TFT_BLACK);
    screen.setTextSize(1);
    screen.setCursor(0, 0);
    screen.setTextDatum(MC_DATUM);

    screen.setRotation(0);


    screen.fillScreen(TFT_BLACK);
    screen.setTextDatum(MC_DATUM);

    screen.drawString("Left Button:", screen.width() / 2, screen.height() / 2 - 16);
    screen.drawString("[Connect to Wifi]", screen.width() / 2, screen.height() / 2);
    screen.drawString("Right Button:", screen.width() / 2, screen.height() / 2 + 16);
    screen.drawString("[Disconnect from Wifi]", screen.width() / 2, screen.height() / 2 + 32);
    screen.setTextDatum(TL_DATUM);

    // BLE

    thermometer->setOnChange([](Thermometer &thermometer, float temperature, float humidity) {
        Serial.printf("T=%f H=%f", temperature, humidity);
    });


    btn1.setClickHandler([](Button &_) {
        wifi.connect(10);
    });


    btn2.setClickHandler([](Button &_) {
        wifi.disconnect();
    });

}

void loop() {
    thermometer->loop();
    btn1.loop();
    btn2.loop();
}
