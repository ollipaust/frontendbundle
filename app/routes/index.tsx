import React, { useEffect, useRef, useState } from 'react';

const imageLinks = [
  'https://preview.ibb.co/iHdNVn/1.jpg',
  'https://preview.ibb.co/mUm9An/2.jpg',
  'https://preview.ibb.co/hSL2Vn/3.jpg',
  'https://preview.ibb.co/jRAfGS/4.jpg',
/*
  'https://preview.ibb.co/ksTNVn/5.jpg',
  'https://preview.ibb.co/jQhhVn/6.jpg',
  'https://preview.ibb.co/fD97wS/7.jpg',
  'https://preview.ibb.co/c9jJ37/8.jpg',
  'https://preview.ibb.co/iivEbS/9.jpg',
  'https://preview.ibb.co/fXW9An/10.jpg',
*/
];

export default function Index() {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const slidesLength = (sliderContainerRef.current?.childNodes.length || 0) - 1;
  const [sliderClassname, setSliderClassname] = useState('_3D');

  useEffect(() => {
    const lastSlide = sliderContainerRef.current?.querySelector(
      '.slide:last-child'
    ) as HTMLElement;
    lastSlide.classList.add('last-slide');

    function nextSlide() {
      const lastSlide = sliderContainerRef.current?.querySelector(
        '.slide:last-child'
      ) as HTMLElement;
      lastSlide.classList.add('active');
      sliderContainerRef.current?.classList.add('transfomer');
      setTimeout(() => {
        const slides = Array.from(
          sliderContainerRef.current?.getElementsByClassName('slide') || []
        );
        const slicedSlide = slides.slice(slidesLength);
        slicedSlide.forEach((slide) => {
          sliderContainerRef.current?.prepend(slide);
        });
        const activeSlide = sliderContainerRef.current?.querySelector('.slide.active');
        if (activeSlide) {
          activeSlide.classList.remove('active');
          lastSlide.classList.remove('last-slide');
        }
        sliderContainerRef.current?.classList.remove('transfomer');
        const newLastSlide = sliderContainerRef.current?.querySelector(
          '.slide:last-child'
        ) as HTMLElement;
        newLastSlide.classList.add('last-slide');
      }, 300);
    }

    function autoPlay(delay: number, callback: () => void) {
      const loop = () => {
        callback();
        setTimeout(loop, delay);
      };
      loop();
    }

    setTimeout(() => {
      autoPlay(5000, nextSlide);
    }, 5000);

  });

  return (
    <main className='relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center'>
      <div 
        id='sliderContainer'
        className='sliderContainer'
      >
        <div
          id='slider'
          className={`slider ${sliderClassname}`}
          ref={sliderContainerRef}
        >
          {imageLinks.map((link, index) => (
            <div 
              key={index} 
              className='slide'>
              <img 
                src={link} 
                alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
