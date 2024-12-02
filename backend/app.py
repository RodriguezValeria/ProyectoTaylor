import tensorflow as tf
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Definir el modelo de entrada
class Message(BaseModel):
    start_string: str

class QueryRequest(BaseModel):
    model: str
    messages: list[Message]
    temperature: float = 0.3

text = open('choruses.txt', 'rb').read().decode(encoding='utf-8')


vocab = sorted(set(text))
print('{} unique characters'.format(len(vocab)))
char2idx = {u:i for i, u in enumerate(vocab)}
idx2char = np.array(vocab)

model = tf.keras.models.load_model('taylor_swift.keras')
model.compile()


def generate_text(model, start_string,t):
    # Evaluation step (generating text using the learned model)

    # Number of characters to generate
    num_generate = 300

    # Converting our start string to numbers (vectorizing)
    input_eval = [char2idx[s] for s in start_string]
    input_eval = tf.expand_dims(input_eval, 0)

    # Empty string to store our results
    text_generated = []

    # Low temperature results in more predictable text.
    # Higher temperature results in more surprising text.
    # Experiment to find the best setting.
    temperature = t

    # Here batch size == 1
    for layer in model.layers:
        if type(layer) == tf.keras.layers.GRU:
            layer.reset_states()

    for i in range(num_generate):
        predictions = model(input_eval)
        # remove the batch dimension
        predictions = tf.squeeze(predictions, 0)

        # using a categorical distribution to predict the character returned by the model
        predictions = predictions / temperature
        predicted_id = tf.random.categorical(predictions, num_samples=1)[-1,0].numpy()

        # Pass the predicted character as the next input to the model
        # along with the previous hidden state
        input_eval = tf.expand_dims([predicted_id], 0)

        text_generated.append(idx2char[predicted_id])

    return (start_string + ''.join(text_generated))


@app.post("/generate")
async def generate(request: QueryRequest):
    # Validar que el modelo sea 'normativa_ucr'
    if request.model != "taylor_swift":
        raise HTTPException(status_code=400, detail="Modelo no soportado")

    # Validar mensajes
    if not request.messages or not isinstance(request.messages, list):
        raise HTTPException(status_code=400, detail="Formato de mensajes incorrecto")

    # Extraer la cadena inicial y la temperatura
    start_string = request.messages[0].start_string
    temperature = request.temperature

    # Generar respuesta usando el modelo
    generated_text = generate_text(model, start_string, t=temperature)

    # Retornar la respuesta
    return {"response": generated_text}