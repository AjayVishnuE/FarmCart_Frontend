import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// import bgimg1 from '../../Images/sliderimg1.png';
import bgimg3 from '../../Images/wallpaper1.webp';
import bgimg2 from '../../Images/wallpaper2.jpg';
import bgimg1 from '../../Images/wallpaper3.jpg';

// import bgimg2 from '../../Images/sliderimg2.png';
// import bgimg3 from '../../Images/sliderimg3.png';
import './IntroPage.css';


import { Link } from 'react-router-dom';

function IntroPage() {

  const [activeSlide, setActiveSlide] = useState(0);

  const triggerAnimation = (swiper) => {
    document.querySelectorAll('.popupdiv').forEach((div) => {
      div.classList.remove('animate');
    });

  setTimeout(() => {
    const activePopupDiv = document.querySelector(`.popupdiv-${swiper.realIndex + 1}`);
    if (activePopupDiv) {
      activePopupDiv.classList.add('animate');
    }
  }, 50);
  };


  const slides = [
    {
      img: bgimg1,
      title: 'Know Your Farmer, Know Your Food.',
      text: 'At Farm Cart, we prioritize trust and transparency between farmers and consumers. Our platform offers farm profiles with a farmers story, growing practices, and certifications, allowing informed decisions about food origin. You can read reviews from other customers for insights into the quality and freshness of each farm. ',
    },
    {
      img: bgimg2,
      title: 'Convenience Meets Freshness',
      text: 'At Farm Cart, we understand that busy lives shouldnt mean sacrificing healthy eating. Thats why we have built a platform that makes buying fresh, organic produce effortless.Farm Cart connects you directly with nearby organic farms and markets. Find the freshest, seasonal produce with just a tap, ensuring healthy eating made convenient and local.',
    },
    {
      img: bgimg3,
      title: 'From Farm To Your Dining Table',
      text: 'Farm Cart supports local farmers by connecting them with health-conscious consumers seeking fresh produce. Farmers can create a profile, list their products, manage inventory and set prices with ease. Expand your market reach beyond local farmers  markets and traditional channels with Farm Cart.'
    },
  ];
  return (  
<Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => triggerAnimation(swiper)}
      onInit={(swiper) => triggerAnimation(swiper)}
      spaceBetween={1}
      slidesPerView={1}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className='page-container'>
            <img className='imagestyle' src={slide.img} alt={`backgroundimg${index+1}`} />
            <Link to="/signup">
              <div className='skipbtn'>
                <p>skip</p>
              </div>
            </Link>
            <div className="swiper-pagination-container">
              <div className="swiper-pagination"></div>
            </div>
            <div className={`popupdiv popupdiv-${index + 1}`}>
              <h2 className='slidetitle'>{slide.title}</h2>
              <p className='slidetext'>{slide.text}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default IntroPage
