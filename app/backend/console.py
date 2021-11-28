import os
import sys
from enum import Enum

from fastapi import APIRouter
from starlette.responses import Response

router = APIRouter(prefix="/console", tags=["Console"])


class ConsoleLevel(Enum):
    debug = "debug"
    error = "error"
    info = "info"
    warning = "warning"


log_file = os.path.dirname(os.path.realpath(__file__)) + "/log.txt"


@router.post("/{level}", status_code=204)
def stdout(level: ConsoleLevel, output: str):
    if level == ConsoleLevel.error:
        print("STDERR", str(output), file=sys.stderr)
    else:
        print("STDOUT: ", str(level.value), str(output))
    f = open(log_file, "a")
    f.write(f"{str(level.value)} {output} \n")
    f.close()

    return Response(status_code=204)
