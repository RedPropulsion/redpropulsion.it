import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  content: string;
};

export default function RichText({ content }: Props) {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>;
}
