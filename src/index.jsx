// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import "./styles/style.css";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Loading from "./interface/Loading";
import Game from "./Game.jsx";
import Interface from "./interface/Interface";
import ShortcutManager from "./utils/ShortcutManager";
import Controls from "./utils/Controls";

const root = ReactDOM.createRoot(document.querySelector("#root"));

// Prevent right click
document.addEventListener("contextmenu", (e) => e.preventDefault());

root.render(
  <Suspense fallback={<Loading />}>
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
  </Suspense>
);
