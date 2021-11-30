#! /usr/bin/env python
# -*- encoding: UTF-8 -*-


import argparse
import sys
import time

import qi


def main(session):
    # Get the service ALTabletService.

    try:
        tabletService = session.service("ALTabletService")
        tabletService.resetTablet()

        time.sleep(2)

        tabletService.loadApplication("ihr-jgd-opt")
        tabletService.showWebview()

    except Exception as e:
        print("Error was: ", e)

    raw_input("\n Press Enter when finished:")



if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--ip", type=str, default="127.0.0.1",
                        help="Robot IP address. On robot or Local Naoqi: use '127.0.0.1'.")
    parser.add_argument("--port", type=int, default=9559,
                        help="Naoqi port number")

    args = parser.parse_args()
    ses = qi.Session()
    try:
        ses.connect("tcp://" + args.ip + ":" + str(args.port))
    except RuntimeError:
        print("Can't connect to Naoqi at ip \"" + args.ip + "\" on port " + str(args.port) + ".\n"
                                                                                             "Please check your script arguments. Run with -h option for help.")
        sys.exit(1)
    main(ses)
