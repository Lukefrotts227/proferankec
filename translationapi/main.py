from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI() 

en_to_es = pipeline("translation_en_to_es", "Helsinki-NLP/opus-mt-en-es")
es_to_en = pipeline("translation_es_to_en", "Helsinki-NLP/opus-mt-es-en")   


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

