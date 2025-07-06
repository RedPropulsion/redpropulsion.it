import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  content: string;
};

function preprocessContent(content: string): string {
  // This ugly regex replaces a single '\n' with <br />
  //
  // Multiples \n are preserved as they represent separaton
  // between paragraphs
  return content.replaceAll(/(?<!\n)\n(?!\n)/g, "<br />");
}

export default function RichText({ content }: Props) {
  return (
    <div className="rich-text">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {preprocessContent(content)}
      </ReactMarkdown>
    </div>
  );
}
