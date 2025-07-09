import Content from "@/content/sponsors.json";

export default function Sponsors() {
  return Content.sponsors.length > 0 ? (
    <div className="bg-background-dark px-4">
      <h2 className="font-condensed text-center text-gradient text-5xl font-bold">
        I nostri sponsor
      </h2>
      <div className="flex justify-center items-center  py-16 flex-wrap mx-auto gap-8">
        {Content.sponsors.map((item, i) => (
          <a key={i} href={item.url}>
            <img src={item.image} alt={item.name} className="w-40" />
          </a>
        ))}
      </div>
    </div>
  ) : (
    ""
  );
}
