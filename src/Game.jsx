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

import {} from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import Lights from './Lights.jsx';
import { RandomLevel, TourLevel } from './level/Level.jsx';

import Ball from './Ball.jsx';
import useGame from './stores/useGame.js';
import useAudio from './stores/useAudio.js';
import { SoundManager } from './utils/SoundManager.jsx';
import { useEffect } from 'react';

export default function Experience() {
  const mode = useGame((state) => state.mode);
  const performance = useGame((state) => state.performance);
  const showPerformance = useGame((state) => state.showPerformance);
  const restart = useGame((state) => state.restart);
  const difficulty = useGame((state) => state.difficulty);
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);
  const toggleAudio = useAudio((state) => state.toggleAudio);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Restart game
      if (e.code === 'KeyR') {
        restart();
      }

      // Toggle sound
      else if (e.code === 'KeyM') {
        toggleAudio();
      }

      // Toggle performance
      else if (e.code === 'KeyP') {
        showPerformance();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [restart, toggleAudio, showPerformance]);

  return (
    <>
      <color args={['#00bfff']} attach="background" />
      {performance && <Perf position="bottom-left" />}
      <Physics debug={false}>
        <Lights />

        {mode === 'random' ? (
          <RandomLevel
            count={blocksCount}
            seed={blocksSeed}
            difficulty={difficulty}
            // types={[BlockSpinner]}
          />
        ) : (
          <TourLevel difficulty={difficulty} />
        )}

        <Ball />
        <SoundManager />
      </Physics>
    </>
  );
}
