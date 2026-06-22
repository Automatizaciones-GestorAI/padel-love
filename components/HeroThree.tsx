'use client'

import { useEffect, useRef } from 'react'

export function HeroThree() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let animationId: number
    let THREE: any

    const init = async () => {
      // @ts-ignore
      THREE = await import('three')

      const canvas = canvasRef.current
      if (!canvas) return

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100)
      camera.position.set(0, 0, 5)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
      scene.add(ambientLight)

      const neonLight = new THREE.PointLight(0xc8ff00, 8, 10)
      neonLight.position.set(3, 3, 3)
      scene.add(neonLight)

      const rimLight = new THREE.PointLight(0xffffff, 3, 10)
      rimLight.position.set(-3, -2, 2)
      scene.add(rimLight)

      const backLight = new THREE.PointLight(0xc8ff00, 2, 8)
      backLight.position.set(0, -3, -2)
      scene.add(backLight)

      // Padel ball — sphere with texture lines
      const ballGeo = new THREE.SphereGeometry(1, 64, 64)

      // Custom shader material for the ball
      const ballMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color(0xc8ff00) },
          uColor2: { value: new THREE.Color(0x8ab800) },
          uFresnelColor: { value: new THREE.Color(0xffffff) },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uFresnelColor;
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;

          void main() {
            // Fresnel rim glow
            vec3 viewDir = normalize(-vPosition);
            float fresnel = pow(1.0 - dot(vNormal, viewDir), 3.0);

            // Seam lines like a real padel ball
            float phi = atan(vUv.y - 0.5, vUv.x - 0.5);
            float seam1 = smoothstep(0.03, 0.0, abs(sin(phi * 2.0 + uTime * 0.3)));
            float seam2 = smoothstep(0.03, 0.0, abs(cos(phi * 2.0 + uTime * 0.3)));
            float seams = max(seam1, seam2) * 0.4;

            // Base color
            vec3 col = mix(uColor2, uColor1, fresnel * 0.5 + 0.3);
            col += uFresnelColor * fresnel * 0.6;
            col += vec3(seams);

            gl_FragColor = vec4(col, 1.0);
          }
        `,
      })

      const ball = new THREE.Mesh(ballGeo, ballMat)
      scene.add(ball)

      // Particle system — 3000 particles orbiting the ball
      const particleCount = 3000
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)
      const speeds = new Float32Array(particleCount)
      const radii = new Float32Array(particleCount)
      const angles = new Float32Array(particleCount)
      const inclinations = new Float32Array(particleCount)

      for (let i = 0; i < particleCount; i++) {
        radii[i] = 1.4 + Math.random() * 2.5
        angles[i] = Math.random() * Math.PI * 2
        inclinations[i] = (Math.random() - 0.5) * Math.PI
        speeds[i] = (0.2 + Math.random() * 0.8) * (Math.random() > 0.5 ? 1 : -1)

        const x = radii[i] * Math.cos(angles[i])
        const y = radii[i] * Math.sin(inclinations[i])
        const z = radii[i] * Math.sin(angles[i])
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z

        // Neon green to white gradient
        const t = Math.random()
        colors[i * 3] = 0.6 + t * 0.4      // R
        colors[i * 3 + 1] = 0.9 + t * 0.1  // G
        colors[i * 3 + 2] = t * 0.2         // B

        sizes[i] = Math.random() * 3 + 0.5
      }

      const particleGeo = new THREE.BufferGeometry()
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

      const particleMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          attribute vec3 color;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.3, 0.5, d);
            gl_FragColor = vec4(vColor, alpha * 0.8);
          }
        `,
        transparent: true,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })

      const particles = new THREE.Points(particleGeo, particleMat)
      scene.add(particles)

      // Mouse interaction
      let mouseX = 0
      let mouseY = 0
      let targetRotX = 0
      let targetRotY = 0

      const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouseMove)

      // Resize handler
      const onResize = () => {
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight
        camera.updateProjectionMatrix()
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
      }
      window.addEventListener('resize', onResize)

      // Animation loop
      const clock = new THREE.Clock()
      const posArr = particleGeo.attributes.position.array as Float32Array

      const animate = () => {
        animationId = requestAnimationFrame(animate)
        const elapsed = clock.getElapsedTime()

        // Ball rotation — smooth follow mouse
        targetRotX += (mouseY * 0.5 - targetRotX) * 0.05
        targetRotY += (mouseX * 0.5 - targetRotY) * 0.05
        ball.rotation.x = targetRotX + elapsed * 0.15
        ball.rotation.y = targetRotY + elapsed * 0.25

        // Update ball shader time
        ballMat.uniforms.uTime.value = elapsed

        // Neon light orbit
        neonLight.position.x = Math.sin(elapsed * 0.7) * 4
        neonLight.position.z = Math.cos(elapsed * 0.7) * 4

        // Update particles — orbit animation
        for (let i = 0; i < particleCount; i++) {
          angles[i] += 0.002 * speeds[i]
          const r = radii[i]
          const wobble = Math.sin(elapsed * 0.5 + i * 0.1) * 0.05
          posArr[i * 3] = (r + wobble) * Math.cos(angles[i])
          posArr[i * 3 + 1] = (r + wobble) * Math.sin(inclinations[i]) + Math.sin(elapsed + i) * 0.03
          posArr[i * 3 + 2] = (r + wobble) * Math.sin(angles[i])
        }
        particleGeo.attributes.position.needsUpdate = true
        particles.rotation.y = elapsed * 0.05
        particles.rotation.x = Math.sin(elapsed * 0.1) * 0.1

        renderer.render(scene, camera)
      }

      animate()

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        cancelAnimationFrame(animationId)
        renderer.dispose()
      }
    }

    const cleanup = init()
    return () => {
      cleanup.then(fn => fn && fn())
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
