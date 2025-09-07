"use client"

import type React from "react"

import { useState } from "react"
import styles from "./Gallery.module.css"

interface GalleryImage {
  src: string
  alt: string
  focal?: string
}

interface GalleryProps {
  images: GalleryImage[]
  productTitle: string
}

export default function Gallery({ images, productTitle }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const currentImage = images[currentIndex] || images[0]

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
    setImageLoaded(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleThumbnailClick(index)
    }
  }

  return (
    <div className={styles.gallery}>
      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <img
          src={currentImage?.src || "/placeholder.svg"}
          alt={currentImage?.alt || productTitle}
          className={`${styles.mainImage} ${imageLoaded ? styles.loaded : ""}`}
          onLoad={() => setImageLoaded(true)}
        />

        {images.length > 1 && (
          <div className={styles.imageCounter}>
            <span>
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ""}`}
              onClick={() => handleThumbnailClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`Ver imagen ${index + 1}: ${image.alt}`}
            >
              <img src={image.src || "/placeholder.svg"} alt={image.alt} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
