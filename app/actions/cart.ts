"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  getCartFromCookies,
  type CartItem,
} from "../../lib/cart"

const CART_COOKIE_NAME = "casa-greda-cart"
const CART_COOKIE_OPTIONS = {
  httpOnly: false, // Allow client-side access for optimistic updates
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 30, // 30 days
}

export async function addItemToCart(item: Omit<CartItem, "total">) {
  try {
    const currentCart = getCartFromCookies()
    const updatedCart = addToCart(currentCart, item)

    const cookieStore = cookies()
    cookieStore.set(CART_COOKIE_NAME, JSON.stringify(updatedCart), CART_COOKIE_OPTIONS)

    revalidatePath("/")

    return { success: true, cart: updatedCart }
  } catch (error) {
    console.error("Error adding item to cart:", error)
    return { success: false, error: "Failed to add item to cart" }
  }
}

export async function removeItemFromCart(productId: string, unitPrice: number) {
  try {
    const currentCart = getCartFromCookies()
    const updatedCart = removeFromCart(currentCart, productId, unitPrice)

    const cookieStore = cookies()
    cookieStore.set(CART_COOKIE_NAME, JSON.stringify(updatedCart), CART_COOKIE_OPTIONS)

    revalidatePath("/")

    return { success: true, cart: updatedCart }
  } catch (error) {
    console.error("Error removing item from cart:", error)
    return { success: false, error: "Failed to remove item from cart" }
  }
}

export async function updateItemQuantity(productId: string, unitPrice: number, quantity: number) {
  try {
    const currentCart = getCartFromCookies()
    const updatedCart = updateCartItemQuantity(currentCart, productId, unitPrice, quantity)

    const cookieStore = cookies()
    cookieStore.set(CART_COOKIE_NAME, JSON.stringify(updatedCart), CART_COOKIE_OPTIONS)

    revalidatePath("/")

    return { success: true, cart: updatedCart }
  } catch (error) {
    console.error("Error updating item quantity:", error)
    return { success: false, error: "Failed to update item quantity" }
  }
}

export async function clearCartAction() {
  try {
    const emptyCart = clearCart()

    const cookieStore = cookies()
    cookieStore.set(CART_COOKIE_NAME, JSON.stringify(emptyCart), CART_COOKIE_OPTIONS)

    revalidatePath("/")

    return { success: true, cart: emptyCart }
  } catch (error) {
    console.error("Error clearing cart:", error)
    return { success: false, error: "Failed to clear cart" }
  }
}
