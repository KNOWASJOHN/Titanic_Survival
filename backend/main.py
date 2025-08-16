from flask import Flask, request, jsonify
import joblib
import numpy as np

# Load the trained model
model = joblib.load("titanic_prediction.pkl")

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Titanic Survival Prediction API is running 🚢"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Extract features from JSON
        pclass = int(data["pclass"])
        sex = int(data["sex"])
        age = float(data["age"])
        sibsp = int(data["sibsp"])
        parch = int(data["parch"])
        fare = float(data["fare"])
        embarked = int(data["embarked"])

        # Prepare features for prediction
        features = np.array([[pclass, sex, age, sibsp, parch, fare, embarked]])

        # Make prediction
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]  # probability of survival

        return jsonify({
            "prediction": int(prediction),  # 0 = not survived, 1 = survived
            "probability": round(float(probability) * 100, 2)  # % survival chance
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    # host='0.0.0.0' makes it work on Render/Railway
    app.run(host="0.0.0.0", port=5000, debug=True)
