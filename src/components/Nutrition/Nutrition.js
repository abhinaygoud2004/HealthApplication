import React, { useState } from 'react';
import './Nutrition.css';
import $ from 'jquery';
import { Spinner } from '@chakra-ui/react';

const NutritionTable = () => {
  const [foodData, setFoodData] = useState(null);
  const [query, setQuery] = useState('');
  const [isValidInput, setIsValidInput] = useState(true);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsValidInput(true); // Reset validation message on input change
  };
  const [loading,setLoading] = useState(false)

  const fetchData = () => {
    setLoading(true)
    $.ajax({
      method: 'GET',
      url: `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
      headers: { 'X-Api-Key': 'op9crA+NfHRWz2DINgObbg==XSEex90k3rUB3Hfe' },
      contentType: 'application/json',
      success: function (result) {
        if (result.length === 0) {
          setIsValidInput(false); // Set validation message on empty result
        } else {
          setFoodData(result);
          setIsValidInput(true); // Reset validation message on successful API response
        }
        setLoading(false)
      },
      error: function ajaxError(jqXHR) {
        setLoading(false)
        console.error('Error: ', jqXHR.responseText);
        setIsValidInput(false); // Set validation message on API error
      },
    });
  };

  const calculateTime = (calories, factor) => {
    return Math.round((calories / factor) * 60);
  };

  const renderTable = () => {
    if (!foodData) {
      return null;
    }

    const nutritionData = Object.entries(foodData[0]).filter(([key]) => key !== 'name');

    return (
        loading ?
            <div className="flex items-center justify-center h-screen">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#599f3d"
                    size="xl"
                />
            </div> :
      <div className="main1 flex flex-row mt-5 gap-5 mx-auto">
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">{foodData[0].name}</h2>
          <table className="min-w-max bg-white border border-gray-300 rounded-md overflow-hidden">
            <thead>
              <tr>
                <th className="bg-gray-200 text-gray-600 border border-gray-300 py-2 px-4">Nutrition</th>
                <th className="bg-gray-200 text-gray-600 border border-gray-300 py-2 px-4">Grams</th>
              </tr>
            </thead>
            <tbody>
              {nutritionData.map(([key, value]) => (
                <tr key={key}>
                  <td className="border border-gray-300 py-2 px-4">{key.replace(/_/g, ' ').toUpperCase()}</td>
                  <td className="border border-gray-300 py-2 px-4">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-3">Estimated Time to Burn Calories</h3>
          {isValidInput ? (
            <>
              <p>Jog: {calculateTime(foodData[0].calories, 229)} minutes</p>
              <p>Power Yoga: {calculateTime(foodData[0].calories, 223)} minutes</p>
              <p>Brisk Walk: {calculateTime(foodData[0].calories, 294)} minutes</p>
              <p>Gym Workout: {calculateTime(foodData[0].calories, 494)} minutes</p>
            </>
          ) : (
            <p className="text-red-500 mt-2">Please enter a valid food item</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="text-center mt-5">
      <input 
        type="text"
        value={query}
        onChange={handleInputChange}
        className={`border input1 rounded-md px-4 py-2 mr-2 ${isValidInput ? '' : 'border-red-500'}`}
        placeholder="Enter food item"
      />
      <button
        onClick={fetchData}
        className="bg-blue-500 button1 text-white px-6 py-2 rounded-md"
      >
        Get Nutrition
      </button>
      {renderTable()}
    </div>
  );
};

export default NutritionTable;
