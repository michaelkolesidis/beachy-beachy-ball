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

export default create(
  subscribeWithSelector((set) => {
    return {
      /**
       * Is the player in the game or in the main menu?
       */
      isInGame: false,
      setIsInGame: (inOrOut) => {
        set(() => {
          return {
            isInGame: inOrOut,
          };
        });
      },

      /**
       * Show performance
       */
      performance: false,
      showPerformance: () => {
        set(() => {
          return {
            performance: true,
          };
        });
      },

      /**
       * Pixelate screen
       */
      // pixelated: false,

      /**
       * Mode
       */
      mode: getLocalStorage('mode') || 'random', // "random", "tour", "adventure"
      setMode: (gameMode) => {
        setLocalStorage('mode', gameMode);
        set(() => {
          return {
            mode: gameMode,
          };
        });
      },

      /**
       * Difficulty
       */
      difficulty: parseInt(getLocalStorage('difficulty')) || 1, // 1, 1.25, 1.5, 2
      setDifficulty: (dif) => {
        setLocalStorage('difficulty', dif);
        set(() => {
          return {
            difficulty: dif,
          };
        });
      },

      /**
       * Random level generation
       */
      blocksCount: parseInt(getLocalStorage('blocksCount')) || 10,
      setBlocksCount: (count) => {
        set(() => {
          setLocalStorage('blocksCount', count);
          return {
            blocksCount: count,
          };
        });
      },
      blocksSeed: 0,

      /**
       * Level (tour)
       */
      level: getLocalStorage('level') || 'copacabana',
      setLevel: (name) => {
        set(() => {
          setLocalStorage('level', name);
          return {
            level: name,
          };
        });
      },

      /**
       * High scores
       */
      highScoreRandom: getLocalStorage('highScoreRandom') || 0,
      highScoreCopacabana: getLocalStorage('highScoreCopacabana') || 0,
      highScoreSantaMonica: getLocalStorage('highScoreSantaMonica') || 0,

      /**
       * Time
       */
      startTime: 0,
      endTime: 0,

      /**
       * Phases
       */
      phase: 'ready',

      start: () => {
        set((state) => {
          if (state.phase === 'ready') {
            return { phase: 'playing', startTime: Date.now() };
          }
          return {};
        });
      },

      restart: () => {
        set((state) => {
          if (state.phase === 'playing' || state.phase === 'ended') {
            return { phase: 'ready', blocksSeed: Math.random() };
          }
          return {};
        });
      },

      end: () => {
        set((state) => {
          if (state.phase === 'playing') {
            const endTime = Date.now();
            const score = endTime - state.startTime;

            if (state.mode === 'random') {
              const highScoreRandom =
                state.highScoreRandom === 0 || score < state.highScoreRandom
                  ? score
                  : state.highScoreRandom;

              setLocalStorage('highScoreRandom', highScoreRandom);
              return { phase: 'ended', endTime, highScoreRandom };
            } else if (state.mode === 'tour') {
              if (state.level === 'copacabana') {
                const highScoreCopacabana =
                  state.highScoreCopacabana === 0 ||
                  score < state.highScoreCopacabana
                    ? score
                    : state.highScoreCopacabana;

                setLocalStorage('highScoreCopacabana', highScoreCopacabana);
                return { phase: 'ended', endTime, highScoreCopacabana };
              } else if (state.level === 'santamonica') {
                const highScoreSantaMonica =
                  state.highScoreSantaMonica === 0 ||
                  score < state.highScoreSantaMonica
                    ? score
                    : state.highScoreSantaMonica;

                setLocalStorage('highScoreSantaMonica', highScoreSantaMonica);
                return { phase: 'ended', endTime, highScoreSantaMonica };
              }
            }
          }
          return {};
        });
      },
    };
  })
);
