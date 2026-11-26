import type { HostInfo } from "@/types/room";

interface HostInformationProps {
  host: HostInfo;
  description: string;
  maxGuests: number;
}

export const HostInformation = ({ host, description, maxGuests }: HostInformationProps) => (
  <section className="border-b border-neutral-200 py-6">
    <div className="flex items-center gap-4">
      <div aria-hidden="true" className="flex size-14 shrink-0 items-center justify-center rounded-full bg-rose-100 text-lg font-semibold text-rose-700">{host.name.slice(0, 1)}</div>
      <div>
        <h2 className="font-semibold text-neutral-900">Anfitrión: {host.name}</h2>
        <p className="mt-1 text-sm text-neutral-500">{host.joinedLabel}{host.isSuperhost ? " · Superanfitrión" : ""}</p>
      </div>
    </div>
    <p className="mt-5 text-sm leading-6 text-neutral-700">{description}</p>
    <p className="mt-3 text-sm text-neutral-600">Hasta {maxGuests} huéspedes</p>
  </section>
);
