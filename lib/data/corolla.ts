// Datos de la página Corolla 2026 — según handoff de diseño (design_handoff_corolla_2026)

export interface Version {
  nombre: string
  precio: string
  imagen: string
  caracteristicas: string[]
}

export const versiones: Version[] = [
  {
    nombre: 'BASE CVT',
    precio: '$428,600',
    imagen: '/images/corolla/corolla-base.webp',
    caracteristicas: [
      'Faros BI-LED',
      'Pantalla táctil 8"',
      'Android Auto® / Apple CarPlay® inalámbrico',
      'Sistema Smart Key',
      'CVT con 10 cambios',
    ],
  },
  {
    nombre: 'LE CVT',
    precio: '$458,700',
    imagen: '/images/corolla/corolla-le.webp',
    caracteristicas: [
      'Faros BI-LED',
      'Pantalla táctil 8"',
      'Android Auto® / Apple CarPlay® inalámbrico',
      'Sistema Smart Key',
      'Espejos con ajuste eléctrico',
    ],
  },
  {
    nombre: 'XLE CVT',
    precio: '$537,400',
    imagen: '/images/corolla/corolla-xle-cvt.webp',
    caracteristicas: [
      'Pantalla info múltiple 12.3"',
      'Rines de aluminio 16"',
      'Toyota Safety Sense 3',
      'Quemacocos',
      'Android Auto® / Apple CarPlay® inalámbrico',
    ],
  },
  {
    nombre: 'SE CVT',
    precio: '$544,500',
    imagen: '/images/corolla/corolla-se-cvt.webp',
    caracteristicas: [
      'Rines de aluminio 17"',
      'Paletas de cambio al volante',
      'Luces DRL LED en faros y facia',
      'Barra estabilizadora',
      'Alerón deportivo',
    ],
  },
  {
    nombre: 'LE HEV',
    precio: '$515,300',
    imagen: '/images/corolla/corolla-hev-le.webp',
    caracteristicas: [
      'Faros BI-LED',
      'Apple CarPlay® / Android Auto®',
      'Cámara de reversa',
      'Rines de aluminio 15"',
      'Motor híbrido eléctrico',
    ],
  },
  {
    nombre: 'XLE HEV',
    precio: '$567,300',
    imagen: '/images/corolla/corolla-xle-cvt-ed20aeb0.webp',
    caracteristicas: [
      'Pantalla info múltiple 12.3"',
      '4 modos: ECO / NORMAL / SPORT / EV',
      'Rines de aluminio 16"',
      'Toyota Safety Sense 3',
      'Quemacocos',
    ],
  },
]

export interface ColorOption {
  id: string
  label: string
  hex: string
  needsBorder: boolean
}

export const colores: ColorOption[] = [
  { id: 'grisMetalico', label: 'Gris Metálico', hex: '#707070', needsBorder: false },
  { id: 'grafito', label: 'Grafito', hex: '#3A3A3A', needsBorder: false },
  { id: 'rojo', label: 'Rojo', hex: '#CC0A18', needsBorder: false },
  { id: 'plata', label: 'Plata', hex: '#BEBFC1', needsBorder: false },
  { id: 'blanco', label: 'Blanco', hex: '#FFFFFF', needsBorder: true },
  { id: 'negro', label: 'Negro', hex: '#111111', needsBorder: false },
  { id: 'blancoPerlado', label: 'Blanco Perlado', hex: '#F0EDE8', needsBorder: false },
]

export interface GalleryImage {
  label: string
  src: string
}

export const galeriaExterior: GalleryImage[] = [
  { label: 'Exterior frontal', src: '/images/corolla/corolla-se-cvt-galeria-1.jpg' },
  { label: 'Vista ¾ frontal', src: '/images/corolla/corolla-se-cvt-galeria-3.jpeg' },
  { label: 'Vista lateral', src: '/images/corolla/corolla-se-cvt-galeria-2.jpeg' },
  { label: 'Vista ¾ trasera', src: '/images/corolla/corolla-se-cvt-galeria-4.jpeg' },
  { label: 'Exterior trasero', src: '/images/corolla/corolla-se-cvt-galeria-5.jpeg' },
  { label: 'Detalle de rin', src: '/images/corolla/corolla-se-cvt-galeria-6.jpeg' },
]

export const galeriaInterior: GalleryImage[] = [
  { label: 'Cockpit / tablero', src: '/images/corolla/corolla-se-cvt-galeria-int-1.jpeg' },
  { label: 'Asientos delanteros', src: '/images/corolla/corolla-se-cvt-galeria-int-2.jpeg' },
  { label: 'Asientos traseros', src: '/images/corolla/corolla-se-cvt-galeria-int-3.jpeg' },
  { label: 'Plazas traseras', src: '/images/corolla/corolla-se-cvt-galeria-int-4.jpeg' },
  { label: 'Motor', src: '/images/corolla/corolla-se-cvt-galeria-int-5.jpeg' },
  { label: 'Cajuela', src: '/images/corolla/corolla-se-cvt-galeria-int-6.jpeg' },
]

export const modelosSimilares = [
  {
    nombre: 'Yaris Sedán',
    categoria: 'Sedanes & Hatchbacks',
    precio: '$327,700 MXN',
    imagen: '/images/corolla/yarissd-583e3988.webp',
    href: '/modelos/yaris-sedan',
  },
  {
    nombre: 'Prius',
    categoria: 'Híbridos Eléctricos (HEV y PHEV)',
    precio: '$514,700 MXN',
    imagen: '/images/corolla/prius.webp',
    href: '/modelos/prius',
  },
  {
    nombre: 'Camry HEV',
    categoria: 'Híbridos Eléctricos (HEV y PHEV)',
    precio: '$625,600 MXN',
    imagen: '/images/corolla/camry-hev.webp',
    href: '/modelos/camry-hev',
  },
]
