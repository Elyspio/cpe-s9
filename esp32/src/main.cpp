#include <TFT_eSPI.h>
#include <thread> // std::thread
#include <string>

#include "components/btn.h"
#include "components/thermometer.h"
#include "components/util.h"
#include "components/mqtt.h"

#define BUTTON_1 35
#define BUTTON_2 0

using namespace std;

TFT_eSPI screen = TFT_eSPI(135, 240);
Btn btnR(BUTTON_1);
Btn btnL(BUTTON_2);
thread *bluetoothThread;
Thermometer *thermometer;

Mqtt *mqtt_client;

// This function is called once everything is connected (Wifi and mqtt)
// WARNING : YOU MUST IMPLEMENT IT IF YOU USE EspmqttClient
void onConnectionEstablished() {
}

void setup() {
    Serial.begin(115200);
    Serial.println("Start");

    thermometer = Thermometer::get();
    mqtt_client = new Mqtt();
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

    thermometer->setOnChange([](float temperature, float humidity) {
        Serial.printf("Sensor update: T=%f H=%f\n", temperature, humidity);
        if (mqtt_client->isConnected()) {
            mqtt_client->send_humidity(humidity);
            mqtt_client->send_temperature(temperature);
        }
    });

    bluetoothThread = new std::thread(
            [] {
                while (true) {
                    thermometer->loop();
                }
            });
}

void loop() {
    btnR.loop();
    btnL.loop();
    mqtt_client->loop();
}
