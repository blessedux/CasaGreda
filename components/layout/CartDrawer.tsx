"use client"

import { useState, useEffect } from "react"
import { Button } from "../../design-system"
import { formatPrice } from "../../lib/pricing"
import { removeItemFromCart, updateItemQuantity } from "../../app/actions/cart"
import type { Cart } from "../../lib/cart"
import type { Dictionary } from "../../lib/i18n"
import styles from "./CartDrawer.module.css"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  initialCart: Cart
  dictionary: Dictionary
  locale: "es" | "en"
}

export default function CartDrawer({ isOpen, onClose, initialCart, dictionary, locale }: CartDrawerProps) {
  const [cart, setCart] = useState(initialCart)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = dictionary

    for (const k of keys) {
      value = value?.[k]
    }

    return typeof value === "string" ? value : key
  }

  useEffect(() => {
    setCart(initialCart)
  }, [initialCart])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleRemoveItem = async (productId: string, unitPrice: number) => {
    const itemKey = `${productId}-${unitPrice}`
    setIsUpdating(itemKey)

    // Optimistic update
    const updatedItems = cart.items.filter((item) => !(item.productId === productId && item.unitPrice === unitPrice))
    const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = updatedItems.reduce((sum, item) => sum + item.total, 0)

    setCart({ items: updatedItems, totalItems, totalPrice })

    try {
      await removeItemFromCart(productId, unitPrice)
    } catch (error) {
      // Revert on error
      setCart(initialCart)
      console.error("Failed to remove item:", error)
    }

    setIsUpdating(null)
  }

  const handleUpdateQuantity = async (productId: string, unitPrice: number, newQuantity: number) => {
    const itemKey = `${productId}-${unitPrice}`
    setIsUpdating(itemKey)

    // Optimistic update
    const updatedItems = cart.items
      .map((item) => {
        if (item.productId === productId && item.unitPrice === unitPrice) {
          return {
            ...item,
            quantity: newQuantity,
            total: newQuantity * item.unitPrice,
          }
        }
        return item
      })
      .filter((item) => item.quantity > 0)

    const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = updatedItems.reduce((sum, item) => sum + item.total, 0)

    setCart({ items: updatedItems, totalItems, totalPrice })

    try {
      await updateItemQuantity(productId, unitPrice, newQuantity)
    } catch (error) {
      // Revert on error
      setCart(initialCart)
      console.error("Failed to update quantity:", error)
    }

    setIsUpdating(null)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} />

      {/* Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("nav.cart")}</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label={t("common.close")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {cart.items.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>{t("cart.empty")}</p>
            </div>
          ) : (
            <>
              <div className={styles.items}>
                {cart.items.map((item) => {
                  const itemKey = `${item.productId}-${item.unitPrice}`
                  const isItemUpdating = isUpdating === itemKey

                  return (
                    <div key={itemKey} className={`${styles.item} ${isItemUpdating ? styles.updating : ""}`}>
                      <div className={styles.itemImage}>
                        <img src={item.image || "/placeholder.svg"} alt={item.title} loading="lazy" />
                      </div>

                      <div className={styles.itemDetails}>
                        <h3 className={styles.itemTitle}>{item.title}</h3>
                        <p className={styles.itemPrice}>{formatPrice(item.unitPrice, locale)} c/u</p>

                        <div className={styles.itemControls}>
                          <div className={styles.quantityControls}>
                            <button
                              onClick={() => handleUpdateQuantity(item.productId, item.unitPrice, item.quantity - 1)}
                              disabled={isItemUpdating || item.quantity <= 1}
                              className={styles.quantityButton}
                              aria-label="Disminuir cantidad"
                            >
                              -
                            </button>
                            <span className={styles.quantity}>{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.productId, item.unitPrice, item.quantity + 1)}
                              disabled={isItemUpdating}
                              className={styles.quantityButton}
                              aria-label="Aumentar cantidad"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.productId, item.unitPrice)}
                            disabled={isItemUpdating}
                            className={styles.removeButton}
                            aria-label="Eliminar producto"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path
                                d="M12 4L4 12M4 4L12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>

                        <p className={styles.itemTotal}>{formatPrice(item.total, locale)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className={styles.footer}>
                <div className={styles.total}>
                  <span className={styles.totalLabel}>Total ({cart.totalItems} productos)</span>
                  <span className={styles.totalPrice}>{formatPrice(cart.totalPrice, locale)}</span>
                </div>

                <Button size="lg" className={styles.checkoutButton}>
                  {t("cart.checkout")}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
