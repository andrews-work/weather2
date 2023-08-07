import React, { useState } from "react";
import "./App.css";
import { temp } from "./temp.js";
import { convertWindSpeed } from "./wind.js";
import moment from "moment-timezone";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [currentForecast, setCurrentForecast] = useState([]);
  const [upcomingDay, setUpcomingDay] = useState([]);
  const [tomorrow, setTomorrow] = useState([]);
  const [dayTwo, setDayTwo] = useState([]);
  const [dayThree, setDayThree] = useState([]);
  const [dayFour, setDayFour] = useState([]);
  const [showUpcomingDay, setShowUpcomingDay] = useState(true);
  const [showTomorrow, setShowTomorrow] = useState(false);
  const [showDayTwo, setShowDayTwo] = useState(false);
  const [showDayThree, setShowDayThree] = useState(false);
  const [showDayFour, setShowDayFour] = useState(false);

  const key = "248baf0ea383db2e102a54964edfc218";

  const getNextDays = (data) => {
    const nextDays = [];

    data?.list?.forEach((item) => {
      const date = new Date(item.dt_txt);
      const roundedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Round the date to midnight
      const dateString = roundedDate.toISOString().split("T")[0]; // Convert date string to ISO format and get only the date part
      if (nextDays.indexOf(dateString) === -1) {
        // Use dateString instead of dayName
        nextDays.push(dateString);
      }
    });

    // Sort the days based on date
    nextDays.sort();

    // Return the next four days
    return nextDays.slice(0, 4);
  };

  const getWeather = (e) => {
    e.preventDefault(); // Prevent page refresh
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setWeatherData(json);

        const timezone = json.city.timezone; // Extract timezone of city from API response
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the timezone of the user's device

        const currentForecast = [json.list[0]];
        setCurrentForecast(currentForecast);

        const upcomingDay = json.list.slice(1, 7);
        setUpcomingDay(upcomingDay);

        const currentDate = moment().tz(userTimezone);
        const dayOfWeek = currentDate.format("dddd");

        let tomorrow, dayTwo, dayThree, dayFour;

        switch (dayOfWeek) {
          case "Monday":
            tomorrow = json.list.slice(8, 15);
            dayTwo = json.list.slice(16, 23);
            dayThree = json.list.slice(24, 31);
            dayFour = json.list.slice(32, 39);
            break;
          case "Tuesday":
            tomorrow = json.list.slice(8, 15);
            dayTwo = json.list.slice(16, 23);
            dayThree = json.list.slice(24, 31);
            dayFour = json.list.slice(32, 39);
            break;
          case "Wednesday":
            tomorrow = json.list.slice(8, 15);
            dayTwo = json.list.slice(16, 23);
            dayThree = json.list.slice(24, 31);
            dayFour = json.list.slice(32, 39);
            break;
          case "Thursday":
            tomorrow = json.list.slice(8, 15);
            dayTwo = json.list.slice(16, 23);
            dayThree = json.list.slice(24, 31);
            dayFour = json.list.slice(32, 39);
            break;
          case "Friday":
            tomorrow = json.list.slice(8, 15);
            dayTwo = json.list.slice(16, 23);
            dayThree = json.list.slice(24, 31);
            dayFour = json.list.slice(32, 39);
            break;
          case "Saturday":
            tomorrow = json.list.slice(8, 15);
            dayTwo = json.list.slice(16, 23);
            dayThree = json.list.slice(24, 31);
            dayFour = json.list.slice(32, 39);
            break;
          case "Sunday":
            tomorrow = json.list.slice(8, 15);
            dayTwo = json.list.slice(16, 23);
            dayThree = json.list.slice(24, 31);
            dayFour = json.list.slice(32, 39);
            break;
          default:
            tomorrow = [];
            dayTwo = [];
            dayThree = [];
            dayFour = [];
            break;
        }

        // Convert all datetime strings to local time for user's device timezone
        json.list.forEach((item) => {
          const datetimeStr = item.dt_txt;
          const userTime = moment.tz(datetimeStr, "UTC").tz(userTimezone); // Convert UTC datetime to user's local time
          item.dt_txt = userTime.format("HH:mm:ss"); // Update datetime string with local time
        });

        setTomorrow(tomorrow);
        setDayTwo(dayTwo);
        setDayThree(dayThree);
        setDayFour(dayFour);

        setShowUpcomingDay(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Toggle the "Upcoming Day" section
  const handleShowUpcomingDay = () => {
    setShowUpcomingDay(!showUpcomingDay);
  };

  // Toggle the "Tomorrow" section
  const handleShowTomorrow = () => {
    setShowTomorrow(!showTomorrow);
  };

  // Toggle the "Day Two" section
  const handleShowDayTwo = () => {
    setShowDayTwo(!showDayTwo);
  };

  // Toggle the "Day Three" section
  const handleShowDayThree = () => {
    setShowDayThree(!showDayThree);
  };

  // Toggle the "Day Four" section
  const handleShowDayFour = () => {
    setShowDayFour(!showDayFour);
  };

  // Function to get day name for "Day +2", "Day +3", and "Day +4" sections based on current day of week
  const getDayName = (index) => {
    const currentDate = moment();
    const dayOfWeek = currentDate.format("dddd");

    let dayName;

    switch (dayOfWeek) {
      case "Monday":
        if (index === 0) {
          dayName = "Tuesday";
        } else if (index === 1) {
          dayName = "Wednesday";
        } else if (index === 2) {
          dayName = "Thursday";
        } else {
          dayName = "Friday";
        }
        break;
      case "Tuesday":
        if (index === 0) {
          dayName = "Wednesday";
        } else if (index === 1) {
          dayName = "Thursday";
        } else if (index === 2) {
          dayName = "Friday";
        } else {
          dayName = "Saturday";
        }
        break;
      case "Wednesday":
        if (index === 0) {
          dayName = "Thursday";
        } else if (index === 1) {
          dayName = "Friday";
        } else if (index === 2) {
          dayName = "Saturday";
        } else {
          dayName = "Sunday";
        }
        break;
      case "Thursday":
        if (index === 0) {
          dayName = "Friday";
        } else if (index === 1) {
          dayName = "Saturday";
        } else if (index === 2) {
          dayName = "Sunday";
        } else {
          dayName = "Monday";
        }
        break;
      case "Friday":
        if (index === 0) {
          dayName = "Saturday";
        } else if (index === 1) {
          dayName = "Sunday";
        } else if (index === 2) {
          dayName = "Monday";
        } else {
          dayName = "Tuesday";
        }
        break;
      case "Saturday":
        if (index === 0) {
          dayName = "Sunday";
        } else if (index === 1) {
          dayName = "Monday";
        } else if (index === 2) {
          dayName = "Tuesday";
        } else {
          dayName = "Wednesday";
        }
        break;
      case "Sunday":
        if (index === 0) {
          dayName = "Monday";
        } else if (index === 1) {
          dayName = "Tuesday";
        } else if (index === 2) {
          dayName = "Wednesday";
        } else {
          dayName = "Thursday";
        }
        break;
      default:
        dayName = "";
        break;
    }

    return dayName;
  };

  return (
    <div className="main">
      <div className="weather-input-container">
        <form onSubmit={getWeather}>
          <input className="weather-input" onChange={(e) => setLocation(e.target.value)} placeholder="City" />
        </form>
        <div className="data">
          {/* Current forecast */}
          {currentForecast.length !== 0 && (
            <div className="weather-section">
              <div className="weather-forecast">
                {currentForecast?.map((item) => (
                  <div className="weather-forecast-item" key={item.dt}>
                    <h5>{item.dt_txt}</h5> {/* Display local time */}
                    <h5>{temp(item.main?.temp)} °C</h5>
                    <h5>{convertWindSpeed(item.wind?.speed)} km/h</h5>
                    <h5>Humidity: {item.main?.humidity}%</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Day */}
          {upcomingDay.length !== 0 && (
            <div className="weather-section">
              <div className="header-row">
                <h3>Today</h3>
                <button className="weather-button" onClick={handleShowUpcomingDay}>
                  {showUpcomingDay ? "Hide" : "Show"}
                </button>
              </div>
              <div className="weather-forecast" style={{ display: showUpcomingDay ? "flex" : "none" }}>
                {upcomingDay?.map((item, index) => (
                  <div className="weather-forecast-item" key={index}>
                    <h5>{item.dt_txt}</h5> {/* Display local time */}
                    <h5>{temp(item.main?.temp)} °C</h5>
                    <h5>{convertWindSpeed(item.wind?.speed)} km/h</h5>
                    <h5>Humidity: {item.main?.humidity}%</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tomorrow */}
          {tomorrow.length !== 0 && (
            <div className="weather-section">
              <div className="header-row">
                <h3>Tomorrow</h3>
                <button className="weather-button" onClick={handleShowTomorrow}>
                  {showTomorrow ? "Hide" : "Show"}
                </button>
              </div>
              <div className="weather-forecast" style={{ display: showTomorrow ? "flex" : "none" }}>
                {tomorrow?.map((item, index) => (
                  <div className="weather-forecast-item" key={index + 8}>
                    <h5>{item.dt_txt}</h5> {/* Display local time */}
                    <h5>{temp(item.main?.temp)} °C</h5>
                    <h5>{convertWindSpeed(item.wind?.speed)} km/h</h5>
                    <h5>Humidity: {item.main?.humidity}%</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day +2 */}
          {dayTwo.length !== 0 && (
            <div className="weather-section">
              <div className="header-row">
                <h3>{getDayName(0)}</h3>
                <button className="weather-button" onClick={handleShowDayTwo}>
                  {showDayTwo ? "Hide" : "Show"}
                </button>
              </div>
              <div className="weather-forecast" style={{ display: showDayTwo ? "flex" : "none" }}>
                {dayTwo?.map((item, index) => (
                  <div className="weather-forecast-item" key={index + 16}>
                    <h5>{item.dt_txt}</h5> {/* Display local time */}
                    <h5>{temp(item.main?.temp)} °C</h5>
                    <h5>{convertWindSpeed(item.wind?.speed)} km/h</h5>
                    <h5>Humidity: {item.main?.humidity}%</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day +3 */}
          {dayThree.length !== 0 && (
            <div className="weather-section">
              <div className="header-row">
                <h3>{getDayName(1)}</h3>
                <button className="weather-button" onClick={handleShowDayThree}>
                  {showDayThree ? "Hide" : "Show"}
                </button>
              </div>
              <div className="weather-forecast" style={{ display: showDayThree ? "flex" : "none" }}>
                {dayThree?.map((item, index) => (
                  <div className="weather-forecast-item" key={index + 24}>
                    <h5>{item.dt_txt}</h5> {/* Display local time */}
                    <h5>{temp(item.main?.temp)} °C</h5>
                    <h5>{convertWindSpeed(item.wind?.speed)} km/h</h5>
                    <h5>Humidity: {item.main?.humidity}%</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day +4 */}
          {dayFour.length !== 0 && (
            <div className="weather-section">
              <div className="header-row">
                <h3>{getDayName(2)}</h3>
                <button className="weather-button" onClick={handleShowDayFour}>
                  {showDayFour ? "Hide" : "Show"}
                </button>
              </div>
              <div className="weather-forecast" style={{ display: showDayFour ? "flex" : "none" }}>
                {dayFour?.map((item, index) => (
                  <div className="weather-forecast-item" key={index + 32}>
                    <h5>{item.dt_txt}</h5> {/* Display local time */}
                    <h5>{temp(item.main?.temp)} °C</h5>
                    <h5>{convertWindSpeed(item.wind?.speed)} km/h</h5>
                    <h5>Humidity: {item.main?.humidity}%</h5>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;