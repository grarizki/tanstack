import { useEffect, useRef } from "react";
import { useTheme } from "../../lib/theme";
import * as THREE from "three";
import { gsap } from "gsap";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const auroraVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auroraFragmentShader = `
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uIntensity;
  uniform float uDark;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // TODO(human): Implement fbm (fractional brownian motion) below.
  // Replace the placeholder with a loop that accumulates noise(p) across
  // multiple octaves: each iteration, halve the amplitude and double the
  // frequency by multiplying p by 2.0 and shifting it (e.g. p * 2.0 + vec2(1.7, 9.2)).
  // 5 octaves gives a good balance of detail vs performance.
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = p * 2.0 + vec2(1.7, 9.2);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse * 0.06;
    float t = uTime * 0.12;

    vec2 p1 = uv * 2.5 + vec2(t * 0.25, t * 0.08) + mouse;
    float n1 = fbm(p1);

    vec2 p2 = uv * 5.0 + vec2(-t * 0.18, t * 0.12) - mouse * 0.5;
    float n2 = fbm(p2 + vec2(n1 * 0.6));

    vec2 p3 = uv * 10.0 + vec2(t * 0.08, -t * 0.06);
    float n3 = fbm(p3 + vec2(n2 * 0.4));

    float pattern = n1 * 0.5 + n2 * 0.35 + n3 * 0.15;

    float aurora = sin(uv.y * 6.0 + pattern * 5.0 + t * 2.0) * 0.5 + 0.5;
    aurora *= smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.55, uv.y);
    aurora = pow(aurora, 1.5);

    float streak = sin((uv.x - uv.y * 0.3) * 12.0 + pattern * 3.0 + t * 1.5) * 0.5 + 0.5;
    streak = pow(streak, 4.0) * 0.3;

    vec3 color = mix(uColor1, uColor2, pattern);
    color = mix(color, uColor3, aurora * 0.6 + streak * 0.3);

    float brightness = pattern * 0.35 + aurora * 0.45 + streak * 0.2;
    color *= brightness * uIntensity;

    float vignette = length((uv - 0.5) * vec2(1.2, 1.0));
    color *= 1.0 - smoothstep(0.3, 0.9, vignette);

    float alpha = brightness * (uDark > 0.5 ? 0.9 : 0.55);
    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  }
`;

const particleVertexShader = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    float pulse = sin(uTime * 1.2 + aPhase) * 0.5 + 0.5;
    vAlpha = pulse * 0.5;
    gl_PointSize = aSize * 4.0 * (0.4 + pulse * 0.6);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const particleFragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float circle = 1.0 - smoothstep(0.4, 1.0, d);
    gl_FragColor = vec4(uColor, circle * vAlpha);
  }
