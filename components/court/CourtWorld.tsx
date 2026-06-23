'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { CLUB } from '@/lib/data'

const ZONES = [
  {
    id: 'reservas',
    tag: '01 — Acción',
    title: 'RESERVAR\nPISTA',
    desc: 'Elige tu pista y horario. Confirmación inmediata por WhatsApp. 6 pistas indoor disponibles.',
    cta: 'Reservar ahora',
    color: 0xC8FF00,
    position: new THREE.Vector3(0, 0, 0),
    camTarget: new THREE.Vector3(0, 2, 6),
    camLook: new THREE.Vector3(0, 0, 0),
    radius: 1.2,
  },
  {
    id: 'torneos',
    tag: '02 — Competición',
    title: 'TORNEOS\nY POZOS',
    desc: 'Compite cada fin de semana. Torneos, pozos, americanos y Liga Sur para todos los niveles.',
    cta: 'Ver torneos',
    color: 0xC8FF00,
    position: new THREE.Vector3(-5, 0, -3),
    camTarget: new THREE.Vector3(-4, 2, 3),
    camLook: new THREE.Vector3(-5, 0, -3),
    radius: 1.0,
  },
  {
    id: 'escuela',
    tag: '03 — Aprendizaje',
    title: 'ESCUELA\nPADEL LOVE',
    desc: 'Clases para todos los niveles con profesores titulados. Iniciación, medio y competición.',
    cta: 'Apuntarme',
    color: 0x00A8FF,
    position: new THREE.Vector3(5, 0, -3),
    camTarget: new THREE.Vector3(4, 2, 3),
    camLook: new THREE.Vector3(5, 0, -3),
    radius: 1.0,
  },
  {
    id: 'ranking',
    tag: '04 — Clasificación',
    title: 'RANKING\nDEL CLUB',
    desc: 'Sube posiciones, acumula puntos y demuestra tu nivel frente a la comunidad.',
    cta: 'Ver ranking',
    color: 0xC8FF00,
    position: new THREE.Vector3(0, 0, -7),
    camTarget: new THREE.Vector3(0, 2, -1),
    camLook: new THREE.Vector3(0, 0, -7),
    radius: 1.0,
  },
  {
    id: 'buscar',
    tag: '05 — Comunidad',
    title: 'TE BUSCAMOS\nPARTIDO',
    desc: '¿Sin partido? Te emparejamos con jugadores de tu nivel. Gratis, rápido y por WhatsApp.',
    cta: 'Buscar partido',
    color: 0x00A8FF,
    position: new THREE.Vector3(0, 0, 7),
    camTarget: new THREE.Vector3(0, 2, 13),
    camLook: new THREE.Vector3(0, 0, 7),
    radius: 1.0,
  },
]

const CAM_AERIAL = { x: 0, y: 22, z: 8 }
const CAM_LOOK_AERIAL = new THREE.Vector3(0, 0, -1)

