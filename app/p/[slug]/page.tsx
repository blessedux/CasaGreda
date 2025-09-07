import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getDictionary, getLocaleFromHeaders } from "../../../lib/i18n"
import { headers } from "next/headers"
import { getProductBySlug } from "../../../lib/rooms"
import ProductFocus from "../../../components/product/ProductFocus"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const headersList = headers()
  const locale = getLocaleFromHeaders(headersList)
  const dict = await getDictionary(locale)

  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="flex-center min-h-screen">Cargando pieza...</div>}>
        <ProductFocus product={product} dictionary={dict} locale={locale} />
      </Suspense>
    </main>
  )
}
