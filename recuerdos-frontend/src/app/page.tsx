"use client"

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Roboto } from "next/font/google"

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  const router = useRouter();
  
  return (
    <div className="justify-center items-center">
      <div className="flex flex-col w-1/2 space-y-2">
        <span>Hola mi amooor!</span>
        <span>El siguiente proyecto lo hice pensando en tí, con mucho Mucho MUCHO cariño.</span>
        <span>Me divertí mucho, aprendí un montón de cosas.</span>
        <span>Que sepas que eres muy importante para mí. No es perfecto 👉👈, pero lo dí todo. Te mereces esto y mucho más.</span>
        <span>Lo siguiente que verás son recuerdos, todos y cada uno de ellos.</span>
        <span>Besito para ti, mmmmmuak</span>  
      </div>
      <Button onClick={() => {router.push(`recuerdos`)}} variant="contained">Presioname porfis</Button>
    </div>
  )
}