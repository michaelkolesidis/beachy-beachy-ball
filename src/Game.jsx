import {} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Lights from "./Lights.jsx";
import { Level, BlockSpinner } from "./level/Level.jsx";
import Player from "./Player.jsx";
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
        <Player />
        <SoundManager />
      </Physics>

      <Effects />
    </>
  );
}
