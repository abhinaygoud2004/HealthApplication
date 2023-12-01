import React, { useState } from 'react';

const Test = () => {
    const [calories, setCalories] = useState(null);

    const handleCalculateCalories = async () => {
        const apiUrl = 'http://127.0.0.1:5000/predict_calories'; 
        const userData = {
            Gender: 0, 
            Age: 29, 
            Height: 189, 
            Weight: 70, 
            Duration: 60, 
            Heart_Rate: 129, 
            Body_Temp: 38, 
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to calculate calories');
            }

            const data = await response.json();
            setCalories(data.calories);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <button onClick={handleCalculateCalories}>Calculate Calories</button>
            {calories !== null && (
                <div>
                    <p>Estimated daily calorie limit:</p>
                    <p>{calories} calories</p>
                </div>
            )}
        </div>
    );
};

export default Test;
