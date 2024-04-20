# Step 1: Import necessary libraries
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Step 2: Load the dataset
data = pd.read_excel("C:/Users/ragha/OneDrive/Desktop/Data Mining/Project/Dataset.xlsx")

# Step 3: Convert categorical variables to numerical using one-hot encoding
data = pd.get_dummies(data, columns=['Gender', 'Skin Type', 'Routine Complexity', 'Oily Skin', 'Pores', 'Black Heads', 
                                      'Acne', 'Hyperpigmentation', 'Dryness', 'Skin Sensitivity', 'Aging', 'Dark Circles', 
                                      'Diet Preferences'])

# Step 4: Split data into features and target columns
X = data.drop(columns=['Cleanser', 'Face Mask', 'Moisturizer', 'Scrub', 'Serum', 'Skin Supplements', 'Sunscreen', 'Toner'])
y = data[['Cleanser', 'Face Mask', 'Moisturizer', 'Scrub', 'Serum', 'Skin Supplements', 'Sunscreen', 'Toner']]

# Step 5: Model training
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Step 6: Prediction function
def predict_skincare_product(age, daily_water_intake, sleep_duration, exercise_frequency, sun_exposure, stress_level,
                              gender, skin_type, routine_complexity, oily_skin, pores, black_heads, acne, hyperpigmentation, dryness, 
                              skin_sensitivity, aging, dark_circles, diet_preferences):
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

    # Get product names based on predicted categories
    product_names = y.columns[predicted_categories[0] == 1]

    return product_names

# Step 7: Input function
def get_input():
    age = int(input("Enter your age: "))
    daily_water_intake = int(input("Enter your daily water intake (in ml): "))
    sleep_duration = int(input("Enter your sleep duration (in hours): "))
    exercise_frequency = int(input("Enter your exercise frequency (per week): "))
    sun_exposure = float(input("Enter your sun exposure (hours per day): "))
    stress_level = int(input("Enter your stress level (on a scale of 1-10): "))
    gender = input("Enter your gender (Male/Female): ")
    skin_type = input("Enter your skin type (Combination/Oily/Sensitive/Dry): ")
    routine_complexity = input("Enter your routine complexity (Simple/Moderate): ")
    oily_skin = input("Do you have oily skin? (Yes/No): ")
    pores = input("Do you have visible pores? (Yes/No): ")
    black_heads = input("Do you have black heads? (Yes/No): ")
    acne = input("Do you have acne? (Yes/No): ")
    hyperpigmentation = input("Do you have hyperpigmentation? (Yes/No): ")
    dryness = input("Do you have dryness? (Yes/No): ")
    skin_sensitivity = input("Do you have skin sensitivity? (Yes/No): ")
    aging = input("Do you see signs of aging? (Yes/No): ")
    dark_circles = input("Do you have dark circles? (Yes/No): ")
    diet_preferences = input("Enter your diet preferences (Eggetarian/Non-Vegetarian/Vegan/Vegetarian): ")

    return age, daily_water_intake, sleep_duration, exercise_frequency, sun_exposure, stress_level, gender, skin_type, routine_complexity, oily_skin, pores, black_heads, acne, hyperpigmentation, dryness, skin_sensitivity, aging, dark_circles, diet_preferences

# Step 8: Predict using input function
age, daily_water_intake, sleep_duration, exercise_frequency, sun_exposure, stress_level, gender, skin_type, routine_complexity, oily_skin, pores, black_heads, acne, hyperpigmentation, dryness, skin_sensitivity, aging, dark_circles, diet_preferences = get_input()
predicted_products = predict_skincare_product(age, daily_water_intake, sleep_duration, exercise_frequency, sun_exposure, stress_level,
                              gender, skin_type, routine_complexity, oily_skin, pores, black_heads, acne, hyperpigmentation, dryness, 
                              skin_sensitivity, aging, dark_circles, diet_preferences)
print("Predicted Products:", predicted_products)

# import pickle
# pickle.dump(model,open('C:/Users/ragha/OneDrive/Desktop/Data Mining/Project/model.pkl','wb'))
# model=pickle.load(open('C:/Users/ragha/OneDrive/Desktop/Data Mining/Project/model.pkl','rb'))
