import { useEffect, useMemo } from "react";
import useAudio from "../stores/useAudio";
import useGame from "../stores/useGame";

function SoundManager() {
  const audio = useAudio((state) => state.audio);
  const gamePhase = useGame((state) => state.phase);

  const successSound = useMemo(() => {
    const sound = new Audio("./sounds/success.mp3");
    sound.volume = 0.2;
    return sound;
  }, []);
  const backgroundSound = useMemo(() => {
    const sound = new Audio("./sounds/background.mp3");
    sound.loop = true;
    return sound;
  }, []);

  useEffect(() => {
    if (gamePhase === "ready") {
      backgroundSound.volume = 0.1;
    }
    if (gamePhase === "playing") {
      backgroundSound.volume = 0.1;
      backgroundSound.play();
    }
    if (gamePhase === "ended") {
      backgroundSound.volume = 0.2;
      successSound.currentTime = 0;
      successSound.play();
    }
  }, [gamePhase]);

  useEffect(() => {
    backgroundSound.muted = !audio;
    successSound.muted = !audio;
  }, [audio]);

  return null;
}

export { SoundManager };
