type Props = {
  children: React.ReactNode;
};

export default function Bounded({ children }: Props) {
  return <div className="max-w-[800px] px-8 my-8 mx-auto">{children}</div>;
}
