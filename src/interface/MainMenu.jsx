// Beachy Beachy Ball
// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import useGame from "../stores/useGame.js";
import LogoBall from "../assets/logo_ball_stroke.svg";
import Woodmark from "../assets/woodmark.svg";
import MichaelLogo from "../assets/mm_white.svg";
import { getLocalStorage, setLocalStorage } from "../stores/utils.js";

export default function MainMenu() {
  const mode = useGame((state) => state.mode);
  const setMode = useGame((state) => state.setMode);
  const level = useGame((state) => state.level);
  const setLevel = useGame((state) => state.setLevel);

  const proceedToGame = useGame((state) => state.proceedToGame);

  document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      proceedToGame();
    }
  });

  return (
    <div className="main-menu">
      <img className="logo-ball" src={LogoBall} />
      <img className="woodmark" src={Woodmark} />
      <div className="play-button" onClick={() => proceedToGame()}>
        Play
      </div>

      <div className="main-menu-section-title">Mode</div>
      <div className="main-menu-selection-area">
        <div
          className={`main-menu-selection ${
            mode === "random" ? "main-menu-selected" : ""
          }`}
          onClick={() => setMode("random")}
        >
          Random
        </div>
        <div
          className={`main-menu-selection ${
            mode === "tour" ? "main-menu-selected" : ""
          }`}
          onClick={() => setMode("tour")}
        >
          Tour
        </div>
        <div
          className={`main-menu-selection ${
            mode === "adventure" ? "main-menu-selected" : ""
          }`}
          onClick={() => setMode("adventure")}
        >
          Adventure
        </div>
      </div>

      {mode === "tour" && (
        <>
          <div className="main-menu-section-title">Beach</div>
          <div className="main-menu-selection-area">
            <div
              className={`main-menu-selection ${
                level === "copacabana" ? "main-menu-selected" : ""
              }`}
              onClick={() => {
                setLevel("copacabana");
                setLocalStorage("level", "copacabana");
              }}
            >
              Copacabana
            </div>
            <div
              className={`main-menu-selection ${
                level === "santamonica" ? "main-menu-selected" : ""
              }`}
              onClick={() => {
                setLevel("santamonica");
                setLocalStorage("level", "santamonica");
              }}
            >
              Santa Monica
            </div>
          </div>
          <div className="coming-soon">More beaches coming soon!</div>
        </>
      )}

      {mode === "adventure" && <div className="coming-soon">Coming soon!</div>}

      <div className="main-menu-about-section">
        <div className="main-menu-about">© 2023 Michael Kolesidis.</div>
        <div className="main-menu-about">Licensed under GNU AGPL 3.0</div>
      </div>
      <a href="https://michaelkolesidis.com" target="_blank">
        <img
          className="author-logo"
          src={MichaelLogo}
          alt="Author's logo"
        ></img>
      </a>
    </div>
  );
}
