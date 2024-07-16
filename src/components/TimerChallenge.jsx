import { useState, useRef } from "react";

import { ResultModal } from "./ResultModal";

export const TimerChallenge = ({ title, targetTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timeoutRef = useRef();
  //   outside ref for ResultModal
  const dialogRef = useRef();

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timeoutRef.current);

    //   triggering the inside ref's function from the outside of it
    dialogRef.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timeoutRef.current = setInterval(() => {
      setTimeRemaining((timeRemaining) => timeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    //   triggering the inside ref's function from the outside of it
    dialogRef.current.open();
    clearInterval(timeoutRef.current);
  }

  return (
    <>
      <ResultModal
        ref={dialogRef}
        remainingTime={timeRemaining}
        targetTime={targetTime}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} seconds {targetTime > 1 ? "seconds" : "second"}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"}
          </button>
        </p>

        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive..."}
        </p>
      </section>
    </>
  );
};
