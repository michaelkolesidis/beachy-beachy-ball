// Beachy Beachy Ball
// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { useRapier, RigidBody } from "@react-three/rapier";
import { useFrame, useLoader } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import useGame from "./stores/useGame.js";

export default function Ball() {
  const ballTexture = useLoader(
    THREE.TextureLoader,
    "./textures/beach_ball_texture.png"
  );

  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(0, 0, 200) // initial camera position
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const { start, restart } = useGame();

  const jump = () => {
    const origin = body.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true); // true: considers everything as solid

    if (hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.75, z: 0 });
    }
  };

  const reset = () => {
    body.current.setTranslation({ x: 0, y: 0.75, z: 0 });
    body.current.setLinvel({ x: 0, y: 0, z: 0 });
    body.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          reset();
        }
        if (phase === "ready") {
          reset();
        }
        if (phase === "ready") {
          reset();
        }
      }
    );

    const unsubscribeJump = subscribeKeys(
      // selector
      (state) => state.jump, // we listen to jump changes
      // instructions
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeReset();
      unsubscribeJump();
      unsubscribeAny();
    };
  }, []);

  useFrame((state, delta) => {
    /**
     * Controls
     */
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);

    /**
     * Camera
     */
    const bodyPosition = body.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);

    /**
     * Restart
     */
    if (bodyPosition.y < -4) {
      restart();
    }
  });

  // function onHit() {
  //   console.log("Ball hit something!")
  //   hitSound.currentTime = 0
  //   hitSound.volume = Math.random() * 0.1
  //   hitSound.play()
  // }

  return (
    <RigidBody
      name="ball"
      ref={body}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angulularDamping={0.5}
      position={[0, 1, 0]}
      // onCollisionEnter={onHit}
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.3, 128, 128]} />
        <meshStandardMaterial map={ballTexture} flatShading />
      </mesh>
    </RigidBody>
  );
}
