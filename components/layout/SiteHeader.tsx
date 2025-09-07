"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../design-system"
import CartDrawer from "./CartDrawer"
import type { Cart } from "../../lib/cart"
import type { Dictionary } from "../../lib/i18n"
import styles from "./SiteHeader.module.css"

interface SiteHeaderProps {
  cart: Cart
  dictionary: Dictionary
  locale: "es" | "en"
}

export default function SiteHeader({ cart, dictionary, locale }: SiteHeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = dictionary

    for (const k of keys) {
      value = value?.[k]
    }

    return typeof value === "string" ? value : key
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>Casa Greda</span>
          </Link>

          <nav className={styles.nav}>
            <Link href="/rooms/comedor" className={styles.navLink}>
              {t("rooms.comedor")}
            </Link>
            <Link href="/rooms/cocina" className={styles.navLink}>
              {t("rooms.cocina")}
            </Link>
            <Link href="/rooms/rituales" className={styles.navLink}>
              {t("rooms.rituales")}
            </Link>
            <Link href="/rooms/regalos" className={styles.navLink}>
              {t("rooms.regalos")}
            </Link>
          </nav>

          <div className={styles.actions}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(true)}
              className={styles.cartButton}
              aria-label={`${t("nav.cart")} (${cart.totalItems} productos)`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3 3H5L5.4 5M7 13H15L19 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H15M15 13V16.5M9 19.5C9.8 19.5 10.5 18.8 10.5 18S9.8 16.5 9 16.5 7.5 17.2 7.5 18 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 18.8 21.5 18S20.8 16.5 20 16.5 18.5 17.2 18.5 18 19.2 19.5 20 19.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {cart.totalItems > 0 && <span className={styles.cartBadge}>{cart.totalItems}</span>}
            </Button>
          </div>
        </div>
      </header>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        initialCart={cart}
        dictionary={dictionary}
        locale={locale}
      />
    </>
  )
}
