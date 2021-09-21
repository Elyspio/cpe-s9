//
// Created by elyspio on 21/09/2021.
//

#include "WiFi.h"
#include "wifi.h"
#include "HardwareSerial.h"
#include <cstring>

Wifi::Wifi(const String &ssid, const String &password) {
    this->m_ssid = ssid;
    this->m_password = password;

}

// Connect to a wifi network, timeout in seconds
bool Wifi::connect(int timeout) {
    WiFi.mode(WIFI_STA);
    WiFi.begin(this->m_ssid, this->m_password);
    Serial.printf("Connecting to WiFi '%s' ..", this->m_ssid);
    int timeWaited = 0;
    int timeToWait = 1000;
    while (WiFi.status() != WL_CONNECTED && timeWaited < 1000 * timeout) {
        Serial.print('.');
        delay(timeToWait);
        timeWaited += timeToWait;
    }

    bool connected = WiFi.status() == WL_CONNECTED;
    if (connected == true) {
        Serial.printf("\nConnected to Wifi '%s", this->m_ssid);
    } else {
        Serial.printf("\nCould not connect to Wifi '%s", this->m_ssid);
    }
    return connected;
}

void Wifi::disconnect() {
    WiFi.disconnect();
    Serial.printf("Disconnected from %s", this->m_ssid);
}