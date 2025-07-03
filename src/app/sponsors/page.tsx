import Content from "@/content/sponsors.json";
import Navbar from "@/components/Navbar";
import Block, { validateBlockContent } from "@/components/Block";

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
