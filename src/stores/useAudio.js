import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useAudio = create(
  subscribeWithSelector((set) => ({
    audio: true,
    toggleAudio: () => set((state) => ({ audio: !state.audio })),
  }))
);

export default useAudio;
