import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getDictionary, getLocaleFromHeaders } from "../../../lib/i18n"
import { headers } from "next/headers"
import RoomScene from "../../../components/room/RoomScene"
import { getRoomData } from "../../../lib/rooms"

interface RoomPageProps {
  params: {
    room: string
  }
}

export default async function RoomPage({ params }: RoomPageProps) {
  const headersList = headers()
  const locale = getLocaleFromHeaders(headersList)
  const dict = await getDictionary(locale)

  const roomData = await getRoomData(params.room)

  if (!roomData) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="flex-center min-h-screen">Cargando sala...</div>}>
        <RoomScene room={roomData} dictionary={dict} locale={locale} />
      </Suspense>
    </main>
  )
}

export async function generateStaticParams() {
  return [{ room: "comedor" }, { room: "cocina" }, { room: "rituales" }, { room: "regalos" }]
}
