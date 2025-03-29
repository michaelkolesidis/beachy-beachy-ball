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

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { getLocalStorage, setLocalStorage } from './utils';

const useAudio = create(
  subscribeWithSelector((set) => ({
    audio: getLocalStorage('audio') ?? true,
    toggleAudio: () => {
      set((state) => {
        const newAudioState = !state.audio;
        setLocalStorage('audio', newAudioState);
        return { audio: newAudioState };
      });
    },
  }))
);

export default useAudio;
