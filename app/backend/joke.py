import requests
from fastapi import APIRouter
from pydantic.dataclasses import dataclass

router = APIRouter(prefix="/jokes", tags=["Joke"])


@dataclass
class Joke:
    question: str
    answer: str

    def __init__(self, question, answer):
        self.answer = answer
        self.question = question


@router.get("", response_model=Joke)
def root():
    joke = requests.get("https://blague.xyz/api/joke/random").json()["joke"]
    return Joke(joke["question"], joke["answer"])
