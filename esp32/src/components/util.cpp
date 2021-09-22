#include "util.h"
#include <esp_sleep.h>
#include <sstream>
#include <string>

void espDelay(int ms) {
    esp_sleep_enable_timer_wakeup(ms * 1000);
    esp_sleep_pd_config(ESP_PD_DOMAIN_RTC_PERIPH, ESP_PD_OPTION_ON);
    esp_light_sleep_start();
}

const char *toString(float f) {
    std::ostringstream ss;
    ss << f;
    return ss.str().c_str();
}