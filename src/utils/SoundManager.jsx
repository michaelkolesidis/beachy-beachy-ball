// Beachy Beachy Ball
// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { useEffect, useMemo } from "react";
import useAudio from "../stores/useAudio";
import useGame from "../stores/useGame";

const backgroundSound = new Audio("./sounds/background.mp3");
backgroundSound.loop = true;

function SoundManager() {
  const audio = useAudio((state) => state.audio);
  const gamePhase = useGame((state) => state.phase);

  const successSound = useMemo(() => {
    const sound = new Audio("./sounds/success.mp3");
    sound.volume = 0.2;
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
