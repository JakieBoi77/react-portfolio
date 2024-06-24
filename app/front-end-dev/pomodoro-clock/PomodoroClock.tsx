import styled from 'styled-components';
import React, { useState, useRef ,useEffect } from 'react';

const StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #80d981;
  color: white;
  overflow: auto;
  font-family: serif;
  font-size: 1rem;
  font-weight: 400;
  scroll-behavior: smooth;
  display: flex;
  justify-content: center;
  align-items: center;

  #pomodoro-clock {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #selector-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 375px;
    margin: 30px;
  }

  .time-selector-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .selector-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 130px;
    font-size: 30px;
    font-weight: 1000;
    height: 40px;
    margin: 5px;
  }

  .selector-box p {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #80d981;
    border-radius: 7px;
    width: 40px;
    height: 40px;
  }

  .clickable {
    cursor: pointer;
  }

  #timer-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px;
    border: 5px solid white;
    border-radius: 40px;
    padding: 20px;
  }

  #time-left {
    font-size: 50px;
  }

  #controls-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .control-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 50px;
    margin: 10px;
    background-color: white;
    color: #80d981;
    border-radius: 5px;
  }

  .control-box:hover {
    cursor: pointer;
  }
`;

export default function PomodoroClock() {
  return (
    <StyledDiv>
      <UnstyledPomodoroClock />
    </StyledDiv>
  );
}


const UnstyledPomodoroClock = () => {
  const [breakValue, setBreakValue] = useState(5);
  const [sessionValue, setSessionValue] = useState(25);
  const [timerType, setTimerType] = useState("Session");
  const [minutesLeft, setMinutesLeft] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const handleReset = () => {
    setBreakValue(5);
    setSessionValue(25);
    setTimerType("Session");
    setMinutesLeft(25);
    setSecondsLeft(0);
    setIsActive(false);
    audioRef.current!.pause();
    audioRef.current!.currentTime = 0;
    setIsEnd(false);
  }
  
  const handleStartStop = () => {
    setIsActive(!isActive);
  }
  
  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        if (isEnd) {
          setIsEnd(false);
          if (timerType === "Session") {
              setTimerType("Break");
              setMinutesLeft(breakValue);
              setSecondsLeft(0);
            } else if (timerType === "Break") {
              setTimerType("Session");
              setMinutesLeft(sessionValue);
              setSecondsLeft(0);
            }
        } else if (secondsLeft === 0) {
          if (minutesLeft === 0) {
            setIsEnd(true);
          } else {
            setMinutesLeft(minutesLeft - 1);
            setSecondsLeft(59);
          }
        } else {
          setSecondsLeft(secondsLeft - 1);
          if (minutesLeft === 0 && secondsLeft - 1 === 0) {
            audioRef.current!.play();
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, minutesLeft, timerType, breakValue, sessionValue, isEnd]);
  
  const handleIncrement = (type: any) => {
    if (type === "break" && breakValue < 60) {
      setBreakValue(breakValue + 1);
    } else if (type === "session" && sessionValue < 60) {
      if (!isActive) {
        setMinutesLeft(sessionValue + 1);
      }
      setSessionValue(sessionValue + 1);
    }
  }
  
  const handleDecrement = (type: any) => {
    if (type === "break" && breakValue > 1) {
      setBreakValue(breakValue - 1);
    } else if (type === "session" && sessionValue > 1) {
      if (!isActive) {
        setMinutesLeft(sessionValue - 1);
      }
      setSessionValue(sessionValue - 1);
    }
  }
  
  return (
    <div id="pomodoro-clock">
      <h1 id="title">25 + 5 Clock</h1>
      <audio ref={audioRef} id="beep" src="/sounds/vine-boom.mp3"></audio>
      <SelectorPanel
        breakValue={breakValue}
        sessionValue={sessionValue}
        increment={handleIncrement}
        decrement={handleDecrement}
      />
      <Timer
        timerType={timerType}
        minutesLeft={minutesLeft}
        secondsLeft={secondsLeft}
      />
      <Controls
        reset={handleReset}
        startStop={handleStartStop}
        isActive={isActive}
      />
    </div>
  );
};

function SelectorPanel(props: any) {
  return(
    <div id="selector-panel">
      <TimeSelector
        type="break"
        name="Break Length"
        value={props.breakValue}
        increment={props.increment}
        decrement={props.decrement}
      />
      <TimeSelector
        type="session"
        name="Session Length"
        value={props.sessionValue}
        increment={props.increment}
        decrement={props.decrement}
      />
    </div>
  );
}

function TimeSelector(props: any) {
  return(
    <div className="time-selector-box">
      <h2 id={`${props.type}-label`}>{props.name}</h2>
      <Selector
        type={props.type}
        value={props.value}
        increment={props.increment}
        decrement={props.decrement}
      />
    </div>
  );
}

function Selector(props: any) {
  return(
    <div className="selector-box">
      <p className="clickable" id={`${props.type}-decrement`} onClick={() => props.decrement(props.type)}>-</p>
      <p id={`${props.type}-length`}>{props.value}</p>
      <p className="clickable" id={`${props.type}-increment`} onClick={() => props.increment(props.type)}>+</p>
    </div>
  );
}

function Timer(props: any) {
  return(
    <div id="timer-box">
      <h2 id="timer-label">{props.timerType}</h2>
      <p id="time-left">
        {`${props.minutesLeft < 10 ? '0' + props.minutesLeft : props.minutesLeft}:${props.secondsLeft < 10 ? '0' + props.secondsLeft : props.secondsLeft}`}
      </p>
    </div>
  );
}

function Controls(props: any) {
  return(
    <div id="controls-box">
      <Control type="start_stop" name={props.isActive ? "Stop" : "Start"} click={props.startStop}/>
      <Control type="reset" name="Reset" click={props.reset}/>
    </div>
  );
}

function Control(props: any) {
  return(
    <div className="control-box" onClick={props.click}>
      <p id={props.type}>{props.name}</p>
    </div>
  );
}