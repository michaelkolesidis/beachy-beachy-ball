// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { Canvas } from "@react-three/fiber";
import useGame from "./stores/useGame.js";
import Game from "./Game.jsx";
import Interface from "./interface/Interface";
import ShortcutManager from "./utils/ShortcutManager";
import Controls from "./utils/Controls";
import MainMenu from "./interface/MainMenu.jsx";

// Prevent right click
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Keep console clear of logs
// const log = console.log;
// console.log = () => {};
// const warn = console.warn;
// console.warn = () => {};
// const error = console.error;
// console.error = () => {};

export default function App() {
  const isInGame = useGame((state) => state.isInGame);

  return (
    <>
      {isInGame ? (
        <Controls>
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
        </Controls>
      ) : (
        <MainMenu />
      )}
    </>
  );
}
