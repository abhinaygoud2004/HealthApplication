
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import { ThemeProvider } from "@material-tailwind/react";
import { ChakraProvider, theme } from "@chakra-ui/react"
import HydrationReminder from "./components/HydrationReminder";
import { Helmet } from "react-helmet";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import DailyCalorieIntake from "./components/Calculators/DailyCalorieIntake";

function App() {

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Calorie Tracker</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <React.StrictMode>
        <ThemeProvider>
          <ChakraProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/hydration-remainder" element={<HydrationReminder />} />
                <Route path="/daily-calorie-calculator" element={<DailyCalorieIntake />} />
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
              </Routes>
            </BrowserRouter>
          </ChakraProvider>
        </ThemeProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;