`;

const COLORS = {
	color1: new THREE.Color(0x10b981),
	color2: new THREE.Color(0x059669),
	color3: new THREE.Color(0x34d399),
	particleColor: new THREE.Color(0x10b981),
	intensity: 1.4,
	bloomStrength: 0.6,
	bloomRadius: 0.5,
};

function getThemeColors(_isDark: boolean) {
	return COLORS;
}

export default function ThreeDitherBackground() {
	const { theme } = useTheme();
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		renderer: THREE.WebGLRenderer;
		composer: EffectComposer;
		bloomPass: UnrealBloomPass;
		auroraUniforms: Record<string, THREE.IUniform>;
		particleUniforms: Record<string, THREE.IUniform>;
		clock: THREE.Timer;
		animId: number;
		disposed: boolean;
	} | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Theme changes handled by separate effect
	useEffect(() => {
		if (!containerRef.current) return;
		if (window.innerWidth <= 768) return;

		// Respect prefers-reduced-motion — skip the entire Three.js scene (issue #1)
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const container = containerRef.current;
		while (container.firstChild) container.removeChild(container.firstChild);

		const isDark = theme === "dark";
		const colors = getThemeColors(isDark);

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
		camera.position.z = 1;

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = isDark ? 1.2 : 1.0;
		container.appendChild(renderer.domElement);

		const composer = new EffectComposer(renderer);
		composer.addPass(new RenderPass(scene, camera));
		const bloomPass = new UnrealBloomPass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			colors.bloomStrength,
			colors.bloomRadius,
			0.6,
		);
		composer.addPass(bloomPass);

		// Aurora full-screen quad
		const auroraUniforms: Record<string, THREE.IUniform> = {
			uTime: { value: 0 },
			uMouse: { value: new THREE.Vector2(0, 0) },
			uColor1: { value: colors.color1.clone() },
			uColor2: { value: colors.color2.clone() },
			uColor3: { value: colors.color3.clone() },
			uIntensity: { value: colors.intensity },
			uDark: { value: isDark ? 1.0 : 0.0 },
		};
		const auroraMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(2, 2),
			new THREE.ShaderMaterial({
				vertexShader: auroraVertexShader,
				fragmentShader: auroraFragmentShader,
				uniforms: auroraUniforms,
				transparent: true,
				depthWrite: false,
			}),
		);
		scene.add(auroraMesh);

		// Floating particles
		const COUNT = 150;
		const positions = new Float32Array(COUNT * 3);
		const sizes = new Float32Array(COUNT);
		const phases = new Float32Array(COUNT);

		for (let i = 0; i < COUNT; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 2;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
			positions[i * 3 + 2] = -0.05;
			sizes[i] = 0.5 + Math.random() * 1.5;
			phases[i] = Math.random() * Math.PI * 2;
		}

		const particleGeo = new THREE.BufferGeometry();
		particleGeo.setAttribute(
			"position",
			new THREE.BufferAttribute(positions, 3),
		);
		particleGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
		particleGeo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

		const particleUniforms: Record<string, THREE.IUniform> = {
			uTime: { value: 0 },
			uColor: { value: colors.particleColor.clone() },
		};

		const particleMesh = new THREE.Points(
			particleGeo,
			new THREE.ShaderMaterial({
				vertexShader: particleVertexShader,
				fragmentShader: particleFragmentShader,
				uniforms: particleUniforms,
				transparent: true,
				blending: THREE.AdditiveBlending,
				depthWrite: false,
			}),
		);
		scene.add(particleMesh);

		const clock = new THREE.Timer();
		const sceneState = {
			renderer,
			composer,
			bloomPass,
			auroraUniforms,
			particleUniforms,
			clock,
			animId: 0,
			disposed: false,
		};
		sceneRef.current = sceneState;

		const handleMouse = (e: MouseEvent) => {
			const x = (e.clientX / window.innerWidth) * 2 - 1;
			const y = -(e.clientY / window.innerHeight) * 2 + 1;
			gsap.to(auroraUniforms.uMouse.value, {
				x,
				y,
				duration: 2.5,
				ease: "power2.out",
			});
		};
		window.addEventListener("mousemove", handleMouse);

		const animate = (timestamp: number) => {
			if (sceneState.disposed) return;
			sceneState.animId = requestAnimationFrame(animate);
			clock.update(timestamp);
			const t = clock.getElapsed();
			auroraUniforms.uTime.value = t;
			particleUniforms.uTime.value = t;
			composer.render();
		};
		animate(0);

		// Pause animation when tab is hidden to save battery (issue #12)
		const handleVisibility = () => {
			if (document.hidden) {
				cancelAnimationFrame(sceneState.animId);
			} else if (!sceneState.disposed) {
				animate(performance.now());
			}
		};
		document.addEventListener("visibilitychange", handleVisibility);

		const handleResize = () => {
			if (window.innerWidth <= 768) {
				container.style.display = "none";
				return;
			}
			container.style.display = "";
			renderer.setSize(window.innerWidth, window.innerHeight);
			composer.setSize(window.innerWidth, window.innerHeight);
			bloomPass.resolution.set(window.innerWidth, window.innerHeight);
		};
		window.addEventListener("resize", handleResize);

		return () => {
			sceneState.disposed = true;
			cancelAnimationFrame(sceneState.animId);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouse);
			document.removeEventListener("visibilitychange", handleVisibility);
			renderer.dispose();
			scene.traverse((obj) => {
				if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
					obj.geometry.dispose();
					if (obj.material instanceof THREE.Material) obj.material.dispose();
				}
			});
		};
	}, []);

	useEffect(() => {
		if (!sceneRef.current) return;
		const isDark = theme === "dark";
		const colors = getThemeColors(isDark);
		const { auroraUniforms, particleUniforms, bloomPass, renderer } =
			sceneRef.current;

		gsap.to(auroraUniforms.uColor1.value, {
			r: colors.color1.r,
			g: colors.color1.g,
			b: colors.color1.b,
			duration: 0.8,
		});
		gsap.to(auroraUniforms.uColor2.value, {
			r: colors.color2.r,
			g: colors.color2.g,
			b: colors.color2.b,
			duration: 0.8,
		});
		gsap.to(auroraUniforms.uColor3.value, {
			r: colors.color3.r,
			g: colors.color3.g,
			b: colors.color3.b,
			duration: 0.8,
		});
		gsap.to(auroraUniforms.uIntensity, {
			value: colors.intensity,
			duration: 0.8,
		});
		gsap.to(auroraUniforms.uDark, { value: isDark ? 1.0 : 0.0, duration: 0.8 });
		gsap.to(bloomPass, { strength: colors.bloomStrength, duration: 0.8 });
		gsap.to(particleUniforms.uColor.value, {
			r: colors.particleColor.r,
			g: colors.particleColor.g,
			b: colors.particleColor.b,
			duration: 0.8,
		});
		renderer.toneMappingExposure = isDark ? 1.2 : 1.0;
	}, [theme]);

	return (
		<div
			ref={containerRef}
			className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none hidden md:block"
		/>
	);
}
