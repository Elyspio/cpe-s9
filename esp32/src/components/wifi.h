//
// Created by elyspio on 21/09/2021.
//

#ifndef T_DISPLAY_FACTORY_TEST_MAIN_WIFI_H
#define T_DISPLAY_FACTORY_TEST_MAIN_WIFI_H

#include <string>
#include <map>

class Wifi
{
private:
    std::string m_ssid;
    std::string m_password;
    Wifi(const std::string &ssid, const std::string &password);
    Wifi();
    static std::map<std::string, Wifi> *instances;

public:
    Wifi static *get(const std::string &ssid, const std::string &password);

    bool connect(int timeout);
    bool isConnected();
    void disconnect();
};

#endif //T_DISPLAY_FACTORY_TEST_MAIN_WIFI_H
