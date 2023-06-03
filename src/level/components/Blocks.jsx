// Beachy Beachy Ball
// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import useGame from "../../stores/useGame.js";
import Star from "./Star.jsx";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const beachMaterial = new THREE.MeshStandardMaterial({ color: "orange" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "tomato" });

export const blockDimensions = {
  width: 4.2,
  height: 0.3,
  length: 4,
};

/**
 * BlockEmpty
 */
export function BlockEmpty({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.2, 0]}
        scale={[
          blockDimensions.width,
          blockDimensions.height,
          blockDimensions.length,
        ]}
        receiveShadow
      />
    </group>
  );
}

/**
 * BlockSpinner
 */
export function BlockSpinner({ position = [0, 0, 0], difficulty }) {
  const obstacle = useRef();
  const [speed] = useState(
    () => (Math.random() + difficulty + 0.5) * (Math.random() < 0.5 ? -1 : 1)
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.2, 0]}
        scale={[
          blockDimensions.width,
          blockDimensions.height,
          blockDimensions.length,
        ]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.4, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[4.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

/**
 * BlockDoubleSpinner
 */
export function BlockDoubleSpinner({ position = [0, 0, 0], difficulty }) {
  const obstacle1 = useRef();
  const obstacle2 = useRef();

  const [direction] = useState(() => (Math.random() < 0.5 ? -1 : 1));
  const [speed] = useState(() => difficulty * 2 * direction);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation1 = new THREE.Quaternion();
    rotation1.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle1.current.setNextKinematicRotation(rotation1);

    const rotation2 = new THREE.Quaternion();
    rotation2.setFromEuler(new THREE.Euler(0, time * -speed, 0));
    obstacle2.current.setNextKinematicRotation(rotation2);
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.2, 0]}
        scale={[
          blockDimensions.width,
          blockDimensions.height,
          blockDimensions.length,
        ]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle1}
        type="kinematicPosition"
        position={[blockDimensions.width / 4, 0.4, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[2.25, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
      <RigidBody
        ref={obstacle2}
        type="kinematicPosition"
        position={[-blockDimensions.width / 4, 0.4, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.8, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

/**
 * BlockLimbo
 */
export function BlockLimbo({ position = [0, 0, 0], difficulty }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const y = Math.sin(1.5 * difficulty * time + timeOffset) + 1.3;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.2, 0]}
        scale={[
          blockDimensions.width,
          blockDimensions.height,
          blockDimensions.length,
        ]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[4, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

/**
 * BlockDoubleLimbo
 */
export function BlockDoubleLimbo({ position = [0, 0, 0], difficulty }) {
  const obstacle1 = useRef();
  const obstacle2 = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const y1 = 0.3 * Math.sin(difficulty * 1.5 * time + timeOffset) + 1.3;
    obstacle1.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y1 + 0.2,
      z: position[2],
    });

    const y2 = -0.3 * Math.sin(1.5 * difficulty * time + timeOffset) + 1.3;
    obstacle2.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y2 - 0.8,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.2, 0]}
        scale={[
          blockDimensions.width,
          blockDimensions.height,
          blockDimensions.length,
        ]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle1}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[4, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
      <RigidBody
        ref={obstacle2}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[4, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

/**
 * BlockPlatformLimbo
 */
export function BlockPlatformLimbo({ position = [0, 0, 0], difficulty }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const y = Math.sin(1.5 * difficulty * time + timeOffset) + 1.3;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.2, 0]}
        scale={[
          blockDimensions.width,
          blockDimensions.height,
          blockDimensions.length,
        ]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[4, 0.3, 3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

/**
 * BlockRamp
 */
export function BlockRamp({ position = [0, 0, 0], difficulty }) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.2, 0]}
        scale={[
          blockDimensions.width,
          blockDimensions.height,
          blockDimensions.length,
        ]}
        receiveShadow
      />
      <RigidBody type="kinematicPosition" restitution={0.2} friction={0}>
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          position={[0, 0.4, 0]}
          scale={[4, 0.3, 1.5]}
          rotation={[0.75, 0, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

/**
 * BlockSlidingWall
 */
export function BlockSlidingWall({ position = [0, 0, 0], difficulty }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(difficulty * 1.5 * time + timeOffset) * 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.2, 0]}
        scale={[
          blockDimensions.width,
          blockDimensions.height,
          blockDimensions.length,
        ]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.7, 1.8, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

/**
 * BlockDoubleSlidingWall
 */
export function BlockDoubleSlidingWall({ position = [0, 0, 0], difficulty }) {
  const wall1 = useRef();
  const wall2 = useRef();

  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x1 = Math.sin(difficulty * 2 * time + timeOffset) * 0.5 + 1;
    wall1.current.setNextKinematicTranslation({
      x: position[0] + x1,
      y: position[1] + 0.75,
      z: position[2],
    });

    const x2 = -Math.sin(difficulty * 2 * time + timeOffset) * 0.5 - 1;
    wall2.current.setNextKinematicTranslation({
      x: position[0] + x2,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.2, 0]}
        scale={[
          blockDimensions.width,
          blockDimensions.height,
          blockDimensions.length,
        ]}
        receiveShadow
      />
      <RigidBody
        ref={wall1}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1, 1.8, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
      <RigidBody
        ref={wall2}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1, 1.8, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

/**
 * BlockEnd
 */
export function BlockEnd({ position = [0, 0, 0] }) {
  const { end } = useGame();

  function onHit() {
    end();
  }

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.2, 0]}
        scale={[
          blockDimensions.width,
          blockDimensions.height,
          blockDimensions.length,
        ]}
        receiveShadow
      />
      <Float
        speed={25}
        rotationIntensity={0.25}
        floatIntensity={0.25}
        floatingRange={[-0.01, 0.01]}
      >
        <RigidBody
          type="fixed"
          colliders="trimesh"
          position={[0, 1.05, 0]}
          rotation={[0, Math.PI / 2, 0]}
          restitution={0.2}
          friction={0}
          onCollisionEnter={onHit}
        >
          <Star scale={0.012} />
        </RigidBody>
      </Float>
    </group>
  );
}
