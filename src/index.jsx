import "./styles/style.css";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Loading from "./interface/Loading";
import Game from "./Game.jsx";
import Interface from "./interface/Interface";
import ShortcutManager from "./utils/ShortcutManager";
import PlayerControls from "./utils/PlayerControls";

const root = ReactDOM.createRoot(document.querySelector("#root"));

// Prevent right click
document.addEventListener("contextmenu", (e) => e.preventDefault());

root.render(
  <Suspense fallback={<Loading />}>
    <PlayerControls>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <Game />
      </Canvas>
      <Interface />
      <ShortcutManager />
    </PlayerControls>
  </Suspense>
);
