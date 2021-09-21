//
// Created by elyspio on 21/09/2021.
//

#include "thermometer.h"

#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>

int scanTime = 5; //In seconds

class MyAdvertisedDeviceCallbacks : public BLEAdvertisedDeviceCallbacks {
    void onResult(BLEAdvertisedDevice advertisedDevice) override {
        if (advertisedDevice.haveName()) {
            boolean done = false;

            auto payload = advertisedDevice.getPayload();

            auto id = payload[18];

            float temp, humidity;

            if (id == 0x0d) {
                temp = (((int) payload[22]) * 16 * 16 + ((int) payload[21])) / 10.0f;
                humidity = (((int) payload[24]) * 16 * 16 + ((int) payload[23])) / 10.0f;
                done = true;
            }

            if (done) {
                Thermometer obj = *Thermometer::get();
                auto callback = obj.getOnChange();
                if (callback != nullptr) {
                    callback(temp, humidity);
                }
            }

        }
    }
};


Thermometer *Thermometer::instance = nullptr;


Thermometer *Thermometer::get() {
    if (Thermometer::instance == nullptr) {
        Thermometer::instance = new Thermometer();
    }
    return Thermometer::instance;
}

Thermometer::Thermometer() {
    BLEDevice::init("");
    ble = BLEDevice::getScan(); //create new scan
    ble->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
    ble->setActiveScan(true); //active scan uses more power, but get results faster
    ble->setInterval(100);
    ble->setWindow(99); // less or equal setInterval value
}

void Thermometer::loop() {
    ble->start(scanTime, false);
    ble->clearResults();
}

Thermometer::CallbackFunction Thermometer::getOnChange() {
    return this->m_on_change;
}

void Thermometer::setOnChange(CallbackFunction callback) {
    m_on_change = callback;
}