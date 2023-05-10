import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import useGame from "../../stores/useGame.js";
import Star from "./Star.jsx";
import Finished from "./Finished.jsx";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const beachMaterial = new THREE.MeshStandardMaterial({ color: "orange" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "tomato" });

export const blockDimensions = {
  width: 4.2,
  height: 0.2,
  length: 4,
};

export function BlockEmpty({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.1, 0]}
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

export function BlockSpinner({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [speed] = useState(
    () => (Math.random() + 1.5) * (Math.random() < 0.5 ? -1 : 1)
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
        position={[0, -0.1, 0]}
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

export function BlockDoubleSpinner({ position = [0, 0, 0] }) {
  const obstacle1 = useRef();
  const obstacle2 = useRef();

  const [speed] = useState(() => 2);

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
        position={[0, -0.1, 0]}
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

export function BlockLimbo({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const y = 1.1 * Math.sin(1.5 * time + timeOffset) + 1.3;
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
        position={[0, -0.1, 0]}
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
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockSlidingWall({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(1.5 * time + timeOffset) * 1.25;
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
        position={[0, -0.1, 0]}
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
          scale={[1.5, 1.8, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockEnd({ position = [0, 0, 0] }) {
  const end = useGame((state) => state.end);

  function onHit() {
    end();

    // hitSound.currentTime = 0
    // hitSound.volume = Math.random() * 0.1
    // hitSound.play()
  }

  return (
    <group position={position}>
      <Finished position={[0, 1, 0.5]} />
      <mesh
        geometry={boxGeometry}
        material={beachMaterial}
        position={[0, -0.1, 0]}
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