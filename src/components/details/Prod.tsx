import { DetailsLayout } from "./DetailsLayout";

import { ProdType } from "@/types";

interface ProdProps {
  data: ProdType[];
}
export const Prod = ({ data }: ProdProps) => {
  return (
    <DetailsLayout label="제작사">
      <div className="mt-5">
        <div className="h-[100px]">
          <img
            src={`https://image.tmdb.org/t/p/w400${data[0]?.logo_path}`}
            className="h-full p-5 bg-primary-content"
          />
        </div>
        <p className="text-lg text-primary-content font-bold">{`${data[0]?.name}(${data[0]?.origin_country})`}</p>
      </div>
    </DetailsLayout>
  );
};
