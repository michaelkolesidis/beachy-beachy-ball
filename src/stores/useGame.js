// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getLocalStorage, setLocalStorage } from "./utils";

export default create(
  subscribeWithSelector((set) => {
    return {
      /**
       * Level
       */
      level: 0,

      /**
       * Level generation
       */
      blocksCount: 10,
      blocksSeed: 0,

      /**
       * Mode
       */
      mode: "random", // "random", "adventure"

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
