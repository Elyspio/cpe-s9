from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from console import router as console_router
from joke import router as joke_router

app = FastAPI(debug=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(joke_router)
app.include_router(console_router)
