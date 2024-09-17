from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import uvicorn
from pydantic import BaseModel
from fastapi.responses import HTMLResponse

class TranslationInput(BaseModel): 
   text:str




app = FastAPI() 



en_to_es = None
es_to_en = None

def load_en_to_es(): 
    global en_to_es
    if en_to_es is None: 
        en_to_es = pipeline("translation_en_to_es", "Helsinki-NLP/opus-mt-en-es")

def load_es_to_en(): 
    global es_to_en
    if es_to_en is None: 
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
    load_en_to_es()
    
    english_text = body.text
    en_to_es_translation = en_to_es(english_text)
    print(en_to_es_translation)
    return {"english_text": english_text, "spanish_text": en_to_es_translation[0]['translation_text']}   

@app.post("/spanish_to_english")
async def spanish_to_english(body: TranslationInput):
    load_es_to_en()
    spanish_text = body.text
    es_to_en_translation = es_to_en(spanish_text)
    print(es_to_en_translation)
    return {"spanish_text": spanish_text, "english_text": es_to_en_translation[0]['translation_text']} 

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/form")
async def get_form():
    return """
    <html>
        <head>
            <title>Translation API</title>
        </head>
        <body>
            <h1>Translate Text</h1>
            <form action="/translate" method="post">
                <label for="text">Text to translate:</label><br>
                <input type="text" id="text" name="text"><br>
                <label for="lang">Translate to:</label><br>
                <select id="lang" name="lang">
                    <option value="en_to_es">English to Spanish</option>
                    <option value="es_to_en">Spanish to English</option>
                </select><br><br>
                <input type="submit" value="Translate">
            </form>
        </body>
    </html>
    """

@app.post("/translate", response_class=HTMLResponse)
async def translate(text: str = Form(...), lang: str = Form(...)):
    if lang == "en_to_es":
        load_en_to_es()
        translation = en_to_es(text)
        translated_text = translation[0]['translation_text']
        return f"<html><body><h2>Translated Text: {translated_text}</h2><a href='/'>Go Back</a></body></html>"
    elif lang == "es_to_en":
        load_es_to_en()
        translation = es_to_en(text)
        translated_text = translation[0]['translation_text']
        return f"<html><body><h2>Translated Text: {translated_text}</h2><a href='/'>Go Back</a></body></html>"



if __name__ == "__main__":
    uvicorn.run(app, reload=True)