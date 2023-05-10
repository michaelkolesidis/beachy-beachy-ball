// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import {} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import Lights from "./Lights.jsx";
import { Level } from "./level/Level.jsx";

import Ball from "./Ball.jsx";
import Effects from "./Effects.jsx";
import useGame from "./stores/useGame.js";
import { SoundManager } from "./utils/SoundManager.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <color args={["#00bfff"]} attach="background" />
      <Perf position="bottom-left" />
      <Physics debug={false}>
        <Lights />
        <Level
          count={blocksCount}
          seed={blocksSeed}
          // types={[BlockSpinner]}
        />
        <Ball />
        <SoundManager />
      </Physics>
      <Effects />
    </>
  );
}
