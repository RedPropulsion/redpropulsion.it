import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-dvh flex flex-col justify-center items-center font-condensed text-2xl">
      <h2 className="text-6xl text-gradient font-bold mb-4">Not Found</h2>
      <p>La pagina richiesta non esiste</p>
      <Link href="/" className="underline">
        Torna alla home
      </Link>
    </div>
  );
}
