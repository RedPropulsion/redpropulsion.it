import Content from "@/content/sponsors.json";

export default function Sponsors() {
  return Content.sponsors.length > 0 ? (
    <div className="bg-background-dark">
      <h2 className="font-condensed text-center text-gradient text-5xl font-bold">
        I nostri sponsor
      </h2>
      <div className="flex justify-center py-16 flex-wrap mx-auto gap-8">
        {Content.sponsors.map((item, i) => (
          <a key={i} href={item.url}>
            <div className="flex flex-col">
              <img src={item.image} alt={item.name} className="h-20" />
            </div>
          </a>
        ))}
      </div>
    </div>
  ) : (
    ""
  );
}
