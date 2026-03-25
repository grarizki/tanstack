import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useTheme } from '../../lib/theme'

export default function ThreeDitherBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: Theme changes handled by separate effect
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Cleanup existing renderer
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 4.5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Shader for Dithering
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uColorBg;
      uniform vec3 uColorAccent1;
      uniform vec3 uColorAccent2;
      
      const float bayerMatrix[16] = float[](
        0.0/16.0, 8.0/16.0, 2.0/16.0, 10.0/16.0,
        12.0/16.0, 4.0/16.0, 14.0/16.0, 6.0/16.0,
        3.0/16.0, 11.0/16.0, 1.0/16.0, 9.0/16.0,
        15.0/16.0, 7.0/16.0, 13.0/16.0, 5.0/16.0
      );

      void main() {
        vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
        float diff = max(dot(vNormal, lightDir), 0.0);
        float lighting = diff + 0.2;
        
        vec2 screenPos = gl_FragCoord.xy;
        int x = int(mod(screenPos.x, 4.0));
        int y = int(mod(screenPos.y, 4.0));
        int index = y * 4 + x;
        
        float threshold = bayerMatrix[index];
        
        vec3 color = uColorBg;
        
        if (lighting > threshold) {
          float mixFactor = (vNormal.y + 1.0) * 0.5;
          color = mix(uColorAccent2, uColorAccent1, mixFactor);
        }
        
        float noise = fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
        
        if (lighting > threshold + 0.4 + (noise * 0.1)) {
          color = vec3(0.8, 0.9, 1.0); 
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const getThemeColors = () => {
      const isDark = theme === 'dark'
      return {
        bg: isDark
          ? new THREE.Color(0.01, 0.01, 0.01)
          : new THREE.Color(0.9, 0.9, 0.9),
        accent1: isDark
          ? new THREE.Color(0.5, 0.5, 0.0)
          : new THREE.Color(0.2, 0.5, 0.2),
        accent2: isDark
          ? new THREE.Color(0.0, 0.4, 0.8)
          : new THREE.Color(0.2, 0.6, 0.9),
      }
    }

    const initialColors = getThemeColors()

    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uColorBg: { value: initialColors.bg },
        uColorAccent1: { value: initialColors.accent1 },
        uColorAccent2: { value: initialColors.accent2 },
      },
      wireframe: false,
    })
    materialRef.current = material

    const torusKnot = new THREE.Mesh(geometry, material)
    scene.add(torusKnot)

    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsedTime

      torusKnot.rotation.x += 0.002
      torusKnot.rotation.y += 0.003

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      )
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  // Update colors when theme changes
  useEffect(() => {
    if (!materialRef.current) return

    const isDark = theme === 'dark'
    const colors = {
      bg: isDark
        ? new THREE.Color(0.01, 0.01, 0.01)
        : new THREE.Color(0.9, 0.9, 0.9),
      accent1: isDark
        ? new THREE.Color(0.5, 0.5, 0.0)
        : new THREE.Color(0.2, 0.5, 0.2),
      accent2: isDark
        ? new THREE.Color(0.0, 0.4, 0.8)
        : new THREE.Color(0.2, 0.6, 0.9),
    }

    gsap.to(materialRef.current.uniforms.uColorBg.value, {
      r: colors.bg.r,
      g: colors.bg.g,
      b: colors.bg.b,
      duration: 0.5,
    })
    gsap.to(materialRef.current.uniforms.uColorAccent1.value, {
      r: colors.accent1.r,
      g: colors.accent1.g,
      b: colors.accent1.b,
      duration: 0.5,
    })
    gsap.to(materialRef.current.uniforms.uColorAccent2.value, {
      r: colors.accent2.r,
      g: colors.accent2.g,
      b: colors.accent2.b,
      duration: 0.5,
    })
  }, [theme])

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  )
}
