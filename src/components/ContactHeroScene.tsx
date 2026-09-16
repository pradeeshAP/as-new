import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ContactHeroArt } from "./ContactHeroArt";
import styles from "./ContactHeroScene.module.css";

const GOLD = 0xc8974c;
const GOLD_SOFT = 0xe3c088;
const GOLD_DARK = 0xa97c38;

interface ContactHeroSceneProps {
  /** Skip the animation loop and pointer interaction, per prefers-reduced-motion. */
  reduced: boolean;
}

function detectWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
  } catch {
    return false;
  }
}

/** A flat triangular flap, hinged along its top edge — used for the envelope's flap-seam. */
function buildTriangleGeometry(
  a: [number, number, number],
  b: [number, number, number],
  c: [number, number, number],
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([...a, ...b, ...c]), 3));
  geometry.computeVertexNormals();
  return geometry;
}

/** Builds the envelope centerpiece — the classic closed-envelope silhouette (rectangle
 *  body + a flat triangular flap-seam meeting at a center point, like the site's own
 *  MailIcon). A gold wax seal sits where the flap points meet, and dark edge lines keep
 *  the shape crisp at a distance. Real depth (a box, not a flat plane) means it never
 *  goes edge-on-thin as it sways. */
function buildEnvelope(): THREE.Group {
  const group = new THREE.Group();
  const width = 2.6;
  const height = 1.7;
  const depth = 0.16;
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x1a140c, transparent: true, opacity: 0.55 });

  const bodyGeometry = new THREE.BoxGeometry(width, height, depth);
  const body = new THREE.Mesh(
    bodyGeometry,
    new THREE.MeshStandardMaterial({ color: GOLD_DARK, metalness: 0.35, roughness: 0.55 }),
  );
  body.add(new THREE.LineSegments(new THREE.EdgesGeometry(bodyGeometry), edgeMaterial));
  group.add(body);

  // Flap-seam: flat against the front face, corners at the top, meeting at the vertical
  // center — the fold line every envelope icon reads instantly.
  const hw = width / 2;
  const hh = height / 2;
  const flapGeometry = buildTriangleGeometry([-hw, hh, 0], [hw, hh, 0], [0, 0, 0]);
  const flap = new THREE.Mesh(
    flapGeometry,
    new THREE.MeshStandardMaterial({
      color: GOLD,
      metalness: 0.55,
      roughness: 0.3,
      emissive: GOLD,
      emissiveIntensity: 0.2,
      side: THREE.DoubleSide,
    }),
  );
  flap.position.z = depth / 2 + 0.01;
  flap.add(new THREE.LineSegments(new THREE.EdgesGeometry(flapGeometry), edgeMaterial));
  group.add(flap);

  // Wax seal, where the flap's fold lines converge — reinforces the "sealed letter" read.
  const seal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.06, 28),
    new THREE.MeshStandardMaterial({ color: GOLD_SOFT, metalness: 0.65, roughness: 0.2, emissive: GOLD, emissiveIntensity: 0.4 }),
  );
  seal.rotation.x = Math.PI / 2;
  seal.position.z = depth / 2 + 0.05;
  group.add(seal);

  return group;
}

/**
 * Self-contained WebGL scene for the Contact hero: a gold envelope, gently swaying in
 * light, with soft sparkle particles drifting around it — a simple, literal "you've got
 * a message" centerpiece in the site's gold/ink palette. Falls back to the flat SVG
 * illustration when WebGL is unavailable.
 */
export function ContactHeroScene({ reduced }: ContactHeroSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported] = useState(detectWebgl);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!supported || !wrap || !canvas) return;

    let width = wrap.clientWidth || 1;
    let height = wrap.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 7.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);

    // Shifted down and scaled so the envelope sits below the heading text rather than
    // directly behind it — the heading needs the upper portion of the frame clear.
    const root = new THREE.Group();
    root.position.y = -1.3;
    root.scale.setScalar(0.95);
    scene.add(root);

    // Lighting: a direction-independent hemisphere fill guarantees baseline visibility,
    // plus a warm key light for gold-foil specular highlights.
    scene.add(new THREE.HemisphereLight(GOLD_SOFT, 0x1a140c, 2.6));
    const keyLight = new THREE.PointLight(GOLD, 55, 30);
    keyLight.position.set(3.5, 3, 5.5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(GOLD_SOFT, 16, 30);
    rimLight.position.set(-4, -1.5, -3);
    scene.add(rimLight);

    // Centerpiece: the envelope, gently facing the camera with a slow idle sway.
    const envelopeGroup = new THREE.Group();
    root.add(envelopeGroup);
    envelopeGroup.add(buildEnvelope());

    // Sparse gold sparkle particles drifting in the background for depth — atmosphere
    // only, deliberately not connected into a "network" so the envelope stays the focus.
    const SPARKLE_COUNT = 22;
    const sparklePositions = new Float32Array(SPARKLE_COUNT * 3);
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const radius = 4.2 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4.5;
      sparklePositions.set(
        [Math.cos(theta) * radius, y, Math.sin(theta) * radius - 1.5],
        i * 3,
      );
    }
    const sparkleGeometry = new THREE.BufferGeometry();
    sparkleGeometry.setAttribute("position", new THREE.BufferAttribute(sparklePositions, 3));
    const sparkleMaterial = new THREE.PointsMaterial({
      color: GOLD_SOFT,
      size: 0.12,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    // Added to the scene directly (not `root`) so its full-height spread isn't shifted
    // down along with the envelope — it should cover the whole hero, top to bottom.
    const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
    scene.add(sparkles);

    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduced) window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const clock = new THREE.Clock();
    let rafId = 0;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      // Envelope: a slow, gentle sway rather than a full spin — it should read as a
      // still object catching the light, not a spinning logo.
      envelopeGroup.rotation.y = Math.sin(elapsed * 0.25) * 0.24;
      envelopeGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.06;

      sparkles.rotation.y = elapsed * 0.02;

      tilt.x += (pointer.y * 0.15 - tilt.x) * 0.04;
      tilt.y += (pointer.x * 0.2 - tilt.y) * 0.04;
      root.rotation.x = tilt.x;
      root.rotation.y = tilt.y;

      renderer.render(scene, camera);
    };

    const loop = () => {
      renderFrame();
      rafId = requestAnimationFrame(loop);
    };

    // Draw the first frame synchronously — don't wait on requestAnimationFrame, which
    // browsers can delay (e.g. while the tab is backgrounded), leaving the canvas blank.
    renderFrame();
    if (!reduced) rafId = requestAnimationFrame(loop);

    const handleVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const resizeObserver = new ResizeObserver(() => {
      if (!wrap) return;
      width = wrap.clientWidth || 1;
      height = wrap.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      if (reduced) renderFrame();
    });
    resizeObserver.observe(wrap);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver.disconnect();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
    };
  }, [supported, reduced]);

  if (!supported) return <ContactHeroArt />;

  return (
    <div className={styles.wrap} ref={wrapRef} aria-hidden="true">
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
}
