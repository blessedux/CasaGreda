// Casa Greda Pricing Logic

export interface PriceTier {
  qty: number
  unitPrice: number
}

export interface PriceCalculation {
  unit: number
  total: number
  savings?: number
  tier: PriceTier
}

export function priceForQty(priceTiers: PriceTier[], qty: number): PriceCalculation {
  if (!priceTiers.length) {
    throw new Error("Price tiers cannot be empty")
  }

  // Sort tiers by quantity ascending
  const sortedTiers = [...priceTiers].sort((a, b) => a.qty - b.qty)

  // Find the best tier for the requested quantity
  let bestTier = sortedTiers[0]

  for (const tier of sortedTiers) {
    if (qty >= tier.qty) {
      bestTier = tier
    } else {
      break
    }
  }

  const unit = bestTier.unitPrice
  const total = unit * qty

  // Calculate savings compared to single unit price
  const singleUnitPrice = sortedTiers[0].unitPrice
  const savings = qty > 1 ? singleUnitPrice * qty - total : undefined

  return {
    unit,
    total,
    savings,
    tier: bestTier,
  }
}

export function formatPrice(price: number, locale: "es" | "en" = "es"): string {
  if (locale === "en") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price / 800) // Rough CLP to USD conversion for display
  }

  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function calculatePackSavings(priceTiers: PriceTier[], qty: number): number {
  const calculation = priceForQty(priceTiers, qty)
  return calculation.savings || 0
}
