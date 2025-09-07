import { type NextRequest, NextResponse } from "next/server"
import { getCartFromCookies, clearCart } from "../../lib/cart"
import { cookies } from "next/headers"

// Mock Stripe integration - replace with real Stripe when ready
export async function POST(request: NextRequest) {
  try {
    const cart = getCartFromCookies()

    if (cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    const body = await request.json()
    const { email, shippingAddress } = body

    // Mock payment processing
    const orderId = `CG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, you would:
    // 1. Create Stripe payment intent
    // 2. Process payment
    // 3. Save order to database
    // 4. Send confirmation email
    // 5. Update inventory

    // Clear cart after successful order
    const cookieStore = cookies()
    const emptyCart = clearCart()
    cookieStore.set("casa-greda-cart", JSON.stringify(emptyCart), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    })

    return NextResponse.json({
      success: true,
      orderId,
      message: "Pedido procesado exitosamente",
      order: {
        id: orderId,
        items: cart.items,
        total: cart.totalPrice,
        email,
        shippingAddress,
        status: "confirmed",
        estimatedDelivery: "3-5 días hábiles",
      },
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Error processing checkout" }, { status: 500 })
  }
}
