import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS (High-Res Textures) ---
const ASSETS = {
  sun: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/sun.jpg',
  mercury: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mercury.jpg',
  venus: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/venus_surface.jpg',
  venusAtmosphere: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/venus_atmosphere.jpg',
  earth: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
  earthSpec: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
  earthNormal: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
  earthClouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_2048.png',
  mars: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_color.jpg',
  marsNormal: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_normal.jpg',
  jupiter: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/jupiter_1k_color.jpg',
  saturn: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/saturn_1k_color.jpg',
  saturnRing: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/saturn_ring_alpha.png',
  uranus: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/uranus_color.jpg',
  neptune: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/neptune_1k_color.jpg',
  moon: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg'
};

// --- REAL WORLD DATA (Scaled) ---
// Scale: 1 unit = 1000 km (roughly) for radius, but distances are logarithmically compressed
// rotationSpeed: Relative to Earth (0.005). Jupiter is fast, Venus is slow/retrograde.
const PLANET_DATA = [
  { id: 'mercury', name: 'Mercury', radius: 2.4, distance: 60, speed: 0.04, rotationSpeed: 0.0001, angle: 0, tex: ASSETS.mercury, color: 0xA5A5A5, roughness: 0.9, tilt: 0.034, ecc: 0.205 },
  { id: 'venus', name: 'Venus', radius: 6.0, distance: 90, speed: 0.015, rotationSpeed: -0.0001, angle: 1.5, tex: ASSETS.venus, clouds: ASSETS.venusAtmosphere, color: 0xE3BB76, roughness: 0.5, tilt: 3.10, ecc: 0.0067 },
  { id: 'earth', name: 'Earth', radius: 6.3, distance: 130, speed: 0.01, rotationSpeed: 0.005, angle: 2.5, tex: ASSETS.earth, clouds: ASSETS.earthClouds, spec: ASSETS.earthSpec, normal: ASSETS.earthNormal, color: 0x2233FF, roughness: 0.6, hasMoon: true, tilt: 0.409, ecc: 0.0167 },
  { id: 'mars', name: 'Mars', radius: 3.3, distance: 170, speed: 0.008, rotationSpeed: 0.004, angle: 3.5, tex: ASSETS.mars, normal: ASSETS.marsNormal, color: 0xDC7D5A, roughness: 0.8, tilt: 0.437, ecc: 0.0934 },
  { id: 'jupiter', name: 'Jupiter', radius: 69.9, distance: 320, speed: 0.002, rotationSpeed: 0.012, angle: 4.5, tex: ASSETS.jupiter, color: 0xBCAB8B, roughness: 0.4, tilt: 0.054, ecc: 0.048, visualScale: 1.7 },
  { id: 'saturn', name: 'Saturn', radius: 58.2, distance: 500, speed: 0.0018, rotationSpeed: 0.011, angle: 5.5, tex: ASSETS.saturn, ring: ASSETS.saturnRing, color: 0xC5AB6E, roughness: 0.4, ringSize: 1.8, tilt: 0.466, ecc: 0.054, visualScale: 1.6 },
  { id: 'uranus', name: 'Uranus', radius: 25.3, distance: 700, speed: 0.001, rotationSpeed: -0.007, angle: 6.2, tex: ASSETS.uranus, color: 0x93B8BE, roughness: 0.5, tilt: 1.707, ecc: 0.047 },
  { id: 'neptune', name: 'Neptune', radius: 24.6, distance: 900, speed: 0.0009, rotationSpeed: 0.008, angle: 0.5, tex: ASSETS.neptune, color: 0x4B70DD, roughness: 0.5, tilt: 0.494, ecc: 0.009 }
];

