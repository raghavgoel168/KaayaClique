from flask import Flask, request, render_template
import pickle
import pandas as pd

app = Flask(__name__)

# Load the trained model
model = pickle.load(open('model.pkl', 'rb'))
target_columns = ['Cleanser', 'Face Mask', 'Moisturizer', 'Scrub', 'Serum', 'Skin Supplements', 'Sunscreen', 'Toner']

# Define the route for the home page
@app.route('/')
def home():
    return render_template('index.html', output=None)

# Define the route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get the input features from the form
    age = int(request.form['age'])
    daily_water_intake = int(request.form['daily_water_intake'])
    sleep_duration = int(request.form['sleep_duration'])
    exercise_frequency = int(request.form['exercise_frequency'])
    sun_exposure = float(request.form['sun_exposure'])
    stress_level = int(request.form['stress_level'])
    gender = request.form['gender']
    skin_type = request.form['skin_type']
    routine_complexity = request.form['routine_complexity']
    oily_skin = request.form['oily_skin']
    pores = request.form['pores']
    black_heads = request.form['black_heads']
    acne = request.form['acne']
    hyperpigmentation = request.form['hyperpigmentation']
    dryness = request.form['dryness']
    skin_sensitivity = request.form['skin_sensitivity']
    aging = request.form['aging']
    dark_circles = request.form['dark_circles']
    diet_preferences = request.form['diet_preferences']

    # Create DataFrame for prediction
    input_data = pd.DataFrame({
        'Age': [age],
        'Daily Water Intake (in ml)': [daily_water_intake],
        'Sleep Duration (in hours)': [sleep_duration],
        'Exercise Frequency (per week)': [exercise_frequency],
        'Sun Exposure (hours per day)': [sun_exposure],
        'Stress Level (on a scale of 1-10)': [stress_level],
        'Gender_Female': [1 if gender == 'Female' else 0],
        'Gender_Male': [1 if gender == 'Male' else 0],
        'Skin Type_Combination': [1 if skin_type == 'Combination' else 0],
        'Skin Type_Dry': [1 if skin_type == 'Dry' else 0],
        'Skin Type_Oily': [1 if skin_type == 'Oily' else 0],
        'Skin Type_Sensitive': [1 if skin_type == 'Sensitive' else 0],
        'Routine Complexity_Moderate': [1 if routine_complexity == 'Moderate' else 0],
        'Routine Complexity_Simple': [1 if routine_complexity == 'Simple' else 0],
        'Oily Skin_No': [1 if oily_skin == 'No' else 0],
        'Oily Skin_Yes': [1 if oily_skin == 'Yes' else 0],
        'Pores_No': [1 if pores == 'No' else 0],
        'Pores_Yes': [1 if pores == 'Yes' else 0],
        'Black Heads_No': [1 if black_heads == 'No' else 0],
        'Black Heads_Yes': [1 if black_heads == 'Yes' else 0],
        'Acne_No': [1 if acne == 'No' else 0],
        'Acne_Yes': [1 if acne == 'Yes' else 0],
        'Hyperpigmentation_No': [1 if hyperpigmentation == 'No' else 0],
        'Hyperpigmentation_Yes': [1 if hyperpigmentation == 'Yes' else 0],
        'Dryness_No': [1 if dryness == 'No' else 0],
        'Dryness_Yes': [1 if dryness == 'Yes' else 0],
        'Skin Sensitivity_No': [1 if skin_sensitivity == 'No' else 0],
        'Skin Sensitivity_Yes': [1 if skin_sensitivity == 'Yes' else 0],
        'Aging_No': [1 if aging == 'No' else 0],
        'Aging_Yes': [1 if aging == 'Yes' else 0],
        'Dark Circles_No': [1 if dark_circles == 'No' else 0],
        'Dark Circles_Yes': [1 if dark_circles == 'Yes' else 0],
        'Diet Preferences_Eggetarian': [1 if diet_preferences == 'Eggetarian' else 0],
        'Diet Preferences_Non-Vegetarian': [1 if diet_preferences == 'Non-Vegetarian' else 0],
        'Diet Preferences_Vegan': [1 if diet_preferences == 'Vegan' else 0],
        'Diet Preferences_Vegetarian': [1 if diet_preferences == 'Vegetarian' else 0]
    })

    # Make prediction
    predicted_categories = model.predict(input_data)

    # Extract the indices of predicted categories
    predicted_indices = predicted_categories.nonzero()[1]

    # Get the names of predicted skincare products
    predicted_products = [target_columns[i] for i in predicted_indices]

    # Prepare the prediction text
    output = f'The predicted skincare products are: {", ".join(predicted_products)}'

    return render_template('index.html', output=output)

if __name__ == '__main__':
    app.run(debug=True)
