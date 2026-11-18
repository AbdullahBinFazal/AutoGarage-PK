import pandas as pd
import numpy as np
import pickle
import time
import os
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_absolute_error, r2_score

print("--- STARTING TRAINING PROCESS ---")

# ==========================================
# STEP 1: LOAD DATASETS
# ==========================================
print("\n1. Loading datasets...")
df1 = pd.read_csv('data/pakwheels_used_cars_clean.csv')
df2 = pd.read_csv('data/pakwheels_used_cars_2026_clean.csv')
df_global = pd.read_csv('data/car_specifications_1900_2025_150k_models.csv')

# ==========================================
# STEP 2: MERGE PAKISTANI DATASETS
# ==========================================
print("2. Merging datasets...")
# Fix dataset 1
df1_clean = df1[['brand', 'year', 'engine_cc', 'mileage', 'fuel_type', 'transmission', 'price']].copy()
df1_clean.columns = ['brand', 'year', 'engine_cc', 'mileage_km', 'fuel_type', 'transmission', 'price']

# Fix dataset 2
df2_clean = df2[['brand', 'year', 'engine_cc', 'mileage_km', 'fuel_type', 'transmission', 'price_pkr']].copy()
df2_clean.columns = ['brand', 'year', 'engine_cc', 'mileage_km', 'fuel_type', 'transmission', 'price']

# Combine them
df = pd.concat([df1_clean, df2_clean], ignore_index=True)
print(f"   -> Total rows before cleaning: {len(df)}")

# ==========================================
# STEP 3: CLEAN THE DATA
# ==========================================
print("3. Cleaning data (removing 'cc' and 'km' text)...")
def clean_engine(x):
    if pd.isna(x): return np.nan
    x = str(x).lower().replace('cc', '').strip()
    try: return float(x)
    except: return np.nan

def clean_mileage(x):
    if pd.isna(x): return np.nan
    x = str(x).lower().replace('km', '').replace(',', '').strip()
    try: return float(x)
    except: return np.nan

df['engine_cc'] = df['engine_cc'].apply(clean_engine)
df['mileage_km'] = df['mileage_km'].apply(clean_mileage)

# Drop rows where we couldn't figure out the mileage or engine
df.dropna(subset=['engine_cc', 'mileage_km', 'price', 'year'], inplace=True)

# Remove extreme outliers (Very cheap cars or > 5 Crore)
df = df[(df['price'] > 200000) & (df['price'] < 50000000)]
print(f"   -> Total rows after cleaning: {len(df)}")

# ==========================================
# STEP 4: FEATURE ENGINEERING (Creating new columns)
# ==========================================
print("4. Engineering new features...")
# Get luxury brands from global dataset
luxury_brands = df_global['brand'].unique()
df['is_global_brand'] = df['brand'].apply(lambda x: 1 if str(x) in luxury_brands else 0)

# Create features
df['vehicle_age'] = 2026 - df['year']
df['mileage_per_year'] = df['mileage_km'] / (df['vehicle_age'] + 1)
df['is_large_engine'] = (df['engine_cc'] > 1500).astype(int)
df['is_old_car'] = (df['vehicle_age'] > 10).astype(int)
df['is_high_mileage'] = (df['mileage_km'] > 100000).astype(int)
df['is_automatic'] = df['transmission'].apply(lambda x: 1 if str(x).lower() == 'automatic' else 0)

# ==========================================
# STEP 5: ENCODE TEXT COLUMNS (Convert to numbers)
# ==========================================
print("5. Encoding text to numbers...")
# Drop 'year' since we made 'vehicle_age'. Drop raw text columns.
df_encoded = df.drop(columns=['year', 'transmission', 'fuel_type'])
# Automatically turn 'brand' into multiple 0/1 columns
df_encoded = pd.get_dummies(df_encoded, columns=['brand'], drop_first=True)

# ==========================================
# STEP 6: TRAIN THE 3 MODELS
# ==========================================
print("6. Training models...")
X = df_encoded.drop('price', axis=1)
y = df_encoded['price']

# SAVE THE EXACT COLUMN ORDER FOR FLASK!
os.makedirs('model', exist_ok=True)
pickle.dump(list(X.columns), open('model/features.pkl', 'wb'))

# Split data (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

models = {
    'Linear Regression': LinearRegression(),
    'Random Forest': RandomForestRegressor(n_estimators=50, random_state=42), # 50 trees to train faster
    'KNN': KNeighborsRegressor(n_neighbors=5)
}

best_model = None
best_mae = float('inf')

for name, model in models.items():
    start_time = time.time()
    model.fit(X_train, y_train)
    train_time = time.time() - start_time
    
    preds = model.predict(X_test)
    mae = mean_absolute_error(y_test, preds)
    r2 = r2_score(y_test, preds)
    
    print(f"\n--- {name} ---")
    print(f"MAE (Average Error): PKR {mae:,.0f}")
    print(f"R2 Score (Accuracy): {r2:.2f}")
    print(f"Training Time: {train_time:.2f} seconds")
    
    # Pick the best model (lowest error)
    if mae < best_mae:
        best_mae = mae
        best_model = model

# ==========================================
# STEP 7: SAVE THE BEST MODEL
# ==========================================
print("\n7. Saving the best model...")
pickle.dump(best_model, open('model/model.pkl', 'wb'))
print("SUCCESS! 'model.pkl' and 'features.pkl' have been saved in the 'model' folder.")