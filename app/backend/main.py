from fastapi import FastAPI
import requests
from fastapi.responses import PlainTextResponse

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/joke", response_class=PlainTextResponse)
def root():
    return requests.get("https://v2.jokeapi.dev/joke/Any?format=json&type=single").json()["joke"]



@app.get("/stdout")
def stdout(str: str):
    print("STDOUT: ", str)


@app.get("/stderr")
def stdout(str: str):
    print("STDERR: ", str)
