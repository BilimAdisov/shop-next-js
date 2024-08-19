"use client";

import { useGetStoreProductsByIdQuery } from "@/services/product.service";
import { useParams } from "next/navigation";
import ImageGalleryComponent from "@/components/UI/ImageGallery";
import Button from "@/components/UI/CustomButton";
import "./style.css";

export default function page() {
  const { product } = useParams();
  const { data } = useGetStoreProductsByIdQuery(
    {
      productId: product,
      language: "KYRGYZ",
    },
    {
      skip: !product,
    }
  );

  const ImageRefactore = data?.images?.map((item) => {
    return {
      original: item,
      thumbnail: item,
    };
  });

  const handleAddToCart = (item) => {
    dispatch(
      addToList({
        id: item?.id,
        mainImage: item?.mainImage,
        name: item?.name,
        price: item?.price,
        description: item?.description,
      })
    );
  };

  return (
    <div className="px-24 w-full  mt-[60px] lg:px-16 md:px-12 sm:px-4 xs:px-2 py-5">
      <div className="flex flex-col">
        <div className="w-[100%] z-[0]">
          <ImageGalleryComponent
            images={ImageRefactore ?? []}
            position="bottom"
          />
        </div>
        <div className="w-[100%]">
          <div className="flex flex-col  items-center">
            <h1 className="text-center text-[22px] ">Товар: {data?.name}</h1>
            <span className="w-fit">Цена: {data?.price}</span>
            <Button>Купить</Button>
          </div>
        </div>
      </div>
      <div>
        <p className="py-10">{data?.description}</p>
      </div>
    </div>
  );
}