export function CourtWorld() {
  const mountRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const zoneMarkersRef = useRef<THREE.Mesh[]>([])
  const rafRef = useRef<number>(0)
  const mouseRef = useRef(new THREE.Vector2())
  const raycasterRef = useRef(new THREE.Raycaster())
  const clockRef = useRef(new THREE.Clock())

  const [activeZone, setActiveZone] = useState<number | null>(null)
  const [hoverZone, setHoverZone] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const buildScene = useCallback(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050505)
    scene.fog = new THREE.FogExp2(0x050505, 0.04)
    sceneRef.current = scene

    // Court floor — green carpet
    const floorGeo = new THREE.PlaneGeometry(12, 20)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a1a08,
      roughness: 0.9,
      metalness: 0.1,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    // Court lines
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xC8FF00, opacity: 0.9, transparent: true })

    const addLine = (x: number, z: number, w: number, d: number) => {
      const geo = new THREE.PlaneGeometry(w, d)
      const mesh = new THREE.Mesh(geo, lineMat)
      mesh.rotation.x = -Math.PI / 2
      mesh.position.set(x, 0.01, z)
      scene.add(mesh)
    }

    // Outer boundary
    addLine(0, 0, 12, 0.06)   // top
    addLine(0, 0, 12, 0.06)   // bottom
    addLine(-6, 0, 0.06, 20)  // left
    addLine(6, 0, 0.06, 20)   // right
    addLine(0, 0, 0.06, 20)   // center vertical
    addLine(0, -3.5, 12, 0.06) // service top
    addLine(0, 3.5, 12, 0.06)  // service bottom

    // Boundary rect
    const boundaryGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(12, 0.02, 20))
    const boundaryMat = new THREE.LineBasicMaterial({ color: 0xC8FF00, linewidth: 2 })
    const boundary = new THREE.LineSegments(boundaryGeo, boundaryMat)
    boundary.position.y = 0.01
    scene.add(boundary)

    // NET
    const netGeo = new THREE.PlaneGeometry(12, 0.9)
    const netMat = new THREE.MeshBasicMaterial({
      color: 0xC8FF00,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      wireframe: true,
    })
    const net = new THREE.Mesh(netGeo, netMat)
    net.rotation.x = -Math.PI / 2 + 0.05
    net.position.set(0, 0.45, 0)
    scene.add(net)

    // Net solid bar
    const netBarGeo = new THREE.BoxGeometry(12.4, 0.05, 0.05)
    const netBarMat = new THREE.MeshStandardMaterial({ color: 0xC8FF00, emissive: 0xC8FF00, emissiveIntensity: 0.5 })
    const netBar = new THREE.Mesh(netBarGeo, netBarMat)
    netBar.position.set(0, 0.9, 0)
    scene.add(netBar)

    // Glass walls
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x004488,
      transparent: true,
      opacity: 0.18,
      roughness: 0.05,
      metalness: 0.3,
      side: THREE.DoubleSide,
    })

    const glassBack = new THREE.Mesh(new THREE.PlaneGeometry(12, 5), glassMat)
    glassBack.position.set(0, 2.5, -10)
    scene.add(glassBack)

    const glassFront = new THREE.Mesh(new THREE.PlaneGeometry(12, 5), glassMat)
    glassFront.position.set(0, 2.5, 10)
    glassFront.rotation.y = Math.PI
    scene.add(glassFront)

    const glassLeft = new THREE.Mesh(new THREE.PlaneGeometry(20, 5), glassMat)
    glassLeft.position.set(-6, 2.5, 0)
    glassLeft.rotation.y = Math.PI / 2
    scene.add(glassLeft)

    const glassRight = new THREE.Mesh(new THREE.PlaneGeometry(20, 5), glassMat)
    glassRight.position.set(6, 2.5, 0)
    glassRight.rotation.y = -Math.PI / 2
    scene.add(glassRight)

    // LED strips on walls
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xC8FF00 })
    const stripGeo = new THREE.BoxGeometry(0.04, 0.04, 20)
    ;[-5.95, 5.95].forEach(x => {
      const strip = new THREE.Mesh(stripGeo, ledMat)
      strip.position.set(x, 4.8, 0)
      scene.add(strip)
    })
    const stripGeoH = new THREE.BoxGeometry(12, 0.04, 0.04)
    ;[-9.95, 9.95].forEach(z => {
      const strip = new THREE.Mesh(stripGeoH, ledMat)
      strip.position.set(0, 4.8, z)
      scene.add(strip)
    })

    // Zone markers — interactive hotspots
    const markers: THREE.Mesh[] = []
    ZONES.forEach((zone, i) => {
      const geo = new THREE.CircleGeometry(zone.radius, 32)
      const mat = new THREE.MeshBasicMaterial({
        color: zone.color,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      })
      const marker = new THREE.Mesh(geo, mat)
      marker.rotation.x = -Math.PI / 2
      marker.position.copy(zone.position)
      marker.position.y = 0.02
      marker.userData = { zoneIndex: i }
      scene.add(marker)

      // Ring
      const ringGeo = new THREE.RingGeometry(zone.radius, zone.radius + 0.08, 32)
      const ringMat = new THREE.MeshBasicMaterial({
        color: zone.color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = -Math.PI / 2
      ring.position.copy(zone.position)
      ring.position.y = 0.03
      scene.add(ring)

      markers.push(marker)
    })
    zoneMarkersRef.current = markers

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambient)

    const topLight1 = new THREE.SpotLight(0xffffff, 80, 30, Math.PI / 5, 0.3)
    topLight1.position.set(-4, 10, -4)
    topLight1.castShadow = true
    scene.add(topLight1)

    const topLight2 = new THREE.SpotLight(0xffffff, 80, 30, Math.PI / 5, 0.3)
    topLight2.position.set(4, 10, 4)
    topLight2.castShadow = true
    scene.add(topLight2)

    const neonLight = new THREE.PointLight(0xC8FF00, 3, 20)
    neonLight.position.set(0, 5, 0)
    scene.add(neonLight)

    const blueLight = new THREE.PointLight(0x00A8FF, 2, 15)
    blueLight.position.set(-5, 3, -5)
    scene.add(blueLight)

    return scene
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Camera
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 200)
    camera.position.set(CAM_AERIAL.x, CAM_AERIAL.y, CAM_AERIAL.z)
    camera.lookAt(CAM_LOOK_AERIAL)
    cameraRef.current = camera

    buildScene()
    const scene = sceneRef.current!

    // Animate
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const t = clockRef.current.getElapsedTime()

      // Pulse zone markers
      zoneMarkersRef.current.forEach((marker, i) => {
        const pulse = Math.sin(t * 1.5 + i * 1.3) * 0.5 + 0.5
        const mat = marker.material as THREE.MeshBasicMaterial
        mat.opacity = 0.08 + pulse * 0.18
        marker.scale.setScalar(1 + pulse * 0.06)
      })

      // Neon light flicker
      const neonLight = scene.children.find(c => c instanceof THREE.PointLight && (c as THREE.PointLight).color.getHex() === 0xC8FF00) as THREE.PointLight
      if (neonLight) neonLight.intensity = 3 + Math.sin(t * 3) * 0.5

      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [buildScene])

  // Mouse hover
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTransitioning || activeZone !== null) return
    const mount = mountRef.current
    if (!mount) return
    const rect = mount.getBoundingClientRect()
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current!)
    const hits = raycasterRef.current.intersectObjects(zoneMarkersRef.current)
    if (hits.length > 0) {
      const idx = hits[0].object.userData.zoneIndex
      setHoverZone(idx)
      mountRef.current!.style.cursor = 'pointer'
    } else {
      setHoverZone(null)
      mountRef.current!.style.cursor = 'default'
    }
  }, [isTransitioning, activeZone])

  // Click — zoom into zone
  const onCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTransitioning || activeZone !== null) return
    const mount = mountRef.current
    if (!mount) return
    const rect = mount.getBoundingClientRect()
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current!)
    const hits = raycasterRef.current.intersectObjects(zoneMarkersRef.current)
    if (hits.length === 0) return

    const idx = hits[0].object.userData.zoneIndex
    const zone = ZONES[idx]
    const cam = cameraRef.current!

    setIsTransitioning(true)
    setHoverZone(null)

    // Zoom into zone
    gsap.to(cam.position, {
      x: zone.camTarget.x,
      y: zone.camTarget.y,
      z: zone.camTarget.z,
      duration: 1.4,
      ease: 'power3.inOut',
      onUpdate: () => cam.lookAt(zone.camLook),
      onComplete: () => {
        setActiveZone(idx)
        setShowContent(true)
        setIsTransitioning(false)
      }
    })
  }, [isTransitioning, activeZone])

  // Back to aerial
  const goBack = useCallback(() => {
    setShowContent(false)
    setIsTransitioning(true)
    const cam = cameraRef.current!

    setTimeout(() => {
      setActiveZone(null)
      gsap.to(cam.position, {
        x: CAM_AERIAL.x,
        y: CAM_AERIAL.y,
        z: CAM_AERIAL.z,
        duration: 1.4,
        ease: 'power3.inOut',
        onUpdate: () => cam.lookAt(CAM_LOOK_AERIAL),
        onComplete: () => setIsTransitioning(false)
      })
    }, 300)
  }, [])

  // Keyboard ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeZone !== null) goBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeZone, goBack])

  const zone = activeZone !== null ? ZONES[activeZone] : null

  return (
    <div className="relative w-full" style={{ height: '100vh', background: '#050505' }}>

      {/* THREE.JS CANVAS */}
      <div
        ref={mountRef}
        className="absolute inset-0"
        onMouseMove={onMouseMove}
        onClick={onCanvasClick}
      />

      {/* HEADER */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6"
        style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.9), transparent)' }}>
        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', letterSpacing: '0.15em', color: '#C8FF00' }}>
          PADEL LOVE
        </span>
        <span className="text-white/20 text-xs tracking-widest uppercase hidden md:block"
          style={{ fontFamily: 'var(--font-inter)' }}>
          {activeZone === null ? 'Explora la pista' : 'Pulse ESC para volver'}
        </span>
        <a href={CLUB.whatsapp} target="_blank" rel="noopener noreferrer"
          className="bg-neon text-dark text-xs font-bold tracking-widest uppercase px-5 py-2.5 hover:opacity-90 transition-opacity hidden md:block"
          style={{ fontFamily: 'var(--font-inter)' }}>
          Reservar
        </a>
      </div>

      {/* ZONE HOVER LABEL */}
      <AnimatePresence>
        {hoverZone !== null && activeZone === null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
          >
            <p className="text-neon text-xs tracking-[0.3em] uppercase mb-1"
              style={{ fontFamily: 'var(--font-inter)' }}>
              {ZONES[hoverZone].tag}
            </p>
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>
              {ZONES[hoverZone].title.replace('\n', ' ')}
            </p>
            <p className="text-white/30 text-xs mt-2 tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>
              Clic para entrar →
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ZONE CONTENT OVERLAY */}
      <AnimatePresence>
        {showContent && zone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 flex items-center justify-center"
            style={{ background: 'rgba(5,5,5,0.75)', backdropFilter: 'blur(2px)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-lg w-full mx-6 border border-white/10 p-10"
              style={{ background: 'rgba(8,8,8,0.95)' }}
            >
              {/* Back */}
              <button
                onClick={goBack}
                className="absolute top-5 right-5 text-white/30 hover:text-white/70 text-xs tracking-widest uppercase transition-colors flex items-center gap-2"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                ← Volver
              </button>

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: zone.color === 0xC8FF00 ? '#C8FF00' : '#00A8FF' }} />

              <p className="text-xs tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: 'var(--font-inter)', color: zone.color === 0xC8FF00 ? '#C8FF00' : '#00A8FF' }}>
                {zone.tag}
              </p>

              <h2 style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: 0.9,
                letterSpacing: '0.03em',
                color: '#F0F0F0',
                marginBottom: '1.2rem',
                whiteSpace: 'pre-line',
              }}>
                {zone.title}
              </h2>

              <p className="text-white/50 text-sm leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-inter)' }}>
                {zone.desc}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const msgs: Record<string, string> = {
                      reservas: 'Hola Padel Love, quiero reservar una pista.',
                      torneos: 'Hola Padel Love, quiero información sobre torneos y pozos.',
                      escuela: 'Hola Padel Love, quiero información sobre la escuela de pádel.',
                      ranking: 'Hola Padel Love, quiero información sobre el ranking del club.',
                      buscar: 'Hola Padel Love, quiero que me busquéis partido.',
                    }
                    window.open(`${CLUB.whatsapp}?text=${encodeURIComponent(msgs[zone.id] || '')}`, '_blank')
                  }}
                  className="bg-neon text-dark text-xs font-bold tracking-widest uppercase px-8 py-4 hover:opacity-90 transition-opacity flex-1"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {zone.cta} →
                </button>
                <a
                  href={`tel:${CLUB.phone.replace(/\s/g, '')}`}
                  className="text-white/40 text-xs tracking-widest uppercase border border-white/10 px-6 py-4 hover:border-white/30 hover:text-white/70 transition-all"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Llamar
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AERIAL HINT */}
      <AnimatePresence>
        {activeZone === null && !isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          >
            <div className="flex gap-3">
              {ZONES.map((z, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full"
                  style={{ background: hoverZone === i ? '#C8FF00' : 'rgba(255,255,255,0.2)' }} />
              ))}
            </div>
            <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mt-1"
              style={{ fontFamily: 'var(--font-inter)' }}>
              Explora las zonas de la pista
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading/transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.4) 100%)' }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
