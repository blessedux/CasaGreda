"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Dictionary } from "../../lib/i18n"
import type { Product } from "../../lib/rooms"
import Gallery from "./Gallery"
import PurchaseSidebar from "./PurchaseSidebar"
import styles from "./ProductFocus.module.css"

interface ProductFocusProps {
  product: Product
  dictionary: Dictionary
  locale: "es" | "en"
}

export default function ProductFocus({ product, dictionary, locale }: ProductFocusProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = dictionary

    for (const k of keys) {
      value = value?.[k]
    }

    return typeof value === "string" ? value : key
  }

  const productTitle = locale === "en" && product.title.en ? product.title.en : product.title.es
  const productSubtitle = locale === "en" && product.subtitle?.en ? product.subtitle.en : product.subtitle?.es

  useEffect(() => {
    setIsLoaded(true)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [router])

  const handleBackClick = () => {
    router.back()
  }

  return (
    <div className={`${styles.productFocus} ${isLoaded ? styles.loaded : ""}`}>
      {/* Header */}
      <header className={styles.header}>
        <button onClick={handleBackClick} className={styles.backButton} aria-label={t("common.back")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M19 12H5M12 19L5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.headerInfo}>
          <h1 className={styles.productTitle}>{productTitle}</h1>
          {productSubtitle && <p className={styles.productSubtitle}>{productSubtitle}</p>}
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Gallery Section */}
        <div className={styles.gallerySection}>
          <Gallery images={product.gallery} productTitle={productTitle} />

          {/* Product Details */}
          <div className={styles.productDetails}>
            <section className={styles.detailSection}>
              <h3 className={styles.detailTitle}>{t("product.materials")}</h3>
              <div className={styles.materialsList}>
                {product.materials.map((material, index) => (
                  <span key={index} className={styles.material}>
                    {material}
                  </span>
                ))}
              </div>
            </section>

            {product.dimensionsCm && (
              <section className={styles.detailSection}>
                <h3 className={styles.detailTitle}>{t("product.dimensions")}</h3>
                <div className={styles.dimensions}>
                  {product.dimensionsCm.d && <span>⌀ {product.dimensionsCm.d}cm</span>}
                  {product.dimensionsCm.w && <span>W {product.dimensionsCm.w}cm</span>}
                  {product.dimensionsCm.h && <span>H {product.dimensionsCm.h}cm</span>}
                </div>
              </section>
            )}

            {product.weightKg && (
              <section className={styles.detailSection}>
                <h3 className={styles.detailTitle}>{t("product.weight")}</h3>
                <p className={styles.weight}>{product.weightKg}kg</p>
              </section>
            )}

            <section className={styles.detailSection}>
              <h3 className={styles.detailTitle}>{t("product.care")}</h3>
              <ul className={styles.careList}>
                {product.care.map((instruction, index) => (
                  <li key={index} className={styles.careItem}>
                    {instruction}
                  </li>
                ))}
              </ul>
            </section>

            {product.heatSafe && (
              <div className={styles.badge}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2L10 6H14L11 9L12 14L8 11L4 14L5 9L2 6H6L8 2Z" fill="currentColor" />
                </svg>
                <span>{t("product.heatSafe")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Purchase Sidebar */}
        <div className={styles.sidebarSection}>
          <PurchaseSidebar product={product} dictionary={dictionary} locale={locale} />
        </div>
      </div>
    </div>
  )
}
