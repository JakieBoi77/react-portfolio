import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

interface Sound {
  desc: string;
  id: string;
  path: string;
}

const sounds: Record<string, Sound> = {
  Q: {
    desc: "What the sigma?",
    id: "what-the-sigma",
    path: "/sounds/what-the-sigma.mp3"
  },
  W: {
    desc: "Boo-womp",
    id: "boo-womp",
    path: "/sounds/boo-womp.mp3"
  },
  E: {
    desc: "Vine Boom",
    id: "vine-boom",
    path: "/sounds/vine-boom.mp3"
  },
  A: {
    desc: "Fire in the hole!",
    id: "fire-in-the-hole",
    path: "/sounds/fire-in-the-hole.mp3"
  },
  S: {
    desc: "Water on the hill!",
    id: "water-on-the-hill",
    path: "/sounds/water-on-the-hill.mp3"
  },
  D: {
    desc: "Clash Royale Laugh",
    id: "clash-royale-laugh",
    path: "/sounds/clash-royale-laugh.mp3"
  },
  Z: {
    desc: "Android Notfication",
    id: "android-notification",
    path: "/sounds/android-notification.mp3"
  },
  X: {
    desc: "Taco Bell",
    id: "taco-bell",
    path: "/sounds/taco-bell-bong.mp3"
  },
  C: {
    desc: "Lego Yoda",
    id: "lego-yoda-death",
    path: "/sounds/lego-yoda-death.mp3"
  }
};

const StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #363738;
  overflow: auto;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 400;
  scroll-behavior: smooth;
  display: flex;
  justify-content: center;
  align-items: center;

  #meme-soundboard {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 2px solid;
    background-color: white;
    box-shadow: 5px 5px 2px;
  }

  #title {
    text-align: center;
    margin: 10px;
  }

  #drum-machine {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  #sound-container {
    display: grid;
    gap: 10px 10px;
    grid-template-columns: 60px 60px 60px;
    margin: 20px;
  }

  .drum-pad {
    border: 1px solid;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 3px 3px 2px;
  }

  .drum-pad:hover {
    border: 2px solid;
  }

  #side-panel {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px;
    border: 1px solid;
    
  }

  #display-box {
    width: 200px;
    height: 50px;
    border: 1px solid;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #display {
    text-align: center;
  }

  .slider-box {
    display: flex;
    justfiy-content: center;
    align-items: center;
    flex-direction: column;
  }

  #volume-slider {
    margin: 5px;
  }

  #volume {
    margin: 5px;
  }
`;

export default function MemeSoundboard() {
  return (
    <StyledDiv>
      <UnstyledMemeSoundboard />
    </StyledDiv>
  );
}


const UnstyledMemeSoundboard = () => {
  const [soundDesc, setSoundDesc] = useState("");
  const [soundVolume, setVolume] = useState(0.5);
  
  // Handle Keyboard Input
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      const key = event.key.toUpperCase();
      const sound = sounds[key];
      if (sound) {
        const audioElement = document.getElementById(key) as HTMLAudioElement;
        if (audioElement) {
          audioElement.volume = soundVolume;
          audioElement.play();
          setSoundDesc(sound.desc);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [soundVolume]);
  
  // Handle Mouse Input
  const handleClick = (letter: any) => {
    const sound = sounds[letter];
    if (sound) {
      const audioElement = document.getElementById(letter) as HTMLAudioElement;
      if (audioElement) {
        audioElement.volume = soundVolume;
        audioElement.play();
        setSoundDesc(sound.desc);
      }
    }
  }
  
  // Handle Volume Change
  const handleVolumeChange = (event: any) => {
    setVolume(event.target.value);
  }
  
  return (
    <div id="meme-soundboard">
      <h1 id="title">Meme Soundboard</h1>
      <div id="drum-machine">
        <SoundPanel click={handleClick} />
        <SidePanel desc={soundDesc} volume={soundVolume} volumeChange={handleVolumeChange}/>
      </div>
    </div>
  );
};

function SoundPanel (props: any) {
  return (
    <div id="sound-container">
      {Object.keys(sounds).map((key) => (
        <Sound key={key} letter={key} click={props.click} />
      ))}
    </div>
  );
}

function Sound (props: any) {
  return (
    <div className="drum-pad" id={sounds[props.letter].id} onClick={() => props.click(props.letter)}>
      <p className="sound-letter">{props.letter}</p>
      <audio className="clip" id={props.letter} src={sounds[props.letter].path}></audio>
    </div>
  );
}

function SidePanel (props: any) {
  return (
    <div id="side-panel">
      <Display desc={props.desc} />
      <Controls volume={props.volume} volumeChange={props.volumeChange}/>
    </div>
  );
}

function Display (props: any) {
  return(
    <div id="display-box">
      <p id="display">{props.desc}</p>
    </div>
  );
}

function Controls (props: any) {
  return(
    <div id="controls-box">
      <Switch />
      <Switch />
      <Slider volume={props.volume} volumeChange={props.volumeChange}/>
    </div>
  );
}

function Switch () {
  return(
    <div className="switch-box">
    </div>
  );
}

function Slider (props: any) {
  return(
    <div className="slider-box">
      <input id="volume-slider" type="range" min="0" max="1" step="0.01" value={props.volume} onChange={props.volumeChange}/>
      <span id="volume">Volume: {Math.round(props.volume * 100)}</span>
    </div>
  );
}