import React, { useState } from "react";
import stl from "./weather.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// images imported
import imagecold from './images/coldURL.avif';
import imagehot from './images/hotURL.jpg';
import imageRegular from './images/regualrURL.avif';

export default function Weather() {
    // State variables to manage user input, weather data, and error messages
    const [city, setCity] = useState(""); // Stores the name of the city entered by the user
    const [weatherData, setWeatherData] = useState(null); // Stores the fetched weather data
    const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages

    // API endpoint and key for fetching weather data
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "99ff441644a927902ab984d6fde2e10f";

    // Function to fetch weather information based on the city name
    const getWeatherInfo = async (city) => {
        try {
            setErrorMessage(""); // Reset error message before fetching new data
            // Fetch weather data from the API
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            // Check if the response is not OK (e.g., city not found)
            if (!response.ok) {
                throw new Error("City not found");
            }
            let jsonResponse = await response.json(); // Parse the JSON response

            // Extract relevant weather information from the response
            let result = {
                temp: jsonResponse.main.temp,
                max_temp: jsonResponse.main.temp_max,
                min_temp: jsonResponse.main.temp_min,
                feelsLike: jsonResponse.main.feels_like,
                description: jsonResponse.weather[0].description,
                cityName: jsonResponse.name,
                countryName: jsonResponse.sys.country,
                sunrise: jsonResponse.sys.sunrise,
                sunset: jsonResponse.sys.sunset,
            };

            // Update state with the fetched weather data
            setWeatherData(result);
        } catch (error) {
            console.error("Error fetching weather data:", error); // Log the error for debugging
            setErrorMessage("City not found. Please try again."); // Set an error message for the user
        }
    };

    // Handle input changes in the TextField component
    const handleChange = (event) => {
        setCity(event.target.value); // Update the city state with the current input value
    };

    // Handle form submission to fetch weather data
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (city) {
            getWeatherInfo(city); // Fetch weather info if the city input is not empty
        }
        setCity(""); // Clear the input field after submission
    };

    return (
        <div className={stl.searchBox}>
            <h1 className={stl['pt-sans-regular-italic']}>Search for the Weather</h1>
            <form onSubmit={handleSubmit} className={stl.form}>
                <TextField
                    required
                    size="small"
                    id="city_name"
                    label="City Name"
                    variant="outlined"
                    value={city}
                    onChange={handleChange} // Attach the change handler to the input field
                    className={stl.input}
                />
                <br />
                <Button size="large" variant="contained" type="submit" className={stl.button}>
                    Search
                </Button>
            </form>
            
            {/* Display error message if the city is not found */}
            {errorMessage && <p className={stl.error}>{errorMessage}</p>}
            
            {/* Render weather data if available */}
            {weatherData && (
                <div className={stl.weatherDataBox}>
                    <h2>
                        Weather in {weatherData.cityName}, {weatherData.countryName}
                        {weatherData.countryName === "IN" ? "DIA" : ""}
                    </h2>
                    {/* Show an image based on temperature */}
                    <img 
                        src={weatherData.temp > 30 ? imagehot : (weatherData.temp > 15 ? imageRegular : imagecold)} 
                        alt="weather representation" 
                    />
                    <div>
                        {/* Display temperature information */}
                        <p>Temperature: <span className={stl.span}>{weatherData.temp}°C</span></p>
                        <p>Max Temp: <span className={stl.span}>{weatherData.max_temp}°C</span></p>
                        <p>Min Temp: <span className={stl.span}>{weatherData.min_temp}°C</span></p>
                        <p>Feels Like: <span className={stl.span}>{weatherData.feelsLike}°C</span></p>
                        <p>Description: <span className={stl.span}>{weatherData.description}</span></p>
                        <p>Sunrise: <span className={stl.span}>{new Date(weatherData.sunrise * 1000).toLocaleTimeString()}</span></p>
                        <p>Sunset: <span className={stl.span}>{new Date(weatherData.sunset * 1000).toLocaleTimeString()}</span></p>
                    </div>
                </div>
            )}
        </div>
    );
}

















// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8" />
//     <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
//     <meta name="viewport" content="width=device-width, initial-scale=1" />
//     <meta name="theme-color" content="#000000" />
//     <meta
//       name="description"
//       content="Web site created using create-react-app"
//     />
//     <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
//     <!--
//       manifest.json provides metadata used when your web app is installed on a
//       user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
//     -->
//     <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
//     <!--
//       Notice the use of %PUBLIC_URL% in the tags above.
//       It will be replaced with the URL of the `public` folder during the build.
//       Only files inside the `public` folder can be referenced from the HTML.

//       Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
//       work correctly both with client-side routing and a non-root public URL.
//       Learn how to configure a non-root public URL by running `npm run build`.
//     -->
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
//     <title>Weather Applicaion</title>
//   </head>
//   <body>
//     <noscript>You need to enable JavaScript to run this app.</noscript>
//     <div id="root"></div>
//     <!--
//       This HTML file is a template.
//       If you open it directly in the browser, you will see an empty page.

//       You can add webfonts, meta tags, or analytics to this file.
//       The build step will place the bundled scripts into the <body> tag.

//       To begin the development, run `npm start` or `yarn start`.
//       To create a production bundle, use `npm run build` or `yarn build`.
//     -->
//   </body>
// </html>
