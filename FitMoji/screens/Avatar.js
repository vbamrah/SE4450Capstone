import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const mesh = useRef(null)
  const { nodes, materials } = useGLTF("./638d46f9c4f4a0d2de590c57.glb");
  return (
    <group {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="Wolf3D_Avatar"
        geometry={nodes.Wolf3D_Avatar.geometry}
        material={materials.Wolf3D_Avatar}
        skeleton={nodes.Wolf3D_Avatar.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences}
      />
    </group>
  )
}

useGLTF.preload("/638d46f9c4f4a0d2de590c57.glb");