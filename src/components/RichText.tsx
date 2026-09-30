import ReactMarkdown from "react-markdown";

type Props = {
  content: string;
};

function preprocessContent(content: string): string {
  // Markdown uses two trailing spaces for a line break. Keep blank lines as
  // paragraph separators without enabling raw HTML in editable content.
  return content.replace(/(?<!\n)\n(?!\n)/g, "  \n");
}

export default function RichText({ content }: Props) {
  return (
    <div className="rich-text">
      <ReactMarkdown>
        {preprocessContent(content)}
      </ReactMarkdown>
    </div>
  );
}