// --- SHADERS ---
const AtmosphereShader = {
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    uniform vec3 color;
    void main() {
      float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
      gl_FragColor = vec4(color, 1.0) * intensity * 1.5;
    }
  `
};

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // 1. Scene Setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 30000);
      
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: false,
        logarithmicDepthBuffer: false,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;
      (renderer as any).physicallyCorrectLights = true;
      containerRef.current!.appendChild(renderer.domElement);

      const textureLoader = new THREE.TextureLoader();
      
      // Helper to load texture with fallback
      const loadTexture = (url: string) => {
        return textureLoader.load(url, (tex) => {
          (tex as any).colorSpace = (THREE as any).SRGBColorSpace;
          tex.anisotropy = (renderer.capabilities as any).getMaxAnisotropy?.() || 8;
          tex.wrapS = THREE.ClampToEdgeWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.minFilter = THREE.LinearMipMapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
        }, undefined, (err) => {
          console.error(`Failed to load texture: ${url}`, err);
        });
      };

      textureLoader.setCrossOrigin('anonymous');

      // 2. Starfield
      const starGroup = new THREE.Group();
      scene.add(starGroup);
      const starCount = 5000;
      const starGeom = new THREE.BufferGeometry();
      const starPos = new Float32Array(starCount * 3);
      for(let i=0; i<starCount; i++) {
        const r = 3000 + Math.random() * 3000;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        starPos[i*3] = r * Math.sin(phi) * Math.cos(theta);
        starPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        starPos[i*3+2] = r * Math.cos(phi);
      }
      starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 3, transparent: true, opacity: 0.8 });
      const stars = new THREE.Points(starGeom, starMat);
      starGroup.add(stars);

      // 3. Sun (Center)
      const sunGroup = new THREE.Group();
      scene.add(sunGroup);
      
      const sunGeom = new THREE.SphereGeometry(40, 64, 64); // Larger Sun
      // Use MeshBasicMaterial with bright color to ensure it's never black
      const sunMat = new THREE.MeshBasicMaterial({ 
        map: loadTexture(ASSETS.sun),
        color: 0xffdd55,
        toneMapped: false,
        transparent: true,
        depthWrite: false
      });
      const sunMesh = new THREE.Mesh(sunGeom, sunMat);
      sunMesh.castShadow = false; 
      sunMesh.receiveShadow = false;
      sunGroup.add(sunMesh);

      // Sun Glow (Emissive Sprite)
      const glowMat = new THREE.SpriteMaterial({ 
        map: new THREE.CanvasTexture(generateGlowTexture()), 
        color: 0xffbb33,
        transparent: true, 
        blending: THREE.AdditiveBlending,
        opacity: 1.0
      });
      const sunGlow = new THREE.Sprite(glowMat);
      sunGlow.scale.setScalar(200); // Much larger glow
      sunGroup.add(sunGlow);

      // Sun Light
      const sunLight = new THREE.PointLight(0xffffff, 3.0, 0, 0); 
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 4096;
      sunLight.shadow.mapSize.height = 4096;
      sunLight.shadow.bias = -0.0001; // Reduced bias
      sunGroup.add(sunLight);
      
      // Ambient Light (Global Illumination) - Bright White for safety
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); 
      scene.add(ambientLight);
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x202034, 0.6);
      scene.add(hemiLight);

      // Camera Headlight (Always illuminates the front of the planet)
      const camLight = new THREE.PointLight(0xffffff, 0.8, 0, 0);
      camera.add(camLight);
      scene.add(camera); // Add camera to scene so light works

      // 4. Planets & Orbits
      const planets: Record<string, THREE.Object3D> = {};
      const sphereGeom = new THREE.SphereGeometry(1, 64, 64);
      const interactiveMeshes: THREE.Mesh[] = [];

      PLANET_DATA.forEach(data => {
        // Orbit Ring
        const orbitCurve = new THREE.EllipseCurve(0, 0, data.distance, data.distance, 0, 2 * Math.PI, false, 0);
        const orbitPoints = orbitCurve.getPoints(128);
        const orbitGeom = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }); 
        const orbitLine = new THREE.Line(orbitGeom, orbitMat);
        orbitLine.rotation.x = Math.PI / 2;
        scene.add(orbitLine);

        // Planet Group
        const planetGroup = new THREE.Group();
        const x = Math.cos(data.angle) * data.distance;
        const z = Math.sin(data.angle) * data.distance;
        planetGroup.position.set(x, 0, z);
        
        scene.add(planetGroup);
        planets[data.id] = planetGroup;
        (planetGroup as any).ecc = (data as any).ecc || 0;
        (planetGroup as any).baseAngle = data.angle;
        (planetGroup as any).distance = data.distance;

        // Planet Mesh
        const mat = new THREE.MeshStandardMaterial({
          map: loadTexture(data.tex),
          normalMap: (data as any).normal ? loadTexture((data as any).normal) : null,
          roughness: (data as any).roughness ?? 0.7,
          metalness: 0.0, 
          emissive: new THREE.Color((data as any).color || 0x000000), 
          emissiveIntensity: 0.12
        });
        const mesh = new THREE.Mesh(sphereGeom, mat);
        const vScale = (data as any).visualScale ?? 2.5;
        mesh.scale.setScalar(data.radius * vScale); 
        mesh.rotation.z = (data as any).tilt || 0;
        mesh.castShadow = true;
        mesh.receiveShadow = false; // PREVENT SELF-SHADOW ARTIFACTS
        planetGroup.add(mesh);
        (planetGroup as any).mesh = mesh;
        (mesh as any).userData = { id: data.id, name: data.name };
        interactiveMeshes.push(mesh);

        // Clouds (Earth/Venus)
        if (data.clouds) {
          const cloudMat = new THREE.MeshLambertMaterial({ // Lambert is brighter/simpler
            map: loadTexture(data.clouds),
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          });
          const clouds = new THREE.Mesh(sphereGeom, cloudMat);
          const vScale = (data as any).visualScale ?? 2.5;
          clouds.scale.setScalar(data.radius * vScale * 1.02);
          planetGroup.add(clouds);
          (planetGroup as any).clouds = clouds;
        }

        // Rings (Saturn)
        if (data.ring) {
          const vScale = (data as any).visualScale ?? 2.5;
          const ringGeom = new THREE.RingGeometry(data.radius * vScale * 1.4, data.radius * vScale * 2.5, 64);
          const uvs = ringGeom.attributes.uv;
          const v3 = new THREE.Vector3();
          for (let i = 0; i < uvs.count; i++) {
            v3.fromBufferAttribute(ringGeom.attributes.position, i);
            uvs.setXY(i, (v3.length() - data.radius * vScale * 1.4) / (data.radius * vScale * 1.1), 0.5);
          }
          const ringMat = new THREE.MeshStandardMaterial({
            map: loadTexture(data.ring),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
            color: 0xffffff,
            roughness: 0.8,
            metalness: 0
          });
          const ring = new THREE.Mesh(ringGeom, ringMat);
          ring.rotation.x = -Math.PI / 2 + 0.3;
          ring.castShadow = true;
          ring.receiveShadow = false;
          planetGroup.add(ring);
          (planetGroup as any).ring = ring;
          const ringInner = new THREE.Mesh(
            new THREE.RingGeometry(data.radius * vScale * 1.2, data.radius * vScale * 1.35, 64),
            new THREE.MeshStandardMaterial({ color: 0xcab27a, transparent: true, opacity: 0.35, roughness: 0.9 })
          );
          ringInner.rotation.x = ring.rotation.x;
          planetGroup.add(ringInner);
          const ringOuter = new THREE.Mesh(
            new THREE.RingGeometry(data.radius * vScale * 2.55, data.radius * vScale * 2.8, 64),
            new THREE.MeshStandardMaterial({ color: 0xbda476, transparent: true, opacity: 0.25, roughness: 0.9 })
          );
          ringOuter.rotation.x = ring.rotation.x;
          planetGroup.add(ringOuter);
        }

        // Moon
        if (data.hasMoon) {
            const moonGroup = new THREE.Group();
            const vScale = (data as any).visualScale ?? 2.5;
            moonGroup.position.set(data.radius * vScale * 3, 0, 0);
            planetGroup.add(moonGroup);
            
            const moonMat = new THREE.MeshStandardMaterial({
                map: loadTexture(ASSETS.moon),
                roughness: 0.9,
                metalness: 0
            });
            const moon = new THREE.Mesh(sphereGeom, moonMat);
            moon.scale.setScalar(data.radius * vScale * 0.27);
            moon.castShadow = true;
            moon.receiveShadow = true;
            moonGroup.add(moon);
            (planetGroup as any).moonGroup = moonGroup;
        }
      });

      // 5. Camera Animation Logic
      const getSmartCameraOffset = (planetId: string, planetPos: THREE.Vector3, type: 'close' | 'superClose' | 'wide' = 'close') => {
        const meta = PLANET_DATA.find(p => p.id === planetId)!;
        const vScale = (meta as any).visualScale ?? 2.5;
        const scaledRadius = meta.radius * vScale;
        const fov = camera.fov * Math.PI / 180;
        let coverage = type === 'superClose' ? 0.6 : type === 'close' ? 0.4 : 0.25;
        if (planetId === 'jupiter' || planetId === 'saturn') {
          coverage = type === 'superClose' ? 0.5 : type === 'close' ? 0.35 : 0.22;
        }
        const dist = (scaledRadius / Math.tan(fov / 2)) * (1 / coverage);
        const toSun = new THREE.Vector3(0, 0, 0).sub(planetPos).normalize();
        const angle = type === 'superClose' ? Math.PI / 5 : Math.PI / 6;
        const offsetDir = toSun.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), angle); 
        const elevation = type === 'superClose' ? scaledRadius * 0.2 : scaledRadius * 0.5;
        return offsetDir.multiplyScalar(dist).add(new THREE.Vector3(0, elevation, 0));
      };

      // Initial Position (Hero - Sun)
      const sunView = { 
          pos: new THREE.Vector3(60, 20, 60), // Closer to Sun for start
          target: new THREE.Vector3(0, 0, 0) 
      };
      camera.position.copy(sunView.pos);
      camera.lookAt(sunView.target);
      
      // State for Camera
      const camState = { 
          px: sunView.pos.x, py: sunView.pos.y, pz: sunView.pos.z,
          tx: sunView.target.x, ty: sunView.target.y, tz: sunView.target.z
      };

      const lastPos = new THREE.Vector3().copy(sunView.pos);
      const lastTarget = new THREE.Vector3().copy(sunView.target);
      const updateCamera = () => {
          const speed = Math.abs(((ScrollTrigger as any).getVelocity?.() || 0));
          const alpha = 0.25 + Math.min(speed * 0.0003, 0.35);
          lastPos.lerp(new THREE.Vector3(camState.px, camState.py, camState.pz), alpha);
          lastTarget.lerp(new THREE.Vector3(camState.tx, camState.ty, camState.tz), alpha);
          camera.position.copy(lastPos);
          camera.lookAt(lastTarget);
      };

      // Fly to a planet (Transition via Spacer)
      const registerFlyTo = (planetId: string, triggerId: string) => {
          const planet = planets[planetId];
          if(!planet) return;
          
          // Destination: "Close" view (Arrival)
          const offset = getSmartCameraOffset(planetId, planet.position, 'close');
          const finalPos = planet.position.clone().add(offset);
          const finalTarget = planet.position.clone();

          gsap.to(camState, {
              px: finalPos.x, py: finalPos.y, pz: finalPos.z,
              tx: finalTarget.x, ty: finalTarget.y, tz: finalTarget.z,
              ease: "none", 
              scrollTrigger: {
                  trigger: triggerId,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.2,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
              },
              immediateRender: false,
              overwrite: "auto",
              onUpdate: updateCamera
          });
      };

      // Explore a planet (Zoom/Orbit while reading Section)
      const registerExploration = (planetId: string, triggerId: string) => {
        const planet = planets[planetId];
        if(!planet) return;
        
        // Destination: "SuperClose" view (Deep reading mode)
        const offset = getSmartCameraOffset(planetId, planet.position, 'superClose');
        const finalPos = planet.position.clone().add(offset);
        const finalTarget = planet.position.clone(); // Keep looking at planet center

        gsap.to(camState, {
            px: finalPos.x, py: finalPos.y, pz: finalPos.z,
            tx: finalTarget.x, ty: finalTarget.y, tz: finalTarget.z,
            ease: "none",
            scrollTrigger: {
                trigger: triggerId,
                start: "top center",
                end: "bottom center",
                scrub: 0.2,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
            immediateRender: false,
            overwrite: "auto",
            onUpdate: updateCamera
        });
        gsap.to(camera, {
          fov: 42,
          ease: "none",
          scrollTrigger: {
            trigger: triggerId,
            start: "top center",
            end: "bottom center",
            scrub: 0.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          onUpdate: () => camera.updateProjectionMatrix()
        });
      };

      // --- REGISTER SCROLL TRIGGERS ---
      // 1. Hero -> About (Sun -> Earth)
      registerFlyTo('earth', '#spacer-hero-about');
      registerExploration('earth', '#about'); // Zoom in while reading About

      // 2. About -> Skills (Earth -> Mars)
      registerFlyTo('mars', '#spacer-about-skills');
      registerExploration('mars', '#skills'); // Zoom in while reading Skills

      // 3. Skills -> Projects (Mars -> Jupiter)
      registerFlyTo('jupiter', '#spacer-skills-projects');
      registerExploration('jupiter', '#projects'); // Zoom in while reading Projects

      // 4. Projects -> Saturn (Jupiter -> Saturn)
      // Saturn is unique as it is inside a spacer-like div, but we treat it as a destination
      registerFlyTo('saturn', '#projects-saturn'); 
      const registerOrbitAround = (planetId: string, triggerId: string) => {
        const planet = planets[planetId];
        if (!planet) return;
        const state = { a: 0 };
        const baseRadius = PLANET_DATA.find(p => p.id === planetId)!.radius;
        const scaledRadius = baseRadius * 2.5;
        const orbitR = scaledRadius * 3.2;
        gsap.to(state, {
          a: Math.PI * 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: triggerId,
            start: "top top",
            end: "bottom bottom",
            scrub: 1
          },
          onUpdate: () => {
            const center = (planet as any).position.clone();
            const toSun = new THREE.Vector3(0, 0, 0).sub(center).normalize();
            const dir = toSun.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), state.a);
            const elevation = scaledRadius * 0.4;
            const pos = center.clone().add(dir.multiplyScalar(orbitR)).add(new THREE.Vector3(0, elevation, 0));
            camState.px = pos.x; camState.py = pos.y; camState.pz = pos.z;
            camState.tx = center.x; camState.ty = center.y; camState.tz = center.z;
            updateCamera();
          }
        });
      };
      registerOrbitAround('saturn', '#projects-saturn');
      
      // 5. Saturn -> Contact (Saturn -> Neptune)
      registerFlyTo('neptune', '#spacer-saturn-contact');
      registerExploration('neptune', '#contact'); // Zoom in while reading Contact


      // 6. Animation Loop
      let frameId: number;
      const scrollVel = { v: 0 };
      const updateVelocity = () => {
        const v = (ScrollTrigger as any).getVelocity?.() || 0;
        gsap.to(scrollVel, { v, duration: 0.2, overwrite: true });
      };
      window.addEventListener('scroll', updateVelocity, { passive: true });
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const tempVec = new THREE.Vector3();
      const hoverEl = document.createElement('div');
      hoverEl.style.position = 'fixed';
      hoverEl.style.padding = '6px 10px';
      hoverEl.style.background = 'rgba(0,0,0,0.7)';
      hoverEl.style.border = '1px solid rgba(255,255,255,0.2)';
      hoverEl.style.borderRadius = '8px';
      hoverEl.style.color = '#fff';
      hoverEl.style.fontFamily = 'monospace';
      hoverEl.style.fontSize = '12px';
      hoverEl.style.pointerEvents = 'none';
      hoverEl.style.transform = 'translate(-50%,-120%)';
      hoverEl.style.display = 'none';
      hoverEl.style.zIndex = '9999';
      document.body.appendChild(hoverEl);
      const handleMouseMove = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(interactiveMeshes, false);
        if (hits.length > 0) {
          const obj = hits[0].object as THREE.Mesh;
          obj.getWorldPosition(tempVec);
          tempVec.project(camera);
          const sx = (tempVec.x * 0.5 + 0.5) * window.innerWidth;
          const sy = (-tempVec.y * 0.5 + 0.5) * window.innerHeight;
          hoverEl.textContent = (obj.userData as any).name || '';
          hoverEl.style.left = `${sx}px`;
          hoverEl.style.top = `${sy}px`;
          hoverEl.style.display = 'block';
        } else {
          hoverEl.style.display = 'none';
        }
      };
      window.addEventListener('mousemove', handleMouseMove);
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        
        // Parallax starfield toward camera movement
        starGroup.position.x = camera.position.x * 0.02;
        starGroup.position.y = camera.position.y * 0.02;
        starGroup.position.z = camera.position.z * 0.02;

        // Rotate Sun
        sunMesh.rotation.y += 0.002;
        sunGlow.rotation.z -= 0.001;

        // Rotate Planets
        const t = performance.now() * 0.00005;
        PLANET_DATA.forEach(data => {
            const grp = planets[data.id];
            if (grp) {
                const rotSpeed = (data as any).rotationSpeed || 0.005;
                (grp as any).mesh.rotation.y += rotSpeed;
                if ((grp as any).clouds) (grp as any).clouds.rotation.y += rotSpeed * 1.15;
                if ((grp as any).moonGroup) {
                    (grp as any).moonGroup.rotation.y += 0.005; 
                }
                const a = (grp as any).distance;
                const e = (grp as any).ecc;
                const b = a * (1 - e);
                const ang = (grp as any).baseAngle + t * data.speed;
                grp.position.set(Math.cos(ang) * a, 0, Math.sin(ang) * b);
                if ((grp as any).ring) {
                  (grp as any).ring.rotation.z += 0.0004;
                }
            }
        });

        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', updateVelocity);
        window.removeEventListener('mousemove', handleMouseMove);
        if (hoverEl && hoverEl.parentElement) hoverEl.parentElement.removeChild(hoverEl);
        renderer.dispose();
      };
    });
    return () => ctx.revert();
  }, []);

  function generateGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d')!;
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 200, 100, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    return canvas;
  }

  return <div ref={containerRef} className="fixed inset-0 z-0 bg-black pointer-events-none" />;
};

export default AnimatedBackground;
