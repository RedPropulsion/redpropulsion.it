import Content from "@/content/sponsors.json";
import { Block, validateBlockContent } from "../page";
import Navbar from "@/components/Navbar";

export function generateMetadata() {
  return {
    title: Content.title,
    description: Content.description,
  };
}

export default function Page() {
  return (
    <>
      <Navbar alwaysShow />
      <div
        style={{
          height: "100px",
        }}
      ></div>
      {Content.sections.map((content, i) => {
        validateBlockContent(content);
        return <Block content={content} key={i} />;
      })}
    </>
  );
}
