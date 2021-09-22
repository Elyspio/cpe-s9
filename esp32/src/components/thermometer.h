//
// Created by elyspio on 21/09/2021.
//

#ifndef T_DISPLAY_FACTORY_TEST_MAIN_THERMOMETER_H
#define T_DISPLAY_FACTORY_TEST_MAIN_THERMOMETER_H

#include "Arduino.h"
#include "BLEScan.h"

class Thermometer {

private:
    typedef void (*CallbackFunction)(float, float);

    static Thermometer *instance;

    BLEScan *ble = nullptr;
    CallbackFunction m_on_change = nullptr;

    Thermometer();

public:
    static Thermometer *get();

    void setOnChange(CallbackFunction method);

    CallbackFunction getOnChange();

    void loop();
};


#endif //T_DISPLAY_FACTORY_TEST_MAIN_THERMOMETER_H
