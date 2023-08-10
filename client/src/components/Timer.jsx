import React, { useState, useEffect } from "react";

const Timer = () => {
  const initialWorkTime = 25 * 60; // 25 minutes in seconds
  const initialBreakTime = 5 * 60; // 5 minutes in seconds

  const [seconds, setSeconds] = useState(initialWorkTime);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [spanText, setSpanText] = useState("Work");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (isActive && seconds === 0) {
      clearInterval(interval);
      handleTimerCompletion();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleTimerCompletion = () => {
    if (isBreak) {
      setSpanText("Work");
      setSeconds(initialWorkTime); // Start work timer
    } else {
      setSpanText("Break");
      setSeconds(initialBreakTime); // Start break timer
    }
    setIsBreak(!isBreak);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialWorkTime);
  };

  return (
    <div>
      {user ? (
        <>
          <div className="profile-display">
            <img src={user.picture} alt="Profile Picture" />
            <h5>{user.email}</h5>
          </div>
          <h1>Pomodro Timer</h1>
          <span>{spanText} Time</span>
          <p>
            {Math.floor(seconds / 60)}:
            {(seconds % 60).toString().padStart(2, "0")}
          </p>
          <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
          <button onClick={resetTimer}>Reset</button>
        </>
      ) : (
        <h1>Please Sign-In to use Pomodro</h1>
      )}
    </div>
  );
};

export default Timer;
