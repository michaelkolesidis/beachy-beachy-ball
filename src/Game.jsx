// Beachy Beachy Ball
// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import {} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Lights from "./Lights.jsx";
import { RandomLevel, TourLevel } from "./level/Level.jsx";

import Ball from "./Ball.jsx";
import useGame from "./stores/useGame.js";
import useAudio from "./stores/useAudio.js";
import { SoundManager } from "./utils/SoundManager.jsx";
import { useState } from "react";

export default function Experience() {
  const mode = useGame((state) => state.mode);
  const restart = useGame((state) => state.restart);
  const difficulty = useGame((state) => state.difficulty);
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);
  const toggleAudio = useAudio((state) => state.toggleAudio);

  const [showPerformance, setShowperformance] = useState(false);

  document.addEventListener("keydown", (e) => {
    // Restart game
    if (e.code === "KeyR") {
      restart();
    }

    // Toggle sound
    if (e.code === "KeyM") {
      toggleAudio();
    }
  });

  return (
    <>
      <color args={["#00bfff"]} attach="background" />
      {showPerformance && <Perf position="bottom-left" />}
      <Physics debug={false}>
        <Lights />

        {mode === "random" ? (
          <RandomLevel
            count={blocksCount}
            seed={blocksSeed}
            difficulty={difficulty}
            // types={[BlockSpinner]}
          />
        ) : (
          <TourLevel
          difficulty={difficulty}
          />
        )}

        <Ball />
        <SoundManager />
      </Physics>
    </>
  );
}
