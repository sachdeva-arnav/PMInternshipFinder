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
    Predicts internships for a user and returns JSON with internship + location + duration.
    """
    data = request.get_json()  # Get JSON data from request body
    print("Received JSON:", data)

    # Load trained pipeline model
    model = joblib.load('./model/internship_model.pkl')

    # Load raw training dataset (with Duration column now)
    training_data = pd.read_csv('./data/pmis_sample.csv')

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

    results = []
    internships = []

    if not exact_matches.empty:
        unique_matches = exact_matches[['Internship', 'Location', 'Internship Duration']].drop_duplicates()
        for _, row in unique_matches.iterrows():
            results.append({
                "Internship": row['Internship'],
                "Location": row['Location'],
                "Duration": row['Internship Duration']
            })
            internships.append(row['Internship'])

    # If less than 4 → use ML predictions to fill remaining
    if len(results) < 4:
        probs = model.predict_proba(new_data)[0]
        top_idx = np.argsort(probs)[-4:][::-1]   # top 4
        ml_preds = [model.classes_[i] for i in top_idx]

        for pred in ml_preds:
            if pred not in internships:
                # Look up location & duration from training_data (first match)
                match_row = training_data.loc[training_data['Internship'] == pred]
                if not match_row.empty:
                    location = match_row['Location'].iloc[0]
                    duration = match_row['Internship Duration'].iloc[0]
                else:
                    location = "Unknown"
                    duration = "Unknown"

                results.append({
                    "Internship": pred,
                    "Location": location,
                    "Duration": duration
                })
                internships.append(pred)

            if len(results) == 4:
                break

    # Final JSON for frontend
    result = {"Top_4_Internships": results}
    print("\n--- Final Recommendations ---")
    for rec in results:
        print(f"Internship: {rec['Internship']} | Location: {rec['Location']} | Duration: {rec['Duration']}")
    print("----------------------------\n")

    return jsonify(result)

# Run the server
if __name__ == '__main__':
    app.run(debug=True)

