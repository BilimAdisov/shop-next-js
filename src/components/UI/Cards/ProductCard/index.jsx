import { Court, Favorite } from "@/assets/icons/Icons";
import { addToList } from "@/store/slices/localCart.slice";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ProductCard = memo(({ mainImage, price, name, link, id }) => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToList({ id, mainImage, price, name }));
  };
  const isCart = cartList?.find((elem) => elem?.id === id);

  console.log(isCart);

  return (
    <Link
      id={id}
      href={`/${link}`}
      className="w-[220px] h-fit p-1 bg-white shadow-lg rounded-md cursor-pointer"
    >
      <div className="rounded-xl w-full h-48 xs:h-36">
        <Image
          width={300}
          height={400}
          src={mainImage}
          alt="image"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="ml-1">
        <p className="text-sm">{price} сом</p>
        <p className="text-xs font-light">{name}</p>
      </div>
      <div className="w-full h-8 mt-2 overflow-hidden">
        <div className="flex items-center gap-1">
          <div
            className="bg-[#D9D9D9] w-full flex justify-center items-center py-1 rounded-3xl cursor-pointer gap-3"
            onClick={(e) => handleAddToCart(e)}
          >
            <Court color={isCart ? "#04b004" : "#505050"} /> {isCart?.amount}
          </div>
          <div className="w-fit bg-gray-20 p-1 rounded-full bg-[#D9D9D9] cursor-pointer">
            <Favorite color="#505050" />
          </div>
        </div>
      </div>
    </Link>
  );
});
