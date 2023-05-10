// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { Float, Text } from "@react-three/drei";
import useGame from "../../stores/useGame.js";

export default function Finished(props) {
  const phase = useGame((state) => state.phase);

  return (
    <>
      {phase === "ended" && (
        <Float>
          <Text font="./fonts/nickname.otf" scale={0.5} {...props}>
            FINISHED!
            <meshBasicMaterial toneMapped={false} />
          </Text>
        </Float>
      )}
    </>
  );
}
