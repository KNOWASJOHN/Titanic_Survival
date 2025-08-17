import os
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import joblib

# Load the trained model
model = joblib.load("titanic_prediction.pkl")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def home():
    return jsonify({"message": "Titanic Model API is running 🚢"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)

        # Extract and convert features
        pclass = int(data["Pclass"])
        sex = int(data["Sex"])
        age = float(data["Age"])
        sibsp = int(data["SibSp"])
        parch = int(data["Parch"])
        fare = float(data["Fare"])
        embarked = int(data["Embarked"])

        # Build feature array
        features = [[pclass, sex, age, sibsp, parch, fare, embarked]]
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]


        return jsonify({
            "prediction": int(prediction),
            "probability": round(float(probability), 4) # <-- CORRECTED LINE
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)