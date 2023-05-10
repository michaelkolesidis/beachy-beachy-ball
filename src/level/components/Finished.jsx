import { Float, Text } from "@react-three/drei";
import useGame from "../../stores/useGame.js";

export default function Finished() {
  const phase = useGame((state) => state.phase);

  return (
    <>
      {phase === "ended" && (
        <Float>
          <Text
            font="./fonts/nickname.otf"
            scale={0.5}
            position={[0, 1.25, 0.75]}
          >
            FINISHED!
            <meshBasicMaterial toneMapped={false} />
          </Text>
        </Float>
      )}
    </>
  );
}
