import { formatPrice } from "../../lib/pricing"
import type { Dictionary } from "../../lib/i18n"
import type { PriceCalculation } from "../../lib/pricing"
import styles from "./PriceBreakdown.module.css"

interface PriceBreakdownProps {
  pricing: PriceCalculation
  quantity: number
  locale: "es" | "en"
  dictionary: Dictionary
}

export default function PriceBreakdown({ pricing, quantity, locale, dictionary }: PriceBreakdownProps) {
  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = dictionary

    for (const k of keys) {
      value = value?.[k]
    }

    return typeof value === "string" ? value : key
  }

  return (
    <div className={styles.priceBreakdown}>
      <div className={styles.priceRow}>
        <span className={styles.priceLabel}>
          {t("product.unitPrice")} ({quantity} {quantity === 1 ? "unidad" : "unidades"})
        </span>
        <span className={styles.priceValue}>{formatPrice(pricing.unit, locale)}</span>
      </div>

      {pricing.savings && pricing.savings > 0 && (
        <div className={styles.priceRow}>
          <span className={styles.savingsLabel}>Ahorro total</span>
          <span className={styles.savingsValue}>-{formatPrice(pricing.savings, locale)}</span>
        </div>
      )}

      <div className={`${styles.priceRow} ${styles.totalRow}`}>
        <span className={styles.totalLabel}>{t("product.total")}</span>
        <span className={styles.totalValue}>{formatPrice(pricing.total, locale)}</span>
      </div>
    </div>
  )
}
