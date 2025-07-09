import Link from "next/link";
import Navbar from "./Navbar";

export default function UnderConstruction() {
  return (
    <>
      <Navbar alwaysShow />
      <div className="flex flex-col justify-center items-center h-[600px] font-condensed text-2xl">
        <h2 className="font-condensed text-gradient text-5xl font-bold mb-4">
          La pagina è in allestimento! 🏗️
        </h2>
        <p>
          Nel frattempo consulta{" "}
          <a
            href="https://www.instagram.com/red_propulsion/"
            className="underline cursor-pointer hover:text-primary"
          >
            il nostro Instagram!
          </a>
        </p>

        <p>
          Oppure{" "}
          <Link
            href="/"
            className="underline cursor-pointer hover:text-primary"
          >
            torna alla Home
          </Link>
        </p>
      </div>
    </>
  );
}
