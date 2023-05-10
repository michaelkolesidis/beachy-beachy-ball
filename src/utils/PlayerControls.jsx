import { KeyboardControls } from "@react-three/drei";

const controls = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "reset", keys: ["KeyR"] },
  { name: "audio", keys: ["KeyM"] },
];

function PlayerControls({ children }) {
  return <KeyboardControls map={controls}>{children}</KeyboardControls>;
}

export default PlayerControls;
