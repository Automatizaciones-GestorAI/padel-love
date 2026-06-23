export const CLUB = {
  name: 'Padel Love Indoor',
  shortName: 'Padel Love',
  phone: '630 630 342',
  phoneRaw: '34630630342',
  address: 'Ctra. Andalucía (N-IV), KM 35,5',
  city: 'Seseña Nuevo, Toledo',
  cp: '45224',
  instagram: 'https://www.instagram.com/padelloveindoor',
  whatsapp: 'https://wa.me/34630630342',
  whatsappMsg: 'Hola Padel Love, quiero información para jugar/reservar pista.',
  mapsUrl: 'https://maps.google.com/?q=Ctra.+Andalucia+N-IV+KM+35.5+Seseña+Nuevo+Toledo',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3044.0!2d-3.6!3d40.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA2JzAwLjAiTiAzwrAzNicwMC4wIlc!5e0!3m2!1ses!2ses!4v1234567890',
}

export const HORARIOS = [
  { dia: 'Lunes — Viernes', hora: '10:00 — 23:00', tag: 'Laborable' },
  { dia: 'Sábados', hora: '08:00 — 14:00 · 16:00 — 23:00', tag: 'Fin de semana' },
  { dia: 'Domingos', hora: '08:00 — 14:00 · 16:00 — 23:00', tag: 'Fin de semana' },
  { dia: 'Festivos', hora: '08:00 — 14:00 · 16:00 — 23:00', tag: 'Festivo' },
]

export const STATS = [
  { num: '6', label: 'Pistas indoor', suffix: '' },
  { num: '400', label: 'Jugadores activos', suffix: '+' },
  { num: '12', label: 'Torneos al año', suffix: '' },
  { num: '5', label: 'Valoración', suffix: '★' },
]

export const NAV_LINKS = [
  { label: 'Reservas', href: '#reservas' },
  { label: 'Buscar partido', href: '#buscar-partido' },
  { label: 'Escuela', href: '#escuela' },
  { label: 'Torneos', href: '#torneos' },
  { label: 'Ranking', href: '#ranking' },
  { label: 'Contacto', href: '#contacto' },
]

export const ESCUELA_NIVELES = [
  { nivel: 'Niños', desc: 'Iniciación al pádel desde pequeños. Diversión, técnica y valores deportivos.', icon: '🎾' },
  { nivel: 'Iniciación', desc: 'Aprende las bases del juego con grupos reducidos y profesores certificados.', icon: '🏓' },
  { nivel: 'Nivel medio', desc: 'Mejora tu técnica, posicionamiento y táctica de partido.', icon: '⚡' },
  { nivel: 'Avanzado', desc: 'Entrena para competir. Intensidad, estrategia y rendimiento.', icon: '🔥' },
  { nivel: 'Competición', desc: 'Preparación específica para torneos y liga. Mentalidad ganadora.', icon: '🏆' },
]

export const COMPETICIONES = [
  {
    tipo: 'Torneos',
    desc: 'Compite, suma partidos y vive el ambiente de club. Para todos los niveles.',
    precio: 'Desde 10€',
    color: 'neon',
    cta: 'Consultar próximas fechas',
  },
  {
    tipo: 'Pozos',
    desc: 'Partidos por niveles para jugar más y conocer gente nueva cada semana.',
    precio: 'Desde 10€',
    color: 'electric',
    cta: 'Apuntarme al pozo',
  },
  {
    tipo: 'Americanos',
    desc: 'Formato rápido, divertido y competitivo. Juegas con y contra todos.',
    precio: 'Desde 10€',
    color: 'neon',
    cta: 'Consultar próxima fecha',
  },
  {
    tipo: 'Liga Sur',
    desc: 'Representando a Seseña en competiciones externas. Equipo Padel Love.',
    precio: 'Consultar',
    color: 'electric',
    cta: 'Saber más',
  },
]

// Datos de muestra — sustituir por datos reales de la API del ranking
export const RANKING_DATA = [
  { pos: 1, nombre: 'Carlos M.', nivel: 'Avanzado', puntos: 1240, ultimo: 'Victoria' },
  { pos: 2, nombre: 'Javier R.', nivel: 'Avanzado', puntos: 1180, ultimo: 'Victoria' },
  { pos: 3, nombre: 'Miguel A.', nivel: 'Medio', puntos: 980, ultimo: 'Derrota' },
  { pos: 4, nombre: 'David L.', nivel: 'Medio', puntos: 920, ultimo: 'Victoria' },
  { pos: 5, nombre: 'Antonio G.', nivel: 'Avanzado', puntos: 870, ultimo: 'Victoria' },
  { pos: 6, nombre: 'Pedro S.', nivel: 'Medio', puntos: 810, ultimo: 'Derrota' },
  { pos: 7, nombre: 'Sergio V.', nivel: 'Medio', puntos: 760, ultimo: 'Victoria' },
  { pos: 8, nombre: 'Fernando C.', nivel: 'Iniciación', puntos: 640, ultimo: 'Derrota' },
]

export const INSTALACIONES = [
  { titulo: 'Pistas indoor', desc: '6 pistas cubiertas con cristal panorámico. Juega 365 días sin depender del clima.', img: '/images/pl1.jpg' },
  { titulo: 'Iluminación LED', desc: 'Iluminación de alta intensidad para máxima visibilidad en cualquier franja horaria.', img: '/images/pl4.jpg' },
  { titulo: 'Zona social', desc: 'Recepción, zona de espera y ambiente de club para antes y después del partido.', img: '/images/pl3.jpg' },
  { titulo: 'Escuela activa', desc: 'Clases todos los días con profesores titulados y grupos por nivel.', img: '/images/pl2.jpg' },
]

export const GALERIA_CATS = ['Pistas', 'Torneos', 'Escuela', 'Comunidad']

export const PATROCINADORES = [
  { nombre: 'Sponsor 1', logo: null },
  { nombre: 'Sponsor 2', logo: null },
  { nombre: 'Sponsor 3', logo: null },
  { nombre: 'Sponsor 4', logo: null },
  { nombre: 'Sponsor 5', logo: null },
]
