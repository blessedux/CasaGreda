"use client"

import { useState } from "react"
import { Button } from "../../design-system"
import { priceForQty, formatPrice } from "../../lib/pricing"
import { addItemToCart } from "../../app/actions/cart"
import type { Dictionary } from "../../lib/i18n"
import type { Product } from "../../lib/rooms"
import PriceBreakdown from "./PriceBreakdown"
import styles from "./PurchaseSidebar.module.css"

interface PurchaseSidebarProps {
  product: Product
  dictionary: Dictionary
  locale: "es" | "en"
}

export default function PurchaseSidebar({ product, dictionary, locale }: PurchaseSidebarProps) {
  const [selectedQty, setSelectedQty] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = dictionary

    for (const k of keys) {
      value = value?.[k]
    }

    return typeof value === "string" ? value : key
  }

  const pricing = priceForQty(product.priceTiers, selectedQty)
  const availableQuantities = product.priceTiers
    .map((tier) => tier.qty)
    .filter((qty) => qty <= product.stock)
    .sort((a, b) => a - b)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)

    try {
      const productTitle = locale === "en" && product.title.en ? product.title.en : product.title.es
      const productImage = product.gallery[0]?.src || "/placeholder.svg"

      const result = await addItemToCart({
        productId: product.id,
        slug: product.slug,
        title: productTitle,
        image: productImage,
        quantity: selectedQty,
        unitPrice: pricing.unit,
      })

      if (result.success) {
        // Show success feedback (could add toast here)
        console.log("Successfully added to cart")
      } else {
        console.error("Failed to add to cart:", result.error)
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    }

    setIsAddingToCart(false)
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        {/* Stock Status */}
        <div className={styles.stockStatus}>
          {product.stock > 0 ? (
            <span className={styles.inStock}>
              {product.stock} {t("product.units")} {t("product.stock")}
            </span>
          ) : (
            <span className={styles.outOfStock}>Sin stock</span>
          )}
        </div>

        {/* Quantity Selector */}
        <div className={styles.quantitySection}>
          <h3 className={styles.sectionTitle}>Cantidad</h3>
          <div className={styles.quantityGrid}>
            {availableQuantities.map((qty) => {
              const qtyPricing = priceForQty(product.priceTiers, qty)
              const isSelected = selectedQty === qty
              const savings = qtyPricing.savings || 0

              return (
                <button
                  key={qty}
                  className={`${styles.quantityOption} ${isSelected ? styles.selected : ""}`}
                  onClick={() => setSelectedQty(qty)}
                  disabled={qty > product.stock}
                >
                  <div className={styles.quantityLabel}>
                    {qty} {qty === 1 ? "unidad" : "unidades"}
                  </div>
                  <div className={styles.quantityPrice}>{formatPrice(qtyPricing.unit, locale)}</div>
                  {savings > 0 && <div className={styles.quantitySavings}>Ahorra {formatPrice(savings, locale)}</div>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Price Breakdown */}
        <PriceBreakdown pricing={pricing} quantity={selectedQty} locale={locale} dictionary={dictionary} />

        {/* Add to Cart */}
        <div className={styles.addToCartSection}>
          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAddingToCart}
            className={styles.addToCartButton}
          >
            {isAddingToCart ? t("common.loading") : t("product.addToCart")}
          </Button>
        </div>

        {/* Shipping Info */}
        {product.shippingNotes && (
          <div className={styles.shippingInfo}>
            <h4 className={styles.shippingTitle}>{t("cart.shipping")}</h4>
            <p className={styles.shippingText}>{product.shippingNotes}</p>
          </div>
        )}

        {/* Packaging Promise */}
        <div className={styles.packagingPromise}>
          <div className={styles.promiseIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 1L13 7H19L14 11L16 18L10 14L4 18L6 11L1 7H7L10 1Z" fill="currentColor" />
            </svg>
          </div>
          <p className={styles.promiseText}>{t("cart.packagingPromise")}</p>
        </div>
      </div>
    </div>
  )
}
