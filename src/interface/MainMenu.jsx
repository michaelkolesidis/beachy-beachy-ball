// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import useGame from "../stores/useGame.js";
import LogoBall from "../assets/logo_ball_stroke.svg";
import Woodmark from "../assets/woodmark.svg";

export default function MainMenu() {
  const proceedToGame = useGame((state) => state.proceedToGame);

  return (
    <div className="main-menu">
      <img className="logo-ball" src={LogoBall} />
      <img className="woodmark" src={Woodmark} />
      <div className="play-button" onClick={() => proceedToGame()}>
        Play
      </div>
      <div className="">
        Do not show the main menu next time and get me right into the game!
      </div>
    </div>
  );
}
