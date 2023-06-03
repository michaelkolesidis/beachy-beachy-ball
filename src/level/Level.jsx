// Beachy Beachy Ball
// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { useMemo } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import useGame from "../stores/useGame.js";
import {
  blockDimensions,
  BlockEmpty,
  BlockSpinner,
  BlockDoubleSpinner,
  BlockLimbo,
  BlockDoubleLimbo,
  // BlockPlatformLimbo,
  // BlockRamp,
  BlockSlidingWall,
  BlockDoubleSlidingWall,
  BlockEnd,
} from "./components/Blocks.jsx";
import levels from "./components/Levels.jsx";

THREE.ColorManagement.enabled = true;

export function Bounds({ length = 1 }) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <CuboidCollider
        args={[blockDimensions.width / 2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
}

export function RandomLevel({
  count = 5,
  types = [
    BlockSpinner,
    BlockDoubleSpinner,
    BlockSlidingWall,
    BlockDoubleSlidingWall,
    BlockLimbo,
    BlockDoubleLimbo,
    // BlockPlatformLimbo,
    // BlockRamp
  ],
  seed = 0,
  difficulty = 1,
}) {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockEmpty position={[0, 0, 0]} />

      {blocks.map((Block, index) => (
        <Block
          key={index}
          position={[0, 0, -(index + 1) * 4]}
          difficulty={difficulty}
        />
      ))}
      <BlockEmpty position={[0, 0, -(count + 1) * 4]} />
      <BlockEnd position={[0, 0, -(count + 2) * 4]} />
      <Bounds length={count + 3} />
    </>
  );
}

export function TourLevel({ difficulty = 1 }) {
  const { level } = useGame();
  let currentLevel;
  switch (level) {
    case "copacabana":
      currentLevel = 0;
      break;
    case "santamonica":
      currentLevel = 1;
      break;
  }

  let name, count, blocks;
  name = levels[currentLevel].name;
  count = levels[currentLevel].count;
  blocks = levels[currentLevel].blocks;

  return (
    <>
      <BlockEmpty position={[0, 0, 0]} />

      {blocks.map((Block, index) => (
        <Block
          key={index}
          position={[0, 0, -(index + 1) * 4]}
          difficulty={difficulty}
        />
      ))}
      <BlockEmpty position={[0, 0, -(count + 1) * 4]} />
      <BlockEnd position={[0, 0, -(count + 2) * 4]} />
      <Bounds length={count + 3} />
    </>
  );
}
