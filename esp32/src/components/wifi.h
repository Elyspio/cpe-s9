//
// Created by elyspio on 21/09/2021.
//

#ifndef T_DISPLAY_FACTORY_TEST_MAIN_WIFI_H
#define T_DISPLAY_FACTORY_TEST_MAIN_WIFI_H

#include <cstring>
#include <WString.h>

class Wifi {
private:
    String m_ssid;
    String m_password;

public:
    Wifi(const String &ssid, const String &password);

    bool connect(int timeout);

    void disconnect();
};

#endif //T_DISPLAY_FACTORY_TEST_MAIN_WIFI_H
