// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { addEffect } from "@react-three/fiber";
import useGame from "../stores/useGame.js";
import useAudio from "../stores/useAudio.js";
import Logo from "../assets/logo_white.svg";

export default function Interface() {
  const time = useRef();

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const audio = useAudio((state) => state.audio);
  const toggleAudio = useAudio((state) => state.toggleAudio);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearData = () => {
    window.localStorage.clear();
  };

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      {/* Logo */}
      <img className="logo" src={Logo} alt="Beachy Beachy Ball Logo" />
      {/* Restart */}
      {phase === "ended" && (
        <div className="restart">
          <div className="finished">Finished!</div>
          <img
            src="./icons/replay.png"
            className="restart-button"
            onClick={restart}
          />
          <div>Play Again</div>
        </div>
      )}
      {/* Control Buttons (top-right) */}
      <div className="control-buttons">
        <div className="control-button" id="sound" onClick={toggleAudio}>
          {audio ? (
            <img src="./icons/sound_on.svg" />
          ) : (
            <img src="./icons/sound_off.svg" />
          )}
        </div>
        <div
          className="control-button"
          id="menu"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <img src="./icons/menu.svg" />
        </div>
      </div>
      {/* Bottom */}
      <div className="bottom">
        {/* Controls */}
        <div className="controls">
          <div className="raw">
            <div className={`key ${forward ? "active" : ""}`}></div>
          </div>
          <div className="raw">
            <div className={`key ${leftward ? "active" : ""}`}></div>
            <div className={`key ${backward ? "active" : ""}`}></div>
            <div className={`key ${rightward ? "active" : ""}`}></div>
          </div>
          <div className="raw">
            <div className={`key large ${jump ? "active" : ""}`}></div>
          </div>
        </div>
        {/* Time */}
        <div>
          <div className="time-label">Time</div>
          <div className="time" ref={time}></div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Menu</div>

            <div className="modal-main">
              <div className="section-title">Mode</div>
              <div className="mode-area">Coming Soon!</div>
              <div className="section-title">Data</div>
              <div
                className="modal-button"
                onClick={() => {
                  clearData();
                }}
              >
                Clear Data
              </div>
            </div>
            <div className="modal-about-area">
              <div className="modal-about">© 2023 Michael Kolesidis.</div>
              <div className="modal-about">Licensed under the GNU AGPL 3.0</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
