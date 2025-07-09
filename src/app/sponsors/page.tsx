import Content from "@/content/sponsors_page.json";
import Navbar from "@/components/Navbar";
import Block, { validateBlockContent } from "@/components/Block";
import UnderConstruction from "@/components/UnderConstruction";

export function generateMetadata() {
  return {
    title: Content.title,
    description: Content.description,
  };
}

export default function Page() {
  if (Content.sections.length === 0) {
    return UnderConstruction();
  }

  return (
    <>
      <Navbar alwaysShow={true} />
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
