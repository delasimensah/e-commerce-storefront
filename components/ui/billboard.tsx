import { Billboard } from "@/types";

interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  console;
  return (
    <div className="overflow-hidden rounded-xl p-4 sm:p-6 lg:p-8">
      <div
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className="relative aspect-square overflow-hidden rounded-xl bg-black/20 bg-cover bg-center md:aspect-[2.4/1]"
      >
        <div className="relative z-30 flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
          <div className="max-w-xs text-3xl font-bold sm:max-w-xl sm:text-5xl lg:text-6xl">
            {data.label}
          </div>
        </div>

        <div className="absolute left-0 top-0 z-20 h-full w-full bg-white/30" />
      </div>
    </div>
  );
};

export default Billboard;
