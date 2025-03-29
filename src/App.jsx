/*
 *  Beachy Beachy Ball
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  ATTENTION! FREE SOFTWARE
 *  This website is free software (free as in freedom).
 *  If you use any part of this code, you must make your entire project's source code
 *  publicly available under the same license. This applies whether you modify the code
 *  or use it as it is in your own project. This ensures that all modifications and
 *  derivative works remain free software, so that everyone can benefit.
 *  If you are not willing to comply with these terms, you must refrain from using any part of this code.
 *
 *  For full license terms and conditions, you can read the AGPL-3.0 here:
 *  https://www.gnu.org/licenses/agpl-3.0.html
 */

import { Canvas } from '@react-three/fiber';
// import { EffectComposer, Pixelation } from "@react-three/postprocessing";
import useGame from './stores/useGame.js';
import Game from './Game.jsx';
import Interface from './interface/Interface';
import Controls from './utils/Controls';
import MainMenu from './interface/MainMenu.jsx';

// Prevent right click
document.addEventListener('contextmenu', (e) => e.preventDefault());

export default function App() {
  const isInGame = useGame((state) => state.isInGame);
  // const pixalated = useGame((state) => state.pixalated);

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
            {/* {pixalated && (
              <EffectComposer>
                <Pixelation granularity={5} />
              </EffectComposer>
            )} */}
            <Game />
          </Canvas>
          <Interface />
        </Controls>
      ) : (
        <MainMenu />
      )}
    </>
  );
}
