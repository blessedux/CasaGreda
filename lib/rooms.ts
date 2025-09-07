// Casa Greda Rooms Data and Logic

export interface Product {
  id: string
  slug: string
  title: { es: string; en?: string }
  subtitle?: { es: string; en?: string }
  category: "platos" | "bowls" | "tazas" | "jarras" | "decoracion"
  materials: string[]
  weightKg?: number
  dimensionsCm?: { d?: number; w?: number; h?: number }
  heatSafe?: boolean
  care: string[]
  gallery: Array<{ src: string; alt: string; focal?: string }>
  priceTiers: Array<{ qty: number; unitPrice: number }>
  stock: number
  featured?: boolean
  roomTags?: string[]
  shippingNotes?: string
}

export interface ProductHotspot {
  productId: string
  x: number // percentage from left
  y: number // percentage from top
  product: Product
}

export interface Room {
  id: string
  title: { es: string; en?: string }
  media: { type: "image" | "video"; src: string; alt?: string }
  intro?: { es: string; en?: string }
  productHotspots: ProductHotspot[]
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "plato-greda-extendido",
    slug: "plato-greda-extendido",
    title: { es: "Plato de greda extendido", en: "Extended clay plate" },
    category: "platos",
    materials: ["Greda oscura", "Esmalte natural"],
    weightKg: 2.0,
    dimensionsCm: { d: 28 },
    heatSafe: true,
    care: ["Apta para horno", "Lavar a mano recomendado"],
    gallery: [
      { src: "/images/products/plato-extendido/front.jpg", alt: "Plato de greda extendido" },
      { src: "/images/products/plato-extendido/top.jpg", alt: "Vista cenital del plato de greda" },
    ],
    priceTiers: [
      { qty: 1, unitPrice: 15000 },
      { qty: 2, unitPrice: 14000 },
      { qty: 4, unitPrice: 12500 },
    ],
    stock: 42,
    shippingNotes: "Entrega en RM con empaque protector premium",
  },
  {
    id: "bowl-greda-mediano",
    slug: "bowl-greda-mediano",
    title: { es: "Bowl de greda mediano", en: "Medium clay bowl" },
    category: "bowls",
    materials: ["Greda oscura", "Acabado mate"],
    weightKg: 1.2,
    dimensionsCm: { d: 18, h: 8 },
    heatSafe: true,
    care: ["Apta para horno", "Lavar a mano"],
    gallery: [{ src: "/images/products/bowl-mediano/front.jpg", alt: "Bowl de greda mediano" }],
    priceTiers: [
      { qty: 1, unitPrice: 12000 },
      { qty: 2, unitPrice: 11000 },
      { qty: 4, unitPrice: 10000 },
    ],
    stock: 28,
  },
  {
    id: "taza-greda-cafe",
    slug: "taza-greda-cafe",
    title: { es: "Taza de greda para café", en: "Clay coffee mug" },
    category: "tazas",
    materials: ["Greda oscura", "Esmalte interior"],
    weightKg: 0.4,
    dimensionsCm: { d: 9, h: 10 },
    heatSafe: true,
    care: ["Apta para microondas", "Lavar a mano"],
    gallery: [{ src: "/images/products/taza-cafe/front.jpg", alt: "Taza de greda para café" }],
    priceTiers: [
      { qty: 1, unitPrice: 8000 },
      { qty: 2, unitPrice: 7500 },
      { qty: 4, unitPrice: 7000 },
    ],
    stock: 35,
  },
  {
    id: "jarra-greda-clasica",
    slug: "jarra-greda-clasica",
    title: { es: "Jarra de greda clásica", en: "Classic clay jug" },
    category: "jarras",
    materials: ["Greda oscura", "Asa reforzada"],
    weightKg: 1.8,
    dimensionsCm: { d: 15, h: 22 },
    heatSafe: false,
    care: ["Solo agua fría", "Lavar a mano"],
    gallery: [{ src: "/images/products/jarra-clasica/front.jpg", alt: "Jarra de greda clásica" }],
    priceTiers: [
      { qty: 1, unitPrice: 18000 },
      { qty: 2, unitPrice: 17000 },
    ],
    stock: 15,
  },
]

// Room configurations
const roomsData: Room[] = [
  {
    id: "comedor",
    title: { es: "Comedor", en: "Dining Room" },
    media: {
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Comedor",
      alt: "Comedor con piezas de greda",
    },
    intro: { es: "Piezas que dan peso y calidez a tu mesa.", en: "Pieces that bring weight and warmth to your table." },
    productHotspots: [
      {
        productId: "plato-greda-extendido",
        x: 35,
        y: 60,
        product: sampleProducts[0],
      },
      {
        productId: "bowl-greda-mediano",
        x: 65,
        y: 45,
        product: sampleProducts[1],
      },
    ],
  },
  {
    id: "cocina",
    title: { es: "Cocina", en: "Kitchen" },
    media: {
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Cocina",
      alt: "Cocina con utensilios de greda",
    },
    intro: { es: "Herramientas ancestrales para la cocina moderna.", en: "Ancestral tools for the modern kitchen." },
    productHotspots: [
      {
        productId: "bowl-greda-mediano",
        x: 45,
        y: 55,
        product: sampleProducts[1],
      },
    ],
  },
  {
    id: "rituales",
    title: { es: "Rituales", en: "Rituals" },
    media: {
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Rituales",
      alt: "Mesa de rituales con café y té",
    },
    intro: { es: "Café, té y pausa. Objetos con presencia.", en: "Coffee, tea and pause. Objects with presence." },
    productHotspots: [
      {
        productId: "taza-greda-cafe",
        x: 40,
        y: 50,
        product: sampleProducts[2],
      },
      {
        productId: "jarra-greda-clasica",
        x: 70,
        y: 35,
        product: sampleProducts[3],
      },
    ],
  },
  {
    id: "regalos",
    title: { es: "Regalos", en: "Gifts" },
    media: {
      type: "image",
      src: "/placeholder.svg?height=600&width=800&text=Regalos",
      alt: "Selección de regalos de greda",
    },
    intro: { es: "Piezas únicas para momentos especiales.", en: "Unique pieces for special moments." },
    productHotspots: [
      {
        productId: "plato-greda-extendido",
        x: 30,
        y: 40,
        product: sampleProducts[0],
      },
      {
        productId: "taza-greda-cafe",
        x: 60,
        y: 65,
        product: sampleProducts[2],
      },
    ],
  },
]

export async function getRoomData(roomId: string): Promise<Room | null> {
  const room = roomsData.find((r) => r.id === roomId)
  return room || null
}

export async function getAllRooms(): Promise<Room[]> {
  return roomsData
}

export async function getProductById(productId: string): Promise<Product | null> {
  const product = sampleProducts.find((p) => p.id === productId)
  return product || null
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = sampleProducts.find((p) => p.slug === slug)
  return product || null
}
