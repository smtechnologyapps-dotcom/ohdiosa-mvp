import type { Metadata } from "next";
import { FittingRoomContainer } from "@/components/fitting-room/FittingRoomContainer";

export const metadata: Metadata = {
  title: "Probador Virtual & Avatar 360° | OHDIOSA",
  description:
    "Experimenta la alta costura en silueta real. Combina vestidos, blazers, joyería y accesorios en tiempo real con el probador interactivo de OHDIOSA.",
};

export default function FittingRoomPage() {
  return (
    <div className="pt-24 pb-16 bg-background text-foreground min-h-screen">
      <FittingRoomContainer />
    </div>
  );
}
