/*
 *  Beachy Beachy Ball
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  ATTENTION! FREE SOFTWARE
 *  This website is free software (free as in freedom).
 *  If you use any part of this code, you must make your entire project's source code
 *  publicly available under the same license. This applies whether you modify the code
 *  or use it as it is in your own project. This ensures that all modifications and
 *  derivative works remain free software, so that everyone can benefit.
 *  If you are not willing to comply with these terms, you must refrain from using any part of this code.
 *
 *  For full license terms and conditions, you can read the AGPL-3.0 here:
 *  https://www.gnu.org/licenses/agpl-3.0.html
 */

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Star(props) {
  const { nodes, materials } = useGLTF('./models/star.glb');

  return (
    <group {...props} dispose={null}>
      <mesh
        name="pCylinder3"
        castShadow
        receiveShadow
        geometry={nodes.pCylinder3.geometry}
        material={materials.blinn2SG}
      />
    </group>
  );
}

useGLTF.preload('./models/star.glb');
