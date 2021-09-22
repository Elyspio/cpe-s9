//
// Created by elyspio on 21/09/2021.
//

#include "WiFi.h"
#include "wifi.h"
#include "HardwareSerial.h"
#include <string>
#include <map>

using namespace std;

Wifi::Wifi(const string &ssid, const string &password)
{
    this->m_ssid = ssid;
    this->m_password = password;
}

Wifi::Wifi()
{
    this->m_ssid = "";
    this->m_password = "";
}

// Connect to a wifi network, timeout in seconds
bool Wifi::connect(int timeout)
{

    if(this->m_password == "" || this->m_ssid == "") {
        Serial.printf("\nCould not connect to WiFi because ssid or password are missing.");
        return false;
    }

    WiFi.mode(WIFI_STA);
    WiFi.begin(this->m_ssid.c_str(), this->m_password.c_str());
    Serial.printf("\nConnecting to WiFi '%s' ..", this->m_ssid.c_str());
    int timeWaited = 0;
    int timeToWait = 1000;
    while (WiFi.status() != WL_CONNECTED && timeWaited < 1000 * timeout)
    {
        Serial.printf(". %d", WiFi.status());
        delay(timeToWait);
        timeWaited += timeToWait;
    }

    bool connected = WiFi.status() == WL_CONNECTED;
    if (connected == true)
    {
        Serial.printf("\nConnected to Wifi '%s\n", this->m_ssid.c_str());
    }
    else
    {
        Serial.printf("\nCould not connect to Wifi '%s\n", this->m_ssid.c_str());
    }
    return connected;
}

void Wifi::disconnect()
{
    WiFi.disconnect();
    Serial.printf("\nDisconnected from %s\n", this->m_ssid.c_str());
}

Wifi* Wifi::get(const string &ssid, const string &password)
{
    auto it = Wifi::instances->find(ssid);
    if (it == Wifi::instances->end())
    {
        (*Wifi::instances).insert(std::map<string, Wifi>::value_type(ssid, Wifi(ssid, password)));
    }
    return &(Wifi::instances->find(ssid)->second);
}

std::map<string, Wifi> *Wifi::instances = new std::map<string, Wifi>();
