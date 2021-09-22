//
// Created by elyspio on 22/09/2021.
//

#include "mqtt.h"
#include "EspMQTTClient.h"
#include "util.h"
#include <string>

using namespace std;


string mqtt_prefix = "JGD-OPT_";
const bool retain = true;


EspMQTTClient mqtt(
        wifi_ssid.c_str(),
        wifi_passphrase.c_str(),
        "192.168.136.232", // MQTT Broker server ip
        "ESP-JGD-OPT",     // Client name that uniquely identify your device
        1883               // The MQTT port, default to 1883. this line can be omitted
);


void Mqtt::send_temperature(float val) {
    String topic = String((mqtt_prefix + "temperature").c_str());
    String str_val = toString(val);
    mqtt.publish(topic, str_val, retain);
}

void Mqtt::send_humidity(float val) {
    String topic = String((mqtt_prefix + "humidity").c_str());
    String str_val = toString(val);
    mqtt.publish(topic, str_val, retain);
}

void Mqtt::loop() {
    mqtt.loop();
}

bool Mqtt::isConnected() {
    return mqtt.isConnected();
}
