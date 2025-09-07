"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../design-system"
import type { Dictionary } from "../../lib/i18n"
import type { Room } from "../../lib/rooms"
import ProductHotspot from "./ProductHotspot"
import styles from "./RoomScene.module.css"

interface RoomSceneProps {
  room: Room
  dictionary: Dictionary
  locale: "es" | "en"
}

export default function RoomScene({ room, dictionary, locale }: RoomSceneProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = dictionary

    for (const k of keys) {
      value = value?.[k]
    }

    return typeof value === "string" ? value : key
  }

  const roomTitle = locale === "en" && room.title.en ? room.title.en : room.title.es
  const roomIntro = locale === "en" && room.intro?.en ? room.intro.en : room.intro?.es

  return (
    <div className={styles.roomScene}>
      {/* Navigation Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.backButton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{t("common.back")}</span>
          </Link>

          <h1 className={styles.roomTitle}>{roomTitle}</h1>

          <div className={styles.headerActions}>
            <Button variant="ghost" size="sm">
              {t("nav.cart")}
            </Button>
          </div>
        </div>
      </header>

      {/* Room Scene */}
      <section className={styles.scene}>
        <div className={styles.sceneContainer}>
          {/* Background Image */}
          <div className={styles.sceneBackground}>
            <img
              src={room.media.src || "/placeholder.svg"}
              alt={room.media.alt || `Sala ${roomTitle}`}
              className={`${styles.sceneImage} ${imageLoaded ? styles.loaded : ""}`}
              onLoad={() => setImageLoaded(true)}
            />
            <div className={styles.sceneOverlay} />
          </div>

          {/* Product Hotspots */}
          {room.productHotspots.map((hotspot) => (
            <ProductHotspot key={hotspot.productId} hotspot={hotspot} dictionary={dictionary} locale={locale} />
          ))}

          {/* Room Info */}
          <div className={styles.roomInfo}>
            <div className={styles.roomInfoContent}>
              <h2 className={styles.roomInfoTitle}>{roomTitle}</h2>
              {roomIntro && <p className={styles.roomInfoDescription}>{roomIntro}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Room Navigation */}
      <nav className={styles.roomNav}>
        <div className={styles.roomNavContent}>
          <Link href="/rooms/comedor" className={styles.roomNavLink}>
            {t("rooms.comedor")}
          </Link>
          <Link href="/rooms/cocina" className={styles.roomNavLink}>
            {t("rooms.cocina")}
          </Link>
          <Link href="/rooms/rituales" className={styles.roomNavLink}>
            {t("rooms.rituales")}
          </Link>
          <Link href="/rooms/regalos" className={styles.roomNavLink}>
            {t("rooms.regalos")}
          </Link>
        </div>
      </nav>
    </div>
  )
}
