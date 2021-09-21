cmake_minimum_required(VERSION 3.18.4)
project(t_display_factory_test_main)

include_directories("/home/elyspio/.platformio/packages/framework-arduinoespressif32/")

set(CMAKE_CXX_STANDARD 14)

include_directories(src)

add_executable(t_display_factory_test_main
        src/Button2.cpp
        src/Button2.h
        src/main.cpp src/wifi.cpp src/wifi.h src/thermometer.cpp src/thermometer.h)
