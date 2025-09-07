"use client"

import { useState } from "react"
import Link from "next/link"
import { formatPrice } from "../../lib/pricing"
import type { Dictionary } from "../../lib/i18n"
import type { ProductHotspot as ProductHotspotType } from "../../lib/rooms"
import styles from "./ProductHotspot.module.css"

interface ProductHotspotProps {
  hotspot: ProductHotspotType
  dictionary: Dictionary
  locale: "es" | "en"
}

export default function ProductHotspot({ hotspot, dictionary, locale }: ProductHotspotProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { product, x, y } = hotspot

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = dictionary

    for (const k of keys) {
      value = value?.[k]
    }

    return typeof value === "string" ? value : key
  }

  const productTitle = locale === "en" && product.title.en ? product.title.en : product.title.es
  const basePrice = product.priceTiers[0]?.unitPrice || 0

  return (
    <div
      className={styles.hotspot}
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hotspot Indicator */}
      <div className={`${styles.indicator} ${isHovered ? styles.active : ""}`}>
        <div className={styles.pulse} />
        <div className={styles.dot} />
      </div>

      {/* Product Card */}
      {isHovered && (
        <div className={styles.productCard}>
          <div className={styles.cardContent}>
            <div className={styles.productImage}>
              <img
                src={product.gallery[0]?.src || "/placeholder.svg"}
                alt={product.gallery[0]?.alt || productTitle}
                loading="lazy"
              />
            </div>

            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>{productTitle}</h3>

              <div className={styles.productMeta}>
                <span className={styles.price}>{formatPrice(basePrice, locale)}</span>

                {product.stock > 0 ? (
                  <span className={styles.stock}>
                    {product.stock} {t("product.units")}
                  </span>
                ) : (
                  <span className={styles.outOfStock}>Sin stock</span>
                )}
              </div>

              <div className={styles.productMaterials}>
                {product.materials.slice(0, 2).map((material, index) => (
                  <span key={index} className={styles.material}>
                    {material}
                  </span>
                ))}
              </div>

              <Link href={`/p/${product.slug}`} className={styles.viewButton} onClick={(e) => e.stopPropagation()}>
                {t("product.viewPiece")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
