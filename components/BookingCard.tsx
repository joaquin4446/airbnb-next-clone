"use client";

import { useState } from "react";
import { GuestSelector } from "@/components/GuestSelector";

interface BookingCardProps {
  pricePerNight: number;
  maxGuests: number;
  estimatedNights: number;
}

const formatPrice = (price: number) => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price);

export const BookingCard = ({ pricePerNight, maxGuests, estimatedNights }: BookingCardProps) => {
  const [guestCount, setGuestCount] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const total = pricePerNight * estimatedNights;

  return (
    <aside aria-label="Simulación de reserva" className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-lg sm:p-6">
      <p className="text-xl font-semibold text-neutral-900">{formatPrice(pricePerNight)} <span className="text-sm font-normal text-neutral-600">por noche</span></p>
      <div className="mt-5 rounded-xl border border-neutral-300 p-4">
        <GuestSelector value={guestCount} max={maxGuests} onChange={setGuestCount} />
      </div>
      <p className="mt-3 text-xs leading-5 text-neutral-500">El precio no cambia por número de huéspedes. Estimación para {estimatedNights} noches.</p>
      <button type="button" onClick={() => setIsConfirmed(true)} className="mt-5 min-h-12 w-full rounded-xl bg-[#ff385c] px-4 text-sm font-semibold text-white transition hover:bg-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500">Reservar</button>
      <p className="mt-3 text-center text-xs text-neutral-500">No se realizará ningún cobro</p>
      <div className="mt-5 flex justify-between border-t border-neutral-200 pt-4 text-sm">
        <span>{formatPrice(pricePerNight)} × {estimatedNights} noches</span>
        <span className="font-semibold">{formatPrice(total)}</span>
      </div>
      <div className="mt-3 flex justify-between text-sm font-semibold text-neutral-900">
        <span>Total estimado · {guestCount} {guestCount === 1 ? "huésped" : "huéspedes"}</span>
        <span>{formatPrice(total)}</span>
      </div>
      {isConfirmed && <p role="status" className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">Solicitud de demostración preparada para {guestCount} {guestCount === 1 ? "huésped" : "huéspedes"}. Total estimado: {formatPrice(total)}.</p>}
    </aside>
  );
};
