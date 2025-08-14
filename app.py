from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import numpy as np
import lightgbm as lgb
import lightgbm as lgb
from flask_cors import CORS
CORS(app)

# Assuming `lgb_model` is your trained model
lgb_model.booster_.save_model('model.txt')

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Load the trained LightGBM model
lgb_model = lgb.Booster(model_file='model.txt')  # Ensure 'model.txt' exists in the same directory

# Serve the frontend
@app.route('/')
def index():
    return render_template('index.html')  # Serve the HTML file

# API endpoint for predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Get JSON data from the request
        features = np.array(data['features']).reshape(1, -1)  # Convert to 2D array
        prediction = lgb_model.predict(features)  # Make prediction
        return jsonify({'prediction': prediction.tolist()})  # Return prediction as JSON
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
