"use client";

import {
  decrementCart,
  incrementCart,
  removeFromList,
} from "@/store/slices/localCart.slice";
import Image from "next/image";
import { memo, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const DataList = [
  {
    url: "https://www.apple.com/v/ipad-10.9/c/images/overview/hero/hero__ecv967jz1y82_large.jpg",
    name: "Ipad pro 12 retina m2",
    coast: 120000,
    amount: 1,
  },
];

const createMessageFromDataList = (dataList) => {
  return dataList
    .map(
      (item) =>
        `${item.name}\nЦена: ${item.coast} сом\nКоличество: ${item.amount}\nИзображение: ${item.url}`
    )
    .join("\n\n");
};

const generateWhatsAppUrl = (phoneNumber, message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
};

export default function Cart() {
  const { cartList } = useSelector((state) => state.cart);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleWhatsAppRedirect = () => {
    const messageText = `Здравствуйте\n\n${createMessageFromDataList(
      DataList
    )}`;
    setMessage(messageText);
    setShowModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message).then(() => {
      alert("Текст скопирован в буфер обмена");
    });
  };

  const openWhatsApp = async () => {
    const phoneNumber = "+996708521328";
    const messageText = `Здравствуйте\n\n${createMessageFromDataList(
      DataList
    )}`;
    await window.open(generateWhatsAppUrl(phoneNumber, messageText), "_blank");
  };

  return (
    <div className="px-24 w-full min-h-[80vh] mt-[60px] lg:px-16 md:px-12 sm:px-4 xs:px-2 py-5">
      <h1 className="text-center">Корзина</h1>
      <div className="flex flex-col gap-5 items-center">
        {cartList
          ? cartList.map((item, index) => (
              <CardToCartItem
                key={index}
                image={item.mainImage}
                name={item.name}
                price={item.price}
                amount={item.amount}
                id={item?.id}
              />
            ))
          : "Пусто"}
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={handleWhatsAppRedirect}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Отправить в WhatsApp
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
              Предварительный просмотр сообщения
            </h2>
            <pre className="whitespace-pre-wrap mb-4 border p-2 rounded text-wrap">
              {message}
            </pre>
            <div className="flex justify-between">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Копировать текст
              </button>
              <button
                onClick={openWhatsApp}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Открыть WhatsApp
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const CardToCartItem = memo(({ image, name, price, amount, id }) => {
  const dispatch = useDispatch();
  const handleIncriment = () => {
    dispatch(incrementCart(id));
  };
  const handleDecriment = () => {
    dispatch(decrementCart(id));
  };
  const handleDelete = () => {
    dispatch(removeFromList(id));
  };
  return (
    <div className="flex flex-row border border-b-neutral-600 w-[600px] p-2 justify-between items-center">
      <Image
        width={100}
        height={100}
        src={image}
        alt="image-product"
        className="object-cover rounded-full w-[100px] h-[100px]"
      />
      <div className="flex flex-col">
        <span className="text-[16px] font-semibold">{name}</span>
        <span className="text-[14px] font-medium ">{price} сом</span>
      </div>
      <div className="flex flex-row">
        <span
          onClick={handleDecriment}
          dir="ltr"
          className="w-[50px] h-[50px] cursor-pointer border border-b-neutral-600 flex justify-center items-center text-2xl rounded-s-lg"
        >
          -
        </span>
        <span className="w-[50px] h-[50px]  border border-b-neutral-600 flex justify-center items-center text-xl ">
          {amount}
        </span>
        <span
          onClick={handleIncriment}
          dir="rtl"
          className="w-[50px] h-[50px] cursor-pointer border border-b-neutral-600 flex justify-center items-center text-2xl rounded-s-lg"
        >
          +
        </span>
      </div>
      <IoClose size={25} onClick={handleDelete} className="cursor-pointer" />
    </div>
  );
});
