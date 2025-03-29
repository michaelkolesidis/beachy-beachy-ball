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

import { useEffect, useMemo } from 'react';
import useAudio from '../stores/useAudio';
import useGame from '../stores/useGame';

const backgroundSound = new Audio('./sounds/background.mp3');
backgroundSound.loop = true;

function SoundManager() {
  const audio = useAudio((state) => state.audio);
  const gamePhase = useGame((state) => state.phase);

  const successSound = useMemo(() => {
    const sound = new Audio('./sounds/success.mp3');
    sound.volume = 0.2;
    return sound;
  }, []);

  useEffect(() => {
    if (gamePhase === 'ready') {
      backgroundSound.volume = 0.1;
    }
    if (gamePhase === 'playing') {
      backgroundSound.volume = 0.1;
      backgroundSound.play();
    }
    if (gamePhase === 'ended') {
      backgroundSound.volume = 0.2;
      successSound.currentTime = 0;
      successSound.play();
    }
  }, [gamePhase]);

  useEffect(() => {
    backgroundSound.muted = !audio;
    successSound.muted = !audio;
  }, [audio]);

  return null;
}

export { SoundManager };
