cmake_minimum_required(VERSION 3.18.4)
project(t_display_factory_test_main)

include_directories("/home/elyspio/.platformio/packages/framework-arduinoespressif32/")

set(CMAKE_CXX_STANDARD 14)

include_directories(src)

add_executable(t_display_factory_test_main
        src/components/btn.cpp
        src/components/thermometer.cpp
        src/components/util.cpp
        src/components/btn.h
        src/components/thermometer.h
        src/components/util.h
        src/main.cpp
        src/components/mqtt.cpp src/components/mqtt.h)
 