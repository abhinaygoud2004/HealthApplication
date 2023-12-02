import React, { useEffect, useState } from 'react';
import { Progress } from "@material-tailwind/react";
import { v4 as uuid } from "uuid";
import { Button, Input, InputGroup, InputLeftAddon, } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { Select } from '@chakra-ui/react'

const HomeScreen = () => {
    const [showModal, setShowModal] = useState(false)
    const [allMeals, setAllMeals] = useState([{ mealId: uuid(), mealName: 'dosa', mealCalories: '500' }])
    const [allWorkouts, setAllWorkouts] = useState([{ workoutId: uuid(), workoutName: 'Gym', workoutCalories: '300' }])

    const [mealCard, setMealCard] = useState(false)
    const [workoutCard, setWorkoutCard] = useState(false)
    const [tempDailyCaloriesLimit, setTempDailyCaloriesLimit] = useState(2000)
    const [dailyCaloriesLimit, setDailyCaloriesLimit] = useState(2000)
    const [caloriesConsumed, setCaloriesConsumed] = useState(0)
    const [caloriesBurned, setCaloriesBurned] = useState(0)

    const [mealName, setMealName] = useState('');
    const [mealCalories, setMealCalories] = useState('');

    const [workoutName, setWorkoutName] = useState('');
    const [workoutDuration, setWorkoutDuration] = useState();
    const [workoutHeartRate, setWorkoutHeartRate] = useState();
    const [workoutBodyTemp, setWorkoutBodyTemp] = useState();

    const [workoutCalories, setWorkoutCalories] = useState('');

    const handleFormSubmit1 = (e) => {
        e.preventDefault();

        console.log('Meal Name:', mealName);
        console.log('Meal Calories:', mealCalories);

        setAllMeals([...allMeals, { mealId: uuid(), mealName: mealName, mealCalories: mealCalories }])

        setMealName('');
        setMealCalories('');
    };

    const handleFormSubmit2 = (e) => {
        e.preventDefault();

        console.log('Workout Name:', workoutName);
        console.log('Workout Calories:', workoutCalories);

        setAllWorkouts([...allWorkouts, {
            workoutId: uuid(),
            workoutName: workoutName,
            workoutCalories: workoutCalories,
            workoutBodyTemp: workoutBodyTemp,
            workoutDuration: workoutDuration,
            workoutHeartRate: workoutHeartRate
        }])
        setWorkoutName('');
        setWorkoutCalories('');
        setWorkoutHeartRate();
        setWorkoutBodyTemp();
        setWorkoutDuration();
    };

    useEffect(() => {
        let c = 0;
        allMeals?.map(item => {
            c += Number(item.mealCalories)
        })
        setCaloriesConsumed(c)
    }, [allMeals])

    useEffect(() => {
        let c = 0;
        allWorkouts?.map(item => {
            c += Number(item.workoutCalories)
        })
        setCaloriesBurned(c)
    }, [allWorkouts])

    useEffect(() => {
        const predictCaloriesBurned = async () => {
            const apiUrl = 'http://127.0.0.1:5000/predict_calories';
            const userData = {
                Gender: 0,
                Age: 27,
                Height: 181,
                Weight: 72,
                Duration: Number(workoutDuration),
                Heart_Rate: Number(workoutHeartRate),
                Body_Temp: Number(workoutBodyTemp),
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
                setWorkoutCalories(data.calories);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        if (workoutDuration && workoutBodyTemp && workoutHeartRate)
            predictCaloriesBurned()
    }, [workoutBodyTemp, workoutDuration, workoutHeartRate])

    return (
        <div>
            <div className=''>
                <header className="bg-primary flex justify-between items-center text-white text-center py-3 px-7">
                    <div className='flex items-center'>
                    </div>
                    <div className="flex space-x-5">
                        <button onClick={() => {
                            setShowModal(true)
                        }}
                            className="bg-transparent border border-[#589F3C] hover:bg-[#589F3C] hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            data-bs-toggle="modal"
                            data-bs-target="#limit-modal"
                        >
                            Set Daily Limit
                        </button>
                        <button onClick={() => {
                            setAllMeals([]);
                            setAllWorkouts([]);
                        }}
                            id="reset"
                            className="bg-transparent border border-[#589F3C] hover:bg-[#589F3C] hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Reset Day
                        </button>
                    </div>

                </header>
            </div>

            <div className="flex items-center justify-center gap-4 my-3 mt-5">
                <div className="w-[47%] mr-4 text-center">
                    <div className="card bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg">
                        <div className="p-4 px-6 rounded-md shadow">
                            <div id="calories-limit" className="text-4xl font-semibold">{dailyCaloriesLimit}</div>
                            <p className="text-lg">Daily Calorie Limit</p>
                        </div>
                    </div>
                </div>
                <div className="w-[47%] text-center">
                    <div className="card bg-gradient-to-r from-[#589F3C] to-[#589F3C] text-white rounded-lg">
                        <div className="p-4 px-6 rounded-md shadow">
                            <div id="calories-total" className="text-4xl font-semibold">{Number(caloriesConsumed) - Number(caloriesBurned)}</div>
                            <p className="text-lg">Gain/Loss</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex items-center justify-center gap-4 text-center mt-7">
                <div className="col-md-4 w-[30%] mr-4">
                    <div className="card bg-[#f8f9fa] border border-black rounded-md">
                        <div className="p-4 px-6">
                            <div id="calories-consumed" className="text-3xl font-semibold">{caloriesConsumed}</div>
                            <p className="text-lg">Calories Consumed</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 w-[30%] mr-4">
                    <div className="card bg-[#f8f9fa] border border-black rounded-md">
                        <div className="p-4 px-6">
                            <div id="calories-burned" className="text-3xl font-semibold">{caloriesBurned}</div>
                            <p className="text-lg">Calories Burned</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 w-[30%]">
                    <div className="card bg-[#f8f9fa] border border-black rounded-md">
                        <div className="p-4 px-6">
                            <div id="calories-remaining" className="text-3xl font-semibold">{dailyCaloriesLimit - Number(caloriesConsumed)}</div>
                            <p className="text-lg">Calories Remaining</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col px-10 my-3 mt-8">
                <Progress value={((Number(caloriesConsumed) - Number(caloriesBurned)) / dailyCaloriesLimit) * 100} variant="filled" size="lg" color='green' />
            </div>

            <div className='flex mt-4 ml-4'>
                <div className='w-[50%]'>
                    <div>
                        <div className="flex items-center w-[95%] px-7 mt-5">
                            <h2 className="border-s-4 border-[#589F3C] border-3 p-2 text-2xl font-medium tracking-widest">
                                Meals / Food Items
                            </h2>
                            <button onClick={() => {
                                setMealCard(!mealCard)
                            }}
                                className="btn btn-primary flex items-center rounded-md bg-[#589F3C] hover:bg-[#589F3C90] hover:text-white btn-sm ms-auto text-white fw-bold py-2 px-3 h-100"
                            >
                                <svg
                                    className="svg-inline--fa fa-plus"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="plus"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    data-fa-i2svg=""
                                    width={22}
                                    height={20}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                                    ></path>
                                </svg>
                                <h3 className='text-white'>
                                    Add Meal
                                </h3>
                            </button>
                        </div>
                    </div>

                    {mealCard && <div className="show w-[95%] px-7 mt-5" id="collapse-meal" style={{}}>
                        <div className="card card-body bg-[#f8f9fa] border border-black rounded-md p-4">
                            <form id="meal-form" onSubmit={handleFormSubmit1}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control w-[95%] px-4 p-2 rounded-md text-base border border-gray"
                                        id="meal-name"
                                        placeholder="Enter Meal or Item"
                                        value={mealName}
                                        onChange={(e) => setMealName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        className="form-control w-[95%] px-4 p-2 rounded-md text-base border border-gray"
                                        id="meal-calories"
                                        placeholder="Enter Calories"
                                        value={mealCalories}
                                        onChange={(e) => setMealCalories(e.target.value)}
                                    />
                                </div>
                                <button type='submit'
                                    className="btn btn-primary flex items-center rounded-md bg-[#589F3C] mt-4 hover:bg-[#589F3C90] hover:text-white btn-sm text-white fw-semibold py-1.5 px-3 h-84"
                                >
                                    Add Meal Item
                                </button>
                            </form>
                        </div>
                    </div>}

                    <div className=' w-[95%] px-7 mt-5'>

                        {allMeals?.map((item, index) => {
                            return (
                                <div className="card my-2 border border-gray rounded-md my-2.5" data-id={index} key={item.mealId}>
                                    <div className="flex items-center px-5 p-4 w-full">
                                        <div className="flex items-center w-full">
                                            <h3 className="mx-1 text-2xl tracking-wider w-[48%]">{item?.mealName}</h3>
                                            <div className="text-2xl bg-[#599f3d] text-white text-center rounded-md items-center p-2 px-4">
                                                {item?.mealCalories}
                                            </div>
                                            <div className='flex-1'>
                                            </div>
                                            <button className="btn bg-[#dc3545] btn-sm p-2 mx-2 rounded-md" onClick={() => {
                                                setAllMeals(allMeals.filter(meal => meal.mealId !== item.mealId))
                                            }}>
                                                <svg
                                                    className="svg-inline--fa fa-xmark"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    data-prefix="fas"
                                                    data-icon="xmark"
                                                    role="img"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 384 512"
                                                    data-fa-i2svg=""
                                                    width={'21'}
                                                    height={'21'}
                                                    color='white'
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>


                <div className='w-[50%]'>
                    <div>
                        <div className="flex items-center w-[95%] px-7 mt-5">
                            <h2 className="border-s-4 border-[#fd7e14] border-3 p-2 text-2xl font-medium tracking-widest">
                                Workouts
                            </h2>
                            <button onClick={() => {
                                setWorkoutCard(!workoutCard)
                            }}
                                className="btn btn-primary flex items-center rounded-md bg-[#fd7e14] hover:bg-[#fd7e1490] hover:text-white btn-sm ms-auto text-white fw-bold py-2 px-3 h-100"
                            >
                                <svg
                                    className="svg-inline--fa fa-plus"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="plus"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    data-fa-i2svg=""
                                    width={22}
                                    height={20}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                                    ></path>
                                </svg>
                                <h3 className='text-white'>
                                    Add Workout
                                </h3>
                            </button>
                        </div>
                    </div>

                    {workoutCard && <div className="show w-[95%] px-7 mt-5" id="collapse-meal" style={{}}>
                        <div className="card card-body bg-[#f8f9fa] border border-black rounded-md p-4">
                            <form id="meal-form" onSubmit={handleFormSubmit2}>
                                <div className="mb-3.5 flex flex-row items-center">
                                    <div className='w-[49%] mr-3'>
                                        <InputGroup size={'md'}>
                                            <InputLeftAddon children='Workout Name' />
                                            <Input value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} type='text' placeholder='Ex: Running' />
                                        </InputGroup>
                                    </div>
                                    <div className='w-[49%]'>
                                        <InputGroup size={'md'}>
                                            <InputLeftAddon children='Duration (mins)' />
                                            <Input value={workoutDuration} onChange={(e) => setWorkoutDuration(e.target.value)} type='number' placeholder='Ex: 30' />
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className="mb-3.5 flex flex-row items-center">
                                    <div className='w-[49%] mr-3'>
                                        <InputGroup size={'md'}>
                                            <InputLeftAddon children='Heart Rate' />
                                            <Input value={workoutHeartRate} onChange={(e) => setWorkoutHeartRate(e.target.value)} type='number' placeholder='Ex: 80' />
                                        </InputGroup>

                                    </div>
                                    <div className='w-[49%]'>
                                        <InputGroup size={'md'}>
                                            <InputLeftAddon children='Body Temp' />
                                            <Input value={workoutBodyTemp} onChange={(e) => {
                                                setWorkoutBodyTemp(e.target.value);
                                            }} type='number' placeholder='Ex: 37' />
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <InputGroup size={'md'}>
                                        <InputLeftAddon children='Calories Burned' />
                                        <Input value={workoutCalories} onChange={(e) => setWorkoutCalories(e.target.value)} type='number' />
                                    </InputGroup>
                                </div>
                                <button type='submit'
                                    className="btn btn-primary flex items-center rounded-md bg-[#589F3C] mt-4 hover:bg-[#589F3C90] hover:text-white btn-sm text-white fw-semibold py-1.5 px-3 h-84"
                                >
                                    Add Workout Item
                                </button>
                            </form>
                        </div>
                    </div>}

                    <div className=' w-[95%] px-7 mt-5'>
                        {allWorkouts?.map((item, index) => {
                            return (
                                <div className="card my-2 border border-gray rounded-md my-2.5" data-id={index} key={item.workoutId}>
                                    <div className="flex items-center px-5 p-4 w-full">
                                        <div className="flex items-center w-full">
                                            <h3 className="mx-1 text-2xl tracking-wider w-[48%]">{item?.workoutName}</h3>
                                            <div className="text-2xl bg-[#fd7e14] text-white text-center rounded-md items-center p-2 px-4">
                                                {item?.workoutCalories}
                                            </div>
                                            <div className='flex-1'>
                                            </div>
                                            <button className="btn bg-[#dc3545] btn-sm p-2 mx-2 rounded-md" onClick={() => {
                                                setAllWorkouts(allWorkouts.filter(workout => workout.workoutId !== item.workoutId))
                                            }}>
                                                <svg
                                                    className="svg-inline--fa fa-xmark"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    data-prefix="fas"
                                                    data-icon="xmark"
                                                    role="img"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 384 512"
                                                    data-fa-i2svg=""
                                                    width={'21'}
                                                    height={'21'}
                                                    color='white'
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
            {
                showModal ? (
                    <>
                        <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative my-8 mx-auto w-96">
                                <div className="border-0 px-3 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t ">
                                        <h3 className="text-xl font-semibold">Set Daily Limit</h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-10 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>

                                    <div className="relative p-4 flex-auto">
                                        <form onSubmit={() => { }} id="limit-form">
                                            <label htmlFor="limit" className="form-label block text-base font-medium mb-1">
                                                Daily Calorie Limit
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control w-full px-4 p-2 rounded-md text-base border border-gray"
                                                id="calorie-limit"
                                                placeholder="2000"
                                                value={tempDailyCaloriesLimit}
                                                onChange={(e) => setTempDailyCaloriesLimit(e.target.value)}
                                            />
                                        </form>
                                    </div>

                                    <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="bg-[#599f3d] text-white active:bg-emerald-600 font-medium traking-wider text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                setDailyCaloriesLimit(tempDailyCaloriesLimit);
                                                setShowModal(false);
                                            }}
                                        >
                                            Save
                                        </button>
                                    </div>
                                    <div className='text-center'>

                                        <h3>Not sure about your Daily Calorie Limit?</h3>
                                        <Link to="/daily-calorie-calculator">
                                            <Button className='mx-3 mb-3' size={'sm'} onClick={() => {
                                            }}>
                                                Click Here!
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null
            }


        </div >
    );
};

export default HomeScreen;
