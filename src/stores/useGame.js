import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getLocalStorage, setLocalStorage } from "./utils";

export default create(
  subscribeWithSelector((set) => {
    return {
      /**
       * Level
       */
      blocksCount: 20,
      blocksSeed: 0,

      /**
       * High score
       */
      highScore: getLocalStorage("highScore") || 0,

      /**
       * Time
       */
      startTime: 0,
      endTime: 0,

      /**
       * Phases
       */
      phase: "ready",

      start: () => {
        set((state) => {
          if (state.phase === "ready") {
            return { phase: "playing", startTime: Date.now() };
          }
          return {};
        });
      },

      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended") {
            return { phase: "ready", blocksSeed: Math.random() };
          }
          return {};
        });
      },

      end: () => {
        set((state) => {
          if (state.phase === "playing") {
            const endTime = Date.now();
            const score = endTime - state.startTime;
            const highScore =
              state.highScore === 0 || score < state.highScore
                ? score
                : state.highScore;

            setLocalStorage("highScore", highScore);

            return { phase: "ended", endTime, highScore };
          }
          return {};
        });
      },
    };
  })
);
