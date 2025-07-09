import Content from "@/content/sponsors.json";
import { Award } from "lucide-react";

export default function Sponsors() {
  return Content.sponsors.length > 0 ? (
    <div className="bg-background-dark">
      <h2 className="font-condensed text-center text-gradient text-5xl font-bold">
        I nostri sponsor
      </h2>
      <div className="flex justify-center py-4 flex-wrap mx-auto">
        {Content.sponsors.map((item, i) => (
          <a key={i} href={item.url}>
            <div className="flex flex-col">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-20" />
              ) : (
                <Award className="w-full h-40" />
              )}
              <p className="text-center">{item.name}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  ) : (
    ""
  );
}
