"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "../../design-system"
import styles from "./RoomCard.module.css"

interface RoomCardProps {
  id: string
  title: string
  description: string
  image: string
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

export default function RoomCard({ id, title, description, image, isHovered, onHover, onLeave }: RoomCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    router.push(`/rooms/${id}`)
  }

  return (
    <Card
      variant="interactive"
      className={`${styles.roomCard} ${isHovered ? styles.hovered : ""}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label={`Explorar ${title}: ${description}`}
    >
      <div className={styles.imageContainer}>
        <img
          src={image || "/placeholder.svg"}
          alt={`Sala ${title}`}
          className={`${styles.roomImage} ${imageLoaded ? styles.loaded : ""}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.cta}>
          <span className={styles.ctaText}>Explorar</span>
          <svg className={styles.ctaIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Card>
  )
}
