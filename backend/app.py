from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
# This line is CRITICAL: it allows your React app to talk to Flask
CORS(app) 

# Load the trained model and the feature columns we saved
model = pickle.load(open('model/model.pkl', 'rb'))
features = pickle.load(open('model/features.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 1. Get the JSON data sent from the frontend
        data = request.get_json()
        
        brand = data['brand']
        year = int(data['year'])
        engine_cc = float(data['engine_cc'])
        mileage_km = float(data['mileage_km'])
        transmission = data.get('transmission', 'Manual')
        fuel_type = data.get('fuel_type', 'Petrol')

        # 2. Calculate the engineered features (Must match train.py exactly)
        vehicle_age = 2026 - year
        mileage_per_year = mileage_km / (vehicle_age + 1)
        is_large_engine = 1 if engine_cc > 1500 else 0
        is_old_car = 1 if vehicle_age > 10 else 0
        is_high_mileage = 1 if mileage_km > 100000 else 0
        is_automatic = 1 if str(transmission).lower() == 'automatic' else 0
        is_global_brand = 0 # Simplified for the API

        # 3. Create a DataFrame with the raw inputs
        new_car_data = {
            'engine_cc': [engine_cc],
            'mileage_km': [mileage_km],
            'is_global_brand': [is_global_brand],
            'vehicle_age': [vehicle_age],
            'mileage_per_year': [mileage_per_year],
            'is_large_engine': [is_large_engine],
            'is_old_car': [is_old_car],
            'is_high_mileage': [is_high_mileage],
            'is_automatic': [is_automatic]
        }
        df_new = pd.DataFrame(new_car_data)

        # 4. Handle the 'brand' One-Hot Encoding
        # The model expects columns like 'brand_Honda', 'brand_Toyota', etc.
        brand_col = f'brand_{brand}'
        if brand_col in features:
            df_new[brand_col] = 1
        
        # Ensure the DataFrame has the EXACT same columns the model expects
        # Any missing brand columns will be filled with 0
        df_new = df_new.reindex(columns=features, fill_value=0)

        # 5. Make the prediction
        prediction = model.predict(df_new)[0]

        # Return the prediction in PKR
        return jsonify({
            'status': 'success',
            'predicted_price': round(float(prediction), 2)
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

if __name__ == '__main__':
    # Run the app on port 5000
    app.run(port=5000, debug=True)