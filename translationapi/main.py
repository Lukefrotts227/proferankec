from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import uvicorn
from pydantic import BaseModel

class TranslationInput(BaseModel): 
   text:str




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

@app.post("/english_to_spanish")
async def english_to_spanish(body: TranslationInput):
    print('here')
    english_text = body.text
    en_to_es_translation = en_to_es(english_text)
    print(en_to_es_translation)
    return {"english_text": english_text, "spanish_text": en_to_es_translation[0]['translation_text']}   

@app.post("/spanish_to_english")
async def spanish_to_english(body: TranslationInput):
    print("here")
    spanish_text = body.text
    es_to_en_translation = es_to_en(spanish_text)
    print(es_to_en_translation)
    return {"spanish_text": spanish_text, "english_text": es_to_en_translation[0]['translation_text']} 





if __name__ == "__main__":
    uvicorn.run(app, reload=True)