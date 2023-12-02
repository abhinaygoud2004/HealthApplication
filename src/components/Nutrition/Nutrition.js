import React, { useState } from 'react';
import './Nutrition.css';
import $ from 'jquery';
import { Button, InputGroup, InputLeftAddon, InputRightAddon, Spinner } from '@chakra-ui/react';
import { Input } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const NutritionTable = () => {
  const [foodData, setFoodData] = useState(null);
  const [query, setQuery] = useState('');
  const [isValidInput, setIsValidInput] = useState(true);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsValidInput(true); 
  };
  const [loading, setLoading] = useState(false)

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
        setIsValidInput(false);
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
        <div className="flex flex-row gap-5 mx-auto">
          {isValidInput ?
            <div className='flex flex-row items-center'>
              <div className='p-3 px-8'>
                <h2 className="text-2xl font-medium mb-4">{foodData[0]?.name} has a total of
                  <h3 className='text-3xl text-[#2ecc71] mt-2'>{foodData[0]?.calories} Calories</h3>
                </h2>
                <table className="min-w-max bg-white border border-[#2ecc71] rounded-md overflow-hidden">
                  <thead className='bg-[#2ecc7160]'>
                    <tr>
                      <th className="text-slate-600 border border-slate-400 py-2.5 px-4">Nutrition</th>
                      <th className="text-slate-600 border border-slate-400 py-2.5 px-4">per 100g</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutritionData.map(([key, value]) => (
                      <tr key={key}>
                        <td className="text-lg border border-gray-400 font-medium py-2 px-4">{key.replace(/_/g, ' ').toUpperCase()}</td>
                        <td className="text-lg border border-gray-400 font-medium py-2 px-4">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 px-6 bg-gray-200 rounded-md mt-4">
                <h3 className="text-xl font-semibold mb-3">To Burn {foodData[0].calories} Calories you will have to</h3>

                <>
                  <div className='text-lg text-black flex flex-row items-center mt-7'>
                    <div className='mr-4'>
                      <img
                        src="https://img.freepik.com/free-photo/full-length-portrait-active-young-caucasian-running-jogging-man-gradient-studio-neon-light_155003-9974.jpg?size=626&ext=jpg&ga=GA1.1.197968796.1701194524&semt=sph"
                        alt="Jog"
                        className="rounded-sm shadow-md w-24 h-16"
                      />
                    </div>
                    <div className='text-lg text-black flex flex-col flex-start text-start'>
                      <h2 className='font-medium text-xl'>Jog</h2>
                      <h3>You will have to jog for <span className='text-[#589f3c] font-semibold'>
                        {calculateTime(foodData[0].calories, 229)} {' '}
                      </span>
                        minutes</h3>
                    </div>
                  </div>

                  <div className='text-lg text-black flex flex-row items-center mt-7'>
                    <div className='mr-4'>
                      <img
                        src="https://img.freepik.com/free-photo/portrait-young-beautiful-sportive-girl-white-background_176420-5493.jpg?size=626&ext=jpg&ga=GA1.1.197968796.1701194524&semt=sph"
                        alt="Yoga"
                        className="rounded-sm shadow-md w-24 h-16"
                      />
                    </div>
                    <div className='text-lg text-black flex flex-col flex-start text-start mt-4'>
                      <h2 className='font-medium text-xl'>Power Yoga:</h2>
                      <h3>Do Power Yoga <span className='text-[#589f3c] font-semibold'>
                        {calculateTime(foodData[0].calories, 223)} {' '}
                      </span>
                        minutes</h3>
                    </div>
                  </div>


                  <div className='text-lg text-black flex flex-row items-center mt-7'>
                    <div className='mr-4'>
                      <img
                        src="https://img.freepik.com/free-photo/training-wellness-healthy-weight-walking-motion_1428-762.jpg?size=626&ext=jpg&ga=GA1.1.197968796.1701194524&semt=ais"
                        alt="Walk"
                        className="rounded-sm shadow-md w-24 h-16"
                      />
                    </div>
                    <div className='text-lg text-black flex flex-col flex-start text-start mt-7'>
                      <h2 className='font-medium text-xl'>Brisk Walk:</h2>
                      <h3>Go For a Brisk Walk <span className='text-[#589f3c] font-semibold'>
                        {calculateTime(foodData[0].calories, 294)} {' '}
                      </span>
                        minutes</h3>
                    </div>
                  </div>

                  <div className='text-lg text-black flex flex-row items-center mt-7'>
                    <div className='mr-4'>
                      <img
                        src="https://img.freepik.com/free-photo/tall-stylish-shirtless-bodybuilder-dressed-sports-shorts-doing-exercise-bicep-with-barbell-standing-studio-isolated-dark-background_613910-18341.jpg?size=626&ext=jpg&ga=GA1.1.197968796.1701194524&semt=sph"
                        alt="Gym"
                        className="rounded-sm shadow-md w-24 h-16"
                      />
                    </div>
                    <div className='text-lg text-black flex flex-col flex-start text-start'>
                      <h2 className='font-medium text-xl'>Gym Workout:</h2>
                      <h3>Get a Gym Workout <span className='text-[#589f3c] font-semibold'>
                        {calculateTime(foodData[0].calories, 494)} {' '}
                      </span>
                        minutes</h3>
                    </div>
                  </div>
                </>
              </div>
            </div> :
            <div className="flex flex-col items-center justify-center bg-gray-100 mx-auto p-3 px-8">
              <div className="max-w-lg p-2 bg-white rounded-lg shadow-md mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Could not find data related to you search</h2>
                
                  <h3 className='mx-3 text-xl text-success-500' onClick={()=> {
                    
                  }}>
                    Try Again!
                  </h3>
                  
              </div>
            </div>
          }
        </div>
    );
  };

  return (
    <div className="text-center mt-5 mx-auto">
      <div className='w-[50%] my-4 flex flex-row items-center justify-center mx-auto text-center'>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className={`border border-slate-400 input1 rounded-md px-4 py-2 mr-2 ${isValidInput ? 'border-slate-400' : 'border-red-500'}`}
          placeholder="search for calories in you food..."
        />
        <button
          onClick={fetchData}
          className="bg-blue-400 max-w-lg button1 font-semibold text-white px-6 py-2 rounded-md"
        >
          Get Nutrition
        </button>
      </div>
      <div className='w-[50%] items-center justify-center mx-auto text-center'>
        {renderTable()}
      </div>
    </div>
  );
};

export default NutritionTable;
