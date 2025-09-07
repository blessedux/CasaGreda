// Casa Greda Cart Management

import { cookies } from "next/headers"

export interface CartItem {
  productId: string
  slug: string
  title: string
  image: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

const CART_COOKIE_NAME = "casa-greda-cart"

export function getCartFromCookies(): Cart {
  try {
    const cookieStore = cookies()
    const cartCookie = cookieStore.get(CART_COOKIE_NAME)

    if (!cartCookie?.value) {
      return { items: [], totalItems: 0, totalPrice: 0 }
    }

    const cart = JSON.parse(cartCookie.value) as Cart
    return cart
  } catch {
    return { items: [], totalItems: 0, totalPrice: 0 }
  }
}

export function calculateCartTotals(items: CartItem[]): { totalItems: number; totalPrice: number } {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.total, 0)

  return { totalItems, totalPrice }
}

export function addToCart(cart: Cart, newItem: Omit<CartItem, "total">): Cart {
  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId === newItem.productId && item.unitPrice === newItem.unitPrice,
  )

  let updatedItems: CartItem[]

  if (existingItemIndex >= 0) {
    // Update existing item
    updatedItems = cart.items.map((item, index) => {
      if (index === existingItemIndex) {
        const newQuantity = item.quantity + newItem.quantity
        return {
          ...item,
          quantity: newQuantity,
          total: newQuantity * item.unitPrice,
        }
      }
      return item
    })
  } else {
    // Add new item
    const cartItem: CartItem = {
      ...newItem,
      total: newItem.quantity * newItem.unitPrice,
    }
    updatedItems = [...cart.items, cartItem]
  }

  const { totalItems, totalPrice } = calculateCartTotals(updatedItems)

  return {
    items: updatedItems,
    totalItems,
    totalPrice,
  }
}

export function removeFromCart(cart: Cart, productId: string, unitPrice: number): Cart {
  const updatedItems = cart.items.filter((item) => !(item.productId === productId && item.unitPrice === unitPrice))

  const { totalItems, totalPrice } = calculateCartTotals(updatedItems)

  return {
    items: updatedItems,
    totalItems,
    totalPrice,
  }
}

export function updateCartItemQuantity(cart: Cart, productId: string, unitPrice: number, quantity: number): Cart {
  if (quantity <= 0) {
    return removeFromCart(cart, productId, unitPrice)
  }

  const updatedItems = cart.items.map((item) => {
    if (item.productId === productId && item.unitPrice === unitPrice) {
      return {
        ...item,
        quantity,
        total: quantity * item.unitPrice,
      }
    }
    return item
  })

  const { totalItems, totalPrice } = calculateCartTotals(updatedItems)

  return {
    items: updatedItems,
    totalItems,
    totalPrice,
  }
}

export function clearCart(): Cart {
  return { items: [], totalItems: 0, totalPrice: 0 }
}
