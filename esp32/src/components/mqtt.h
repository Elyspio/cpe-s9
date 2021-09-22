//
// Created by elyspio on 22/09/2021.
//

#ifndef T_DISPLAY_FACTORY_TEST_MAIN_MQTT_H
#define T_DISPLAY_FACTORY_TEST_MAIN_MQTT_H

#include <string>

const std::string wifi_ssid = "esp-4";
const std::string wifi_passphrase = "Azeqsdwxc123";

class Mqtt {

public:
    void send_temperature(float val);

    void send_humidity(float val);

    void loop();

    bool isConnected();
};

#endif //T_DISPLAY_FACTORY_TEST_MAIN_MQTT_H
