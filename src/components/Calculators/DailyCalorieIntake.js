import React, { useState } from 'react'
import { css } from '@emotion/react';
import { Spinner } from '@chakra-ui/react';

const DailyCalorieIntake = () => {
    const [sex, setSex] = useState('male');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [calorieResult, setCalorieResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const calculateCalories = () => {
        let bmr;
        if (sex === 'male') {
            bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
        } else {
            bmr = 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
        }

        let activityMultiplier;
        switch (activityLevel) {
            case 'sedentary':
                activityMultiplier = 1.2;
                break;
            case 'lightlyActive':
                activityMultiplier = 1.375;
                break;
            case 'active':
                activityMultiplier = 1.55;
                break;
            case 'highlyActive':
                activityMultiplier = 1.725;
                break;
            default:
                activityMultiplier = 1.375;
        }

        const totalCalories = Math.round(bmr * activityMultiplier);
        setCalorieResult(totalCalories);
    };

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
            <div className="flex flex-col items-center justify-center h-full mt-8">
                <svg
                    className="w-12 h-12 text-green-500 mb-2"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M6.25 3C4.74011 3 3.5 4.24011 3.5 5.75V18.25C3.5 19.7599 4.74011 21 6.25 21H18.75C20.2599 21 21.5 19.7599 21.5 18.25V5.75C21.5 4.24011 20.2599 3 18.75 3H6.25ZM6.25 4.5H18.75C19.4491 4.5 20 5.05089 20 5.75V18.25C20 18.9491 19.4491 19.5 18.75 19.5H6.25C5.55089 19.5 5 18.9491 5 18.25V5.75C5 5.05089 5.55089 4.5 6.25 4.5ZM6.50488 9.98828C6.22888 9.98828 6.00488 10.2123 6.00488 10.4883V13.4883C6.00488 13.7643 6.22888 13.9883 6.50488 13.9883C6.78088 13.9883 7.00488 13.7643 7.00488 13.4883V12.4688L8.12012 13.8076C8.21912 13.9261 8.36138 13.9883 8.50488 13.9883C8.61788 13.9883 8.7317 13.9501 8.8252 13.8721C9.0372 13.6951 9.06517 13.38 8.88867 13.168L7.90625 11.9883L8.88867 10.8076C9.06467 10.5956 9.03622 10.28 8.82422 10.1035C8.61222 9.92652 8.29662 9.95647 8.12012 10.168L7.00488 11.5068V10.4883C7.00488 10.2123 6.78088 9.98828 6.50488 9.98828ZM11.0674 9.98828C10.1599 9.98828 9.42188 10.8853 9.42188 11.9883C9.42188 13.0913 10.1599 13.9883 11.0674 13.9883C11.7909 13.9883 12.2237 13.498 12.3652 13.208C12.4867 12.96 12.3837 12.6601 12.1357 12.5391C11.8872 12.4181 11.5883 12.5211 11.4678 12.7686C11.4668 12.7706 11.3479 12.9883 11.0684 12.9883C10.7244 12.9883 10.4219 12.5208 10.4219 11.9883C10.4219 11.4558 10.7244 10.9883 11.0684 10.9883C11.3304 10.9883 11.4487 11.1748 11.4717 11.2158C11.5952 11.4578 11.8902 11.5575 12.1357 11.4375C12.3842 11.316 12.4867 11.0166 12.3652 10.7686C12.2237 10.4786 11.7909 9.98828 11.0674 9.98828ZM14.335 9.98828C14.133 9.98828 13.9505 10.1099 13.873 10.2959L12.623 13.2959C12.517 13.5509 12.6376 13.8427 12.8926 13.9492C13.1476 14.0552 13.4409 13.9352 13.5469 13.6807L13.627 13.4883H15.0439L15.123 13.6807C15.203 13.8727 15.3895 13.9883 15.585 13.9883C15.649 13.9883 15.7143 13.9757 15.7773 13.9492C16.0323 13.8432 16.1519 13.5509 16.0459 13.2959L14.7969 10.2959C14.7194 10.1094 14.537 9.98828 14.335 9.98828ZM17.001 9.98828C16.725 9.98828 16.501 10.2123 16.501 10.4883V13.4883C16.501 13.7643 16.725 13.9883 17.001 13.9883H18.501C18.777 13.9883 19.001 13.7643 19.001 13.4883C19.001 13.2123 18.777 12.9883 18.501 12.9883H17.501V10.4883C17.501 10.2123 17.277 9.98828 17.001 9.98828ZM14.335 11.7881L14.627 12.4883H14.0439L14.335 11.7881Z"
                        fill="#3CCB7F"
                    ></path>
                </svg>
                <h1 className="text-3xl font-bold mb-4 tracking-wider">Daily Calorie Intake Calculator</h1>
                <p className="text-xl text-center max-w-2xl text-gray-600">
                    Feel free to edit your information below in the Daily Calorie Intake calculator to receive your
                    personal current daily calorie intake, and what your body needs to fuel itself during the day
                    with your routine!
                </p>

                <div className='flex flex-row gap-x-5 mt-6 mb-10 items-center'>
                    <div className='w-[49%]' >
                        <img
                            src="https://img.freepik.com/free-vector/healthy-eating-advertising-poster-with-young-woman-holding-green-apple-useful-food-elements_1284-28271.jpg?size=626&ext=jpg&ga=GA1.1.197968796.1701194524&semt=sph"
                            alt="Calories Intake"
                            className="rounded-lg h-full shadow-md p-3"

                        />
                    </div>

                    <div className="p-4 px-16 bg-gray-200 rounded-md ml-6 w-[52%]">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Sex</label>
                            <select
                                className="border border-gray-300 p-2 w-full"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                            <input
                                type="number"
                                className="border border-gray-300 p-2 w-full"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Height (cm)</label>
                            <input
                                type="number"
                                className="border border-gray-300 p-2 w-full"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Weight (kg)</label>
                            <input
                                type="number"
                                className="border border-gray-300 p-2 w-full"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Activity Level</label>
                            <select
                                className="border border-gray-300 p-2 w-full"
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value)}
                            >
                                <option value="sedentary">Sedentary</option>
                                <option value="lightlyActive">Lightly Active</option>
                                <option value="active">Active</option>
                                <option value="highlyActive">Highly Active</option>
                            </select>
                        </div>
                        <button
                            className="bg-[#599f3d] text-white p-2 rounded-md hover:bg-[#599f3d60]"
                            onClick={calculateCalories}
                        >
                            Calculate Calories
                        </button>
                        {calorieResult !== null && (
                            <div className="mt-4 text-center">
                                <p className="text-lg font-semibold">Your estimated daily calorie Range:</p>
                                <p className="text-xl font-bold text-[#599f3d]">{calorieResult - 150} - {calorieResult + 50} calories</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

    )
}

export default DailyCalorieIntake