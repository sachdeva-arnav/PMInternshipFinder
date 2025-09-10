import pandas as pd
import joblib
import numpy as np
from flask_cors import CORS
from flask import Flask, request, jsonify


# Create the Flask app
app = Flask(__name__)
CORS(app)

@app.route('/')
def default():
    return "Hello, Flask is running!"

# Define a route
@app.route('/predict', methods=['POST'])
def predict_internship():
    """
    Predicts internships for a user and returns JSON with only internship names.
    """
    data = request.get_json()  # Get JSON data from request body
    print("Received JSON:", data)

    # Load trained pipeline model
    model = joblib.load('.\\model\\internship_model.pkl')

    # Load raw training dataset
    training_data = pd.read_csv('.\\data\\pmis_sample.csv')

    new_data = pd.DataFrame([data])

    # RULE-BASED condition (match on Education, Skills, Location)
    condition = (
        (training_data['Education'] == new_data.iloc[0]['Education']) &
        (training_data['Skill no. 1'] == new_data.iloc[0]['Skill no. 1']) &
        (training_data['Skill no. 2'] == new_data.iloc[0]['Skill no. 2']) &
        (training_data['Skill no. 3'] == new_data.iloc[0]['Skill no. 3']) &
        (training_data['Location'] == new_data.iloc[0]['Location'])
    )
    exact_matches = training_data[condition]

    internships = []
    if not exact_matches.empty:
        internships = exact_matches['Internship'].drop_duplicates().tolist()

    # If less than 4 → use ML predictions to fill remaining
    if len(internships) < 4:
        probs = model.predict_proba(new_data)[0]
        top_idx = np.argsort(probs)[-4:][::-1]   # top 4
        ml_preds = [model.classes_[i] for i in top_idx]

        for pred in ml_preds:
            if pred not in internships:
                internships.append(pred)
            if len(internships) == 4:
                break

    # Convert list into JSON objects (for frontend cards)
    result = {"Top_4_Internships": [{"Internship": name} for name in internships]}
    print(result)
    return result

# Run the server
if __name__ == '__main__':
    app.run(debug=True)   # debug=True reloads server on code changes