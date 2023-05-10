import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";
import useAudio from "../stores/useAudio";
import useGame from "../stores/useGame";

function ShortcutManager() {
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const restartGame = useGame((state) => state.restart);
  const toggleAudio = useAudio((state) => state.toggleAudio);

  useEffect(() => {
    return subscribeKeys(
      ({ reset, audio }) => ({ reset, audio }),
      ({ reset, audio }) => {
        if (reset) restartGame();
        if (audio) toggleAudio();
      }
    );
  }, [subscribeKeys, restartGame, toggleAudio]);
}

export default ShortcutManager;
