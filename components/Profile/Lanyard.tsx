/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Environment } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

const cardGLB = "/assets/lanyard/card.glb";
const lanyardTexture = "/assets/lanyard/lanyard.png";
const profilePic = "/assets/photos/pg.png";

extend({ MeshLineGeometry, MeshLineMaterial });

// Preload assets
useTexture.preload(lanyardTexture);
useTexture.preload(profilePic);
useGLTF.preload(cardGLB);

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  gravity = [0, -40, 0],
  fov = 30,
  transparent = true,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
        </Suspense>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyardTexture);
  const photo = useTexture(profilePic) as THREE.Texture & {
    image?: CanvasImageSource | HTMLImageElement;
  };

  const dynamicTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const drawCard = () => {
      ctx.fillStyle = "#0d0e5c";
      ctx.fillRect(0, 0, 1024, 1024);

      const drawX = 240;

      // Verified Badge
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.roundRect(drawX - 80, 80, 160, 40, 20);
      ctx.fill();
      ctx.fillStyle = "#00ffa3";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("VERIFIED", drawX, 108);

      // Profile Photo
      if (photo.image) {
        const size = 320;
        const yPos = 340;
        ctx.strokeStyle = "#00ffa3";
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.arc(drawX, yPos, size / 2 + 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.save();
        ctx.beginPath();
        ctx.arc(drawX, yPos, size / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(
          photo.image,
          drawX - size / 2,
          yPos - size / 2,
          size,
          size
        );
        ctx.restore();
      }

      // Info
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 55px Arial";
      ctx.fillText("ANJEF DANGOL", drawX, 600);

      ctx.fillStyle = "#00ffa3";
      ctx.font = "bold 30px monospace";
      ctx.fillText("FRONTEND DEVELOPER", drawX, 660);

      ctx.fillStyle = "#cccccc";
      ctx.font = "28px Arial";
      ctx.fillText("danjefff1001@gmail.com", drawX, 700);
      ctx.fillText("+977 9803506667", drawX, 730);
    };

    drawCard();

    const tex = new THREE.CanvasTexture(canvas);
    tex.flipY = false;
    tex.anisotropy = 16;

    // Redraw when photo finishes loading
    if (photo.image && !(photo.image as HTMLImageElement).complete) {
      (photo.image as HTMLImageElement).onload = () => {
        drawCard();
        tex.needsUpdate = true;
      };
    } else if (!photo.image) {
      const checkInterval = setInterval(() => {
        if (photo.image) {
          drawCard();
          tex.needsUpdate = true;
          clearInterval(checkInterval);
        }
      }, 100);
      setTimeout(() => clearInterval(checkInterval), 5000);
    }

    return tex;
  }, [photo]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 2.0, 0]]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }
    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current &&
      band.current
    ) {
      [j1, j2].forEach((ref) => {
        const r = ref.current;
        if (!r.lerped) r.lerped = new THREE.Vector3().copy(r.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, r.lerped.distanceTo(r.translation()))
        );
        r.lerped.lerp(
          r.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
        true
      );
    }
  });

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
          linearDamping={1}
          angularDamping={1}
        >
          <CuboidCollider args={[1.2, 1.6, 0.01]} />
          <group
            scale={3.2}
            position={[0, -1.8, -0.05]}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={dynamicTexture}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        {/* @ts-expect-error - meshline custom JSX element */}
        <meshLineGeometry />
        {/* @ts-expect-error - meshline custom JSX element */}
        <meshLineMaterial
          transparent
          map={texture}
          useMap
          repeat={[-4, 1]}
          lineWidth={1.4}
          color="white"
          depthTest={false}
        />
      </mesh>
    </>
  );
}