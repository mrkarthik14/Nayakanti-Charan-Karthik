import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const themeRefs = useRef<{
    matteOffWhite?: THREE.MeshStandardMaterial;
    particleMaterial?: THREE.PointsMaterial;
    ambientLight?: THREE.AmbientLight;
    keyLight?: THREE.DirectionalLight;
  }>({});

  useEffect(() => {
    if (themeRefs.current.matteOffWhite) {
      themeRefs.current.matteOffWhite.color.set(isDark ? 0xdedcd6 : 0x222222);
    }
    if (themeRefs.current.particleMaterial) {
      themeRefs.current.particleMaterial.color.set(isDark ? 0xf2f0ec : 0x222222);
      themeRefs.current.particleMaterial.opacity = isDark ? 0.35 : 0.25;
    }
    if (themeRefs.current.ambientLight) {
      themeRefs.current.ambientLight.intensity = isDark ? 0.7 : 0.9;
    }
    if (themeRefs.current.keyLight) {
      themeRefs.current.keyLight.color.set(isDark ? 0xf2f0ec : 0xffffff);
    }
  }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Studio Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 0.9);
    scene.add(ambientLight);

    // Key studio light (cool neutral)
    const keyLight = new THREE.DirectionalLight(isDark ? 0xf2f0ec : 0xffffff, 1.8);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    // Soft fill light
    const fillLight = new THREE.DirectionalLight(0x8a8a8a, 0.9);
    fillLight.position.set(-10, -6, -6);
    scene.add(fillLight);

    // Orange structural rim light (accent #E8500A)
    const orangeRimLight = new THREE.PointLight(0xe8500a, 2.5, 20);
    orangeRimLight.position.set(4, -3, 6);
    scene.add(orangeRimLight);

    // Architectural Matte Materials
    const matteOffWhite = new THREE.MeshStandardMaterial({
      color: isDark ? 0xdedcd6 : 0x222222,
      roughness: 0.35,
      metalness: 0.05,
      flatShading: false
    });

    const matteDarkGraphite = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.6,
      metalness: 0.2
    });

    const saturatedOrangeAccent = new THREE.MeshStandardMaterial({
      color: 0xe8500a,
      roughness: 0.25,
      metalness: 0.1
    });

    // Store references for dynamic theme updates
    themeRefs.current = {
      matteOffWhite,
      ambientLight,
      keyLight
    };

    // Root cluster group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central Architectural Geometric NCK Monogram
    const centralStack = new THREE.Group();

    // 'C' Enclosure Top Lintel (Matte body)
    const cTopGeom = new THREE.BoxGeometry(4.2, 0.65, 0.75);
    const cTop = new THREE.Mesh(cTopGeom, matteOffWhite);
    cTop.position.set(0.1, 2.1, 0);
    centralStack.add(cTop);

    // 'C' Enclosure Bottom Foundation (Matte body)
    const cBottomGeom = new THREE.BoxGeometry(4.2, 0.65, 0.75);
    const cBottom = new THREE.Mesh(cBottomGeom, matteOffWhite);
    cBottom.position.set(0.1, -2.1, 0);
    centralStack.add(cBottom);

    // Left vertical spine (Shared N / C primary architectural column)
    const leftPillarGeom = new THREE.BoxGeometry(0.75, 4.85, 0.75);
    const leftPillar = new THREE.Mesh(leftPillarGeom, matteOffWhite);
    leftPillar.position.set(-1.65, 0, 0);
    centralStack.add(leftPillar);

    // 'N' Diagonal Cross Traverse (Angled cross-brace)
    const diagGeom = new THREE.BoxGeometry(0.68, 4.6, 0.7);
    const diagBeam = new THREE.Mesh(diagGeom, matteOffWhite);
    diagBeam.rotation.z = -Math.PI / 4.2;
    diagBeam.position.set(-0.4, 0, 0.1);
    centralStack.add(diagBeam);

    // Central Structural Junction Spine
    const centerSpineGeom = new THREE.BoxGeometry(0.7, 3.5, 0.7);
    const centerSpine = new THREE.Mesh(centerSpineGeom, matteDarkGraphite);
    centerSpine.position.set(0.65, 0, 0);
    centralStack.add(centerSpine);

    // 'K' Upper Branch - Saturated Orange Accent (#E8500A)
    const kUpperGeom = new THREE.BoxGeometry(0.72, 2.8, 0.8);
    const kUpper = new THREE.Mesh(kUpperGeom, saturatedOrangeAccent);
    kUpper.position.set(1.65, 1.05, 0.35);
    kUpper.rotation.z = Math.PI / 4.0;
    centralStack.add(kUpper);

    // 'K' Lower Branch - Saturated Orange Accent (#E8500A)
    const kLowerGeom = new THREE.BoxGeometry(0.72, 2.8, 0.8);
    const kLower = new THREE.Mesh(kLowerGeom, saturatedOrangeAccent);
    kLower.position.set(1.65, -1.05, 0.35);
    kLower.rotation.z = -Math.PI / 4.0;
    centralStack.add(kLower);

    // Modular architectural base slices
    for (let i = 0; i < 3; i++) {
      const sliceGeom = new THREE.BoxGeometry(4.8 - i * 0.5, 0.1, 2.2 - i * 0.3);
      const sliceMesh = new THREE.Mesh(sliceGeom, i === 1 ? saturatedOrangeAccent : matteDarkGraphite);
      sliceMesh.position.set(0, -2.6 - i * 0.3, -0.5);
      centralStack.add(sliceMesh);
    }

    // Top cantilevered datum block
    const datumGeom = new THREE.BoxGeometry(2.4, 0.2, 1.8);
    const topDatum = new THREE.Mesh(datumGeom, matteOffWhite);
    topDatum.position.set(-0.8, 2.5, -0.5);
    centralStack.add(topDatum);

    rootGroup.add(centralStack);

    // 2. Surrounding Engineered Nodes & Floating Thin Data Lines
    const nodesGroup = new THREE.Group();
    const nodeGeom = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const nodeCoords: [number, number, number][] = [
      [-4.5, 3.2, 1.5],
      [4.2, 2.8, -1.8],
      [-3.8, -2.9, -1.2],
      [5.1, -2.1, 2.2],
      [-2.6, 4.1, -2.5],
      [3.4, 4.3, 0.8],
      [0, -4.2, 1.8]
    ];

    nodeCoords.forEach((pos, idx) => {
      const nodeMesh = new THREE.Mesh(
        nodeGeom,
        idx % 2 === 0 ? saturatedOrangeAccent : matteOffWhite
      );
      nodeMesh.position.set(...pos);
      nodesGroup.add(nodeMesh);
    });

    // Connecting thin technical lines (Data paths)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x8a8a8a,
      transparent: true,
      opacity: 0.22
    });

    const linePoints: THREE.Vector3[] = [];
    nodeCoords.forEach(pos => {
      linePoints.push(new THREE.Vector3(pos[0], pos[1], pos[2]));
      linePoints.push(new THREE.Vector3(0, 0, 0)); // connects to center
    });

    const linesGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineSegments = new THREE.LineSegments(linesGeom, lineMat);
    nodesGroup.add(lineSegments);

    rootGroup.add(nodesGroup);

    // 3. Subtle floating particles (Data points)
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 22;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: isDark ? 0xf2f0ec : 0x222222,
      size: 0.045,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25
    });
    themeRefs.current.particleMaterial = particleMaterial;

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Position offset to frame the hero composition nicely behind and beside the portrait
    rootGroup.position.set(3.4, 0, -2.5);
    rootGroup.scale.set(0.85, 0.85, 0.85);
    rootGroup.rotation.y = -0.35;
    rootGroup.rotation.x = 0.15;

    // Interactive mouse movement tracker
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.15;
    let targetRotationY = -0.35;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;

      // Object moves subtly in opposite direction
      targetRotationY = -0.35 - mouseX * 0.25;
      targetRotationX = 0.15 - mouseY * 0.2;
    };

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
      // Controlled depth shift on scroll: object moves deeper into background
      camera.position.z = 14 + (scrollY * 0.005);
      camera.position.y = -(scrollY * 0.003);
      if (rootGroup) {
        // Move backward and settle as user scrolls past hero
        rootGroup.position.z = -2.5 - Math.min(scrollY * 0.006, 6);
        rootGroup.rotation.y = -0.35 + (scrollY * 0.0004);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop (60fps target)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // Smooth spring-like lerp to mouse targets
        rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.05;
        rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.05;

        // Continuous subtle architectural rotation & float
        centralStack.rotation.y = Math.sin(elapsedTime * 0.35) * 0.08;
        nodesGroup.rotation.y = elapsedTime * 0.04;
        nodesGroup.rotation.x = Math.cos(elapsedTime * 0.25) * 0.05;

        // Micro particle drift
        particles.rotation.y = elapsedTime * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cTopGeom.dispose();
      cBottomGeom.dispose();
      leftPillarGeom.dispose();
      diagGeom.dispose();
      centerSpineGeom.dispose();
      kUpperGeom.dispose();
      kLowerGeom.dispose();
      datumGeom.dispose();
      particleGeometry.dispose();
      matteOffWhite.dispose();
      matteDarkGraphite.dispose();
      saturatedOrangeAccent.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
};
