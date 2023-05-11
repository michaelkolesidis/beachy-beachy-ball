// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import useGame from "../stores/useGame.js";
import LogoBall from "../assets/logo_ball_stroke.svg";
import Woodmark from "../assets/woodmark.svg";
import MichaelLogo from "../assets/mm_white.svg";

export default function MainMenu() {
  const mode = useGame((state) => state.mode);
  const setMode = useGame((state) => state.setMode);
  const proceedToGame = useGame((state) => state.proceedToGame);

  return (
    <div className="main-menu">
      <img className="logo-ball" src={LogoBall} />
      <img className="woodmark" src={Woodmark} />
      <div className="play-button" onClick={() => proceedToGame()}>
        Play
      </div>
      <div className="main-menu-mode">Mode</div>

      <div className="main-menu-modes">
        <div
          className={`main-menu-mode-selection ${
            mode === "random" ? "main-menu-mode-selected" : ""
          }`}
          onClick={() => setMode("random")}
        >
          Random
        </div>
        <div
          className={`main-menu-mode-selection ${
            mode === "adventure" ? "main-menu-mode-selected" : ""
          }`}
          onClick={() => setMode("adventure")}
        >
          Adventure
        </div>
      </div>

      <div className="main-menu-about-section">
        <div className="main-menu-about">© 2023 Michael Kolesidis.</div>
        <div className="main-menu-about">Licensed under the GNU AGPL 3.0</div>
      </div>
      <img className="author-logo" src={MichaelLogo} />
    </div>
  );
}
