"use client";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// position in props to types: string => left | right | top | bottom
export default function ImageGalleryComponent({ images, position }) {
  return (
    <div className="w-full z-0">
      <ImageGallery items={images} thumbnailPosition={position} />
    </div>
  );
}
