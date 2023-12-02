import React, { useEffect, useState } from 'react'
import { Button, Alert, AlertIcon, AlertTitle, AlertDescription, Box, Container } from "@chakra-ui/react"

async function notifyUser(notificationText = "Thank you for enabling notifications!") {
  const options = {
    body: 'Prioritize your health: Stand, stretch, and hydrate!',
    icon: 'https://imgs.search.brave.com/7kma1iP3MGvQw0UPzBr9ecwdIqtUTaDMm4MvJ6ZSiQs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdC5k/ZXBvc2l0cGhvdG9z/LmNvbS8xMTkyMDYw/LzE1NzQvaS82MDAv/ZGVwb3NpdHBob3Rv/c18xNTc0MjkzMS1z/dG9jay1waG90by1i/cnVuZXR0ZS1kcmlu/a2luZy1hLWdsYXNz/LW9mLmpwZw',
  };
  if (!("Notification" in window)) {
    alert("Your Browser doesn't support notifications")
  }
  else if (Notification.permission === "granted") {
    const notification = new Notification('Health Reminder', options);
  }
  else if (Notification.permission !== "denied") {
    await Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification('Health Reminder', options);
      }
    })
  }
}

const HydrationReminder = () => {
  async function enableNotifsAndClose() {
    await notifyUser().then(() => {
      setUserResponed(true)
    })
    setUserResponed(true)
  }

  async function disableNotifsAndClose() {
    setUserResponed(true)
  }

  useEffect(() => {
    const interval = 2 * 60 * 60 * 1000;

    const initialTimeout = setTimeout(() => {
      if (Notification.permission === 'granted') {
        notifyUser("Prioritize your health: Stand, stretch, and hydrate!");
      }

      const intervalId = setInterval(() => {
        if (Notification.permission === 'granted') {
          notifyUser("Prioritize your health: Stand, stretch, and hydrate!");
        }
      }, interval);

      return () => clearInterval(intervalId);
    }, 0);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  const motivationFacts = [
    "Water is the driving force of all nature.",
    "Staying hydrated aids digestion and nutrient absorption.",
    "The only bad workout is the one that didn't happen.",
    "Drinking water helps maintain healthy skin and prevents dryness.",
    "Take care of your body. It's the only place you have to live.",
    "Short breaks improve focus and productivity.",
    "Hydration supports joint lubrication and reduces the risk of injury.",
    "Dehydration can lead to headaches and dizziness.",
    "You don't have to be extreme, just consistent.",
    "Hydrated muscles are less prone to cramping and soreness.",
    "Your body hears everything your mind says. Stay positive.",
    "Taking breaks reduces eye strain and mental fatigue.",
    "The groundwork for all happiness is good health.",
    "Proper hydration supports kidney function and waste elimination.",
    "Strive for progress, not perfection.",
    "Hydration is essential for maintaining a healthy heart.", ,
    "Regular breaks improve creativity and problem-solving skills.",
    "Your health is an investment, not an expense.",
    "Drinking water can help regulate body temperature during exercise.",
    "It's not about having time. It's about making time.",
    "Hydration is crucial for transporting nutrients throughout the body.",
    "Don't watch the clock; do what it does. Keep going.",
    "Taking breaks reduces stress and improves mental well-being.",
    "The best project you'll ever work on is you.",
    "Water is essential for the proper function of every cell in the body.",
    "Do something today that your future self will thank you for.",
    "Proper hydration supports a healthy metabolism.",
    "Your body is a reflection of your lifestyle.",
    "Staying hydrated aids in the prevention of kidney stones.", ,
    "Taking short breaks enhances overall workplace productivity.",
    "The greatest wealth is health. - Virgil",
    "Drinking water helps maintain electrolyte balance in the body.",
    "Proper hydration supports the body's detoxification process.",
    "Taking breaks throughout the day boosts mood and energy levels.",
    "Water is essential for the lubrication of joints and cartilage.",
    "Don't wish for it; work for it.",
    "Staying hydrated can improve cognitive function and concentration.",
    "A healthy outside starts from the inside. - Robert Urich",
    "The first wealth is health.",
    "Proper hydration aids in the prevention of muscle cramps.",
    "Drinking water supports the body's natural detoxification processes.",
    "Your body can stand almost anything. It's your mind that you have to convince."
  ];

  const randomMotivationFact = () => {
    const randomIndex = Math.floor(Math.random() * motivationFacts.length);
    return motivationFacts[randomIndex];
  };

  const [userResponded, setUserResponed] = useState(false);
  return ((!userResponded) && !(Notification.permission === 'granted')) ? (
    <div className='bg-[#243c5a10] items-center justify-center'>
      <Container>
        <Alert status='success'>
          <AlertIcon />
          <Box>
            <AlertTitle>Notifications</AlertTitle>
            <AlertDescription>Would you like to enable notifications?</AlertDescription>
          </Box>
          <Button className='mx-3' colorScheme='teal' size={'sm'} onClick={enableNotifsAndClose}>
            Sure!
          </Button>
          <Button className='mx-2' colorScheme='gray' size={'sm'} onClick={disableNotifsAndClose}>
            No thanks!
          </Button>
        </Alert>
      </Container>
      <div className="flex flex-col h-screen items-center mt-4 text-slate-500">
        <h1 className="text-4xl font-bold mb-5">{randomMotivationFact()}</h1>
        <h1 className="text-4xl font-bold mb-5">Enable Notifications for Regular Remainder</h1>

        <div className="flex flex-col md:flex-row items-center justify-around max-w-4xl p-8 bg-white bg-opacity-90 shadow-lg rounded-lg">
          <div className="mb-4 mr-4 md:mb-0">
            <img
              src="https://img.freepik.com/free-photo/thirsty-boy-drinking-water_1149-1242.jpg?size=626&ext=jpg&ga=GA1.1.197968796.1701194524&semt=ais"
              alt="Health Prioritization"
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Benefits of Drinking Water</h2>
              <p className="text-gray-700">
                Proper hydration helps maintain bodily functions, improves focus, and supports overall well-being.
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Taking Breaks</h2>
              <p className="text-gray-700">
                Regular breaks improve productivity, reduce stress, and prevent burnout. Stand up, move around, and refresh your mind.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Standing & Stretching</h2>
              <p className="text-gray-700">
                Incorporating standing and stretching into your routine improves posture, reduces muscle tension, and enhances flexibility.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  ) : (
    Notification.permission === "granted") ? (
    <div className='bg-[#243c5a10] items-center h-full justify-center'>

      <div className="flex flex-col h-screen items-center pb-3 text-slate-500">
        <h1 className="text-4xl font-bold mb-5">{randomMotivationFact()}</h1>
        <h1 className="text-4xl font-bold mb-5">Enable Notifications for Regular Remainder</h1>

        <div className="flex flex-col md:flex-row items-center justify-around max-w-4xl p-8 bg-white bg-opacity-90 shadow-lg rounded-lg">
          <div className="mb-4 mr-4 md:mb-0">
            <img
              src="https://img.freepik.com/free-photo/thirsty-boy-drinking-water_1149-1242.jpg?size=626&ext=jpg&ga=GA1.1.197968796.1701194524&semt=ais"
              alt="Health Prioritization"
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Benefits of Drinking Water</h2>
              <p className="text-gray-700">
                Proper hydration helps maintain bodily functions, improves focus, and supports overall well-being.
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Taking Breaks</h2>
              <p className="text-gray-700">
                Regular breaks improve productivity, reduce stress, and prevent burnout. Stand up, move around, and refresh your mind.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Standing & Stretching</h2>
              <p className="text-gray-700">
                Incorporating standing and stretching into your routine improves posture, reduces muscle tension, and enhances flexibility.
              </p>
            </div>
          </div>
        </div>
        <Button colorScheme='gray' size={'sm'} onClick={() => notifyUser("Prioritize your health: Stand, stretch, and hydrate!")}>Click Me</Button>
      </div>
    </div>

  ) :
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="max-w-lg p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">⚠️ You have disabled notifications ⚠️</h2>

          <p className="text-gray-700 mb-6 text-center">
            Enabling notifications can help you stay on track with your health goals and receive timely reminders.
          </p>

          <div className="">
            <h3 className="text-xl font-semibold mb-2">Benefits of Enabling Notifications:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Receive timely hydration reminders.</li>
              <li>Stay on top of your health and fitness goals.</li>
              <li>Boost productivity with regular breaks and stretches.</li>
              <li>Enhance your overall well-being.</li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Enable them for frequent reminders!</h3>
            <Button colorScheme='gray' size={'sm'} onClick={() => notifyUser("Prioritize your health: Stand, stretch, and hydrate!")}>Enable Now</Button>
          </div>
        </div>
      </div>
    </>
    ;
}

export default HydrationReminder