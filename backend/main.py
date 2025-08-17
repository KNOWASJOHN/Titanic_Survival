import os
import joblib
import numpy as np
from flask import Flask, request, jsonify

# ---- Load model once at startup ----
MODEL_PATH = "titanic_prediction.pkl"
model = joblib.load(MODEL_PATH)

# If you trained with a DataFrame, use the exact column names & order here:
FEATURE_ORDER = ["Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Embarked"]  
# Example encoding expectation (you must match whatever you used during training):
# - Sex: 0 = female, 1 = male (or your encoding)
# - Embarked: 0 = C, 1 = Q, 2 = S (or your encoding)

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Titanic Survival Prediction API is running 🚢"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)

        # Expect either a single object or a list of objects
        if isinstance(data, dict):
            samples = [data]
        elif isinstance(data, list):
            samples = data
        else:
            return jsonify({"error": "JSON must be an object or list of objects"}), 400

        # Build X in the exact order your model expects
        X = []
        for row in samples:
            try:
                X.append([row[feat] for feat in FEATURE_ORDER])
            except KeyError as e:
                return jsonify({"error": f"Missing feature: {str(e)}", "required": FEATURE_ORDER}), 400

        X = np.array(X, dtype=float)

        preds = model.predict(X)
        # If you trained a probabilistic model:
        proba = getattr(model, "predict_proba", None)
        probs = proba(X)[:, 1].tolist() if callable(proba) else [None] * len(preds)

        return jsonify({
            "predictions": preds.tolist(),
            "survival_probability": probs,
            "count": len(preds)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
