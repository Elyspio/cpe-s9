import requests
from fastapi import APIRouter
from fastapi.responses import PlainTextResponse

router = APIRouter(prefix="/jokes", tags=["Joke"])


@router.get("/", response_class=PlainTextResponse)
def root():
    return requests.get("https://v2.jokeapi.dev/joke/Any?format=json&type=single").json()["joke"]
