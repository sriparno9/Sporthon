import React, { useRef, useEffect } from "react";
import "./ImageSlider.css";

const ImageSlider = () => {
  const images = [
    "images/photo1.avif",
    "images/photo2.avif",
    "images/photo3.avif",
    "images/photo4.avif",
    "images/photo5.avif",
    "images/photo6.avif",
    "images/photo7.avif",
    "images/photo1.avif",
    "images/photo2.avif",
    "images/photo3.avif",
    "images/photo4.avif",
    "images/photo5.avif",
    "images/photo6.avif",
    "images/photo7.avif",
    "images/photo1.avif",
    "images/photo2.avif",

  ];
  //   const images = [
  //     "https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVubmlzfGVufDB8fDB8fHww",
  //     "https://images.unsplash.com/photo-1580692475446-c2fabbbbf835?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D",
  //     "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D",
  //     "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNyaWNrZXR8ZW58MHx8MHx8fDA%3D",
  //     "https://images.unsplash.com/photo-1571236207041-5fb70cec466e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNoZXNzfGVufDB8fDB8fHww",
  //     "https://images.unsplash.com/photo-1652558973276-365360d5024a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnJvbXxlbnwwfHwwfHx8MA%3D%3D",
  //     "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb3RiYWxsfGVufDB8fDB8fHww",
  //     "https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVubmlzfGVufDB8fDB8fHww",
  //     "https://images.unsplash.com/photo-1580692475446-c2fabbbbf835?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D",
  //     "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3",
  //   ];

  const speed = 50;

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const animateSlider = () => {
      const scrollAmount = 1;
      const delay = speed || 50;

      const scroll = () => {
        slider.scrollLeft += scrollAmount;
        if (slider.scrollLeft >= slider.clientWidth) {
          slider.scrollLeft = 0;
        }
        setTimeout(scroll, delay);
      };

      setTimeout(scroll, delay);
    };

    animateSlider();
  }, [speed]);

  return (
    <div className="image-slider-container">
      <div className="image-slider" ref={sliderRef}>
        {images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt="" loading="lazy" />
        ))}
        {/* Repeat images to create a seamless loop */}
        {images.map((imageUrl, index) => (
          <img
            key={index + images.length}
            src={imageUrl}
            alt=""
            loading="lazy"
            // alt={`Image ${index + images.length + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
