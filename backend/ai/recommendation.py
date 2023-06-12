import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pandas as pd
import pickle

# load recommendation model
model = tf.keras.models.load_model("./resource/model.h5")
with open("./resource/data.pickle", "rb") as file:
    data = pickle.load(file)

# load data
max_length = data['maxLength']
tokenizer = data['tokenizer']
label_encoder = data['labelEncoder']

# load dataset
df = pd.read_csv("./resource/dataset.csv")
df["Class"] = label_encoder.transform(df["Class"])


def predict(query: str):
    # Preprocess the user query
    query_sequence = tokenizer.texts_to_sequences([query])
    query_sequence = pad_sequences(query_sequence, maxlen=max_length, padding="post")

    # Make predictions
    predicted_class = tf.argmax(model.predict(query_sequence), axis=-1).numpy()[0]
    recommended_videos = df[df["Class"] == predicted_class]["Video Title"].head(5).tolist()

    # Print recommended videos from the model
    return recommended_videos
