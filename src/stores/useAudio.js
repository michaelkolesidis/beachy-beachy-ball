// Beachy Beachy Ball
// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getLocalStorage, setLocalStorage } from "./utils";

const useAudio = create(
  subscribeWithSelector((set) => ({
    audio: getLocalStorage("audio") ?? true,
    toggleAudio: () => {
      set((state) => {
        const newAudioState = !state.audio;
        setLocalStorage("audio", newAudioState);
        return { audio: newAudioState };
      });
    },
  }))
);

export default useAudio;
