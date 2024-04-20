# Step 1: Import necessary libraries
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

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

# # Step 6: Save the trained model as a pickle file
pickle.dump(model, open('C:/Users/ragha/OneDrive/Desktop/Data Mining/Project/model.pkl', 'wb'))
