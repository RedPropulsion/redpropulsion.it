import Content from "@/content/departments_page.json";
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
