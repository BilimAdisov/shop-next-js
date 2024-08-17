"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "@/components/UI/Cards/ProductCard";
import {
  useGetStoreProductsByIdQuery,
  useGetStoreProductsQuery,
} from "@/services/product.service";
import { useGetOneStoreQuery } from "@/services/store.service";

export default function Main() {
  const { search } = useSelector((state) => state.helper);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  // const { data: AdminStore } = useGetOneStoreQuery({ language: "RUSSIAN" });

  // const { data } = useGetStoreProductsQuery(
  //   {
  //     storeId: AdminStore?.id,
  //     page: page,
  //     size: size,
  //     search: search,
  //   },
  //   { skip: !AdminStore }
  // );

  const { data } = useGetStoreProductsQuery({
    page: 1,
    size: 10,
    storeId: "4a19cc4a-53be-41d5-afba-e63fd6a6931c",
  });

  return (
    <div className="w-full pt-5">
      <div className="w-full ">
        <div className="flex gap-1 flex-row flex-wrap">
          {data?.content?.map((item) => (
            <ProductCard
              key={item?.id}
              id={item?.id}
              mainImage={item?.mainImage}
              price={item?.price}
              name={item?.name}
              link={item?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
