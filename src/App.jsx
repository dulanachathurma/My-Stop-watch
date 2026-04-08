import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [time, setTime] = useState(0);       // milliseconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prev => prev + 10); // 10ms increment
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // format milliseconds to mm:ss:ms
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // two digits
    return `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}:${milliseconds.toString().padStart(2,"0")}`;
  };

  return (
    <div className="app">
      <h1>Stopwatch</h1>
      <div className="time">{formatTime(time)}</div>
      <div className="buttons">
        <button className="start" onClick={() => setIsRunning(true)}>Start</button>
        <button className="stop" onClick={() => setIsRunning(false)}>Stop</button>
        <button className="reset" onClick={() => { setTime(0); setIsRunning(false); }}>Reset</button>
      </div>
    </div>
  );
}

export default App;