import Link from "next/link";

interface RoomNotFoundProps {
  roomId: string;
}

export const RoomNotFound = ({ roomId }: RoomNotFoundProps) => (
  <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-16 text-center">
    <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Alojamiento no encontrado</p>
    <h1 className="mt-3 text-2xl font-semibold text-neutral-900">No encontramos este alojamiento</h1>
    <p className="mt-2 text-sm text-neutral-600">El identificador «{roomId}» no corresponde a un anuncio disponible.</p>
    <Link href="/catalog" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-neutral-900 px-5 text-sm font-semibold text-white hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500">Volver al catálogo</Link>
  </main>
);
