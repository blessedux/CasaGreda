"use client"

import { useState } from "react"
import { Button } from "../../design-system"
import type { Dictionary } from "../../lib/i18n"
import RoomCard from "./RoomCard"
import styles from "./MainRoom.module.css"

interface MainRoomProps {
  dictionary: Dictionary
  locale: "es" | "en"
}

const rooms = [
  {
    id: "comedor",
    titleKey: "comedor",
    image: "/images/rooms/comedor.jpg",
    description: "Piezas que dan peso y calidez a tu mesa.",
    descriptionEn: "Pieces that bring weight and warmth to your table.",
  },
  {
    id: "cocina",
    titleKey: "cocina",
    image: "/images/rooms/cocina.jpg",
    description: "Herramientas ancestrales para la cocina moderna.",
    descriptionEn: "Ancestral tools for the modern kitchen.",
  },
  {
    id: "rituales",
    titleKey: "rituales",
    image: "/images/rooms/rituales.jpg",
    description: "Café, té y pausa. Objetos con presencia.",
    descriptionEn: "Coffee, tea and pause. Objects with presence.",
  },
  {
    id: "regalos",
    titleKey: "regalos",
    image: "/images/rooms/regalos.jpg",
    description: "Piezas únicas para momentos especiales.",
    descriptionEn: "Unique pieces for special moments.",
  },
]

export default function MainRoom({ dictionary, locale }: MainRoomProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = dictionary

    for (const k of keys) {
      value = value?.[k]
    }

    return typeof value === "string" ? value : key
  }

  return (
    <div className={styles.mainRoom}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} text-balance`}>{t("hero.headline")}</h1>
          <p className={`${styles.heroSubtitle} text-pretty`}>{t("hero.subhead")}</p>
          <Button size="lg" className={styles.heroButton}>
            {t("hero.cta")}
          </Button>
        </div>

        {/* Background texture */}
        <div className={styles.heroBackground}>
          <img src="/dark-clay-pottery-texture-with-warm-lighting.jpg" alt="" className={styles.heroImage} />
        </div>
      </section>

      {/* Rooms Grid */}
      <section className={styles.roomsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t("nav.rooms")}</h2>

          <div className={styles.roomsGrid}>
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                id={room.id}
                title={t(`rooms.${room.titleKey}`)}
                description={locale === "en" ? room.descriptionEn : room.description}
                image={room.image}
                isHovered={hoveredRoom === room.id}
                onHover={() => setHoveredRoom(room.id)}
                onLeave={() => setHoveredRoom(null)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyContent}>
            <h3 className={styles.storyTitle}>
              {locale === "es" ? "Ancestral. Auténtico. Chileno." : "Ancestral. Authentic. Chilean."}
            </h3>
            <p className={styles.storyText}>
              {locale === "es"
                ? "Cada pieza nace del fuego y la tradición milenaria. Greda oscura de Chile, moldeada a mano, cocida con paciencia. Objetos que conectan con la tierra y transforman tu mesa en un ritual."
                : "Each piece is born from fire and millennial tradition. Dark clay from Chile, hand-molded, fired with patience. Objects that connect with the earth and transform your table into a ritual."}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
