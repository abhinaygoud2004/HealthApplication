from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn import metrics
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline

app = Flask(__name__)
CORS(app)

cal = pd.read_csv(r'C:\Users\agsna\Desktop\CalorieTracker\calorie-tracker\calories.csv')
exc = pd.read_csv(r'C:\Users\agsna\Desktop\CalorieTracker\calorie-tracker\exercise.csv')
cal_data = pd.concat([exc, cal['Calories']], axis=1)

cal_data.replace({"Gender": {'male': 0, 'female': 1}}, inplace=True)
X = cal_data.drop(columns=['User_ID', 'Calories'], axis=1)
Y = cal_data['Calories']
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=2)

# model
# model = XGBRegressor()
degree = 3
model = make_pipeline(PolynomialFeatures(degree), LinearRegression())
model.fit(X_train, Y_train)


def xgb_predict(gen, ag, hei, wei, dur, hr, bt):
    data = {'Gender': [gen], 'Age': [ag], 'Height': [hei], 'Weight': [wei],
            'Duration': [dur], 'Heart_Rate': [hr], 'Body_Temp': [bt]}
    df = pd.DataFrame(data)
    return model.predict(df)[0]


@app.route('/predict_calories', methods=['POST'])
def predict_calories():
    try:
        content = request.get_json()
        gen = content['Gender']
        age = content['Age']
        hei = content['Height']
        wei = content['Weight']
        dur = content['Duration']
        hr = content['Heart_Rate']
        bt = content['Body_Temp']

        result = xgb_predict(gen, age, hei, wei, dur, hr, bt)
        print(result)
        return jsonify({"calories": round(result)})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
