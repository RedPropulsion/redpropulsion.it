type Props = {
  statistics: { name: string; value: string }[];
};

export default function Stats({ statistics }: Props) {
  return (
    <div className="flex justify-evenly my-8 text-center flex-wrap gap-4">
      {statistics.map((item, i) => (
        <div key={i} className="w-1/3 md:w-fit">
          <h2 className="font-condensed text-gradient text-4xl md:text-6xl font-bold">
            {item.value}
          </h2>
          <p className="font-condensed capitalize text-xl">{item.name}</p>
        </div>
      ))}
    </div>
  );
}
