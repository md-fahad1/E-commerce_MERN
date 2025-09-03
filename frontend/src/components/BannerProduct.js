import React from 'react';
import Slider from 'react-slick';
import Banner1 from '../assest/banner/banner1.jpg';
import Banner2 from '../assest/banner/Banner2.jpg';
import Banner3 from '../assest/banner/Banner3.jpg';
import Banner4 from '../assest/banner/Banner4.jpg';
import Banner5 from '../assest/banner/Banner5.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerProduct = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
    };

    return (
        <section className="mt-4 md:mt-7 w-full ">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 lg:gap-6">
                <div className="col-span-1 lg:col-span-7 lg:row-span-2">
                    <Slider {...settings}>
                        <div>
                            <img
                                src={Banner1}
                                alt="Banner 1"
                                className="object-cover aspect-[16/9]"
                            />
                        </div>
                        <div>
                            <img
                                src={Banner5}
                                alt="Banner 5"
                                className="object-cover aspect-[16/9]"
                            />
                        </div>
                        <div>
                            <img
                                src={Banner3}
                                alt="Banner 3"
                                className="object-cover aspect-[16/9]"
                            />
                        </div>
                    </Slider>
                </div>
                <div className="relative flex col-span-1 lg:col-span-3">
                    <img
                        src={Banner2}
                        alt="Banner 2"
                        className="object-cover aspect-[16/9]"
                    />
                </div>
                <div className="relative flex col-span-1 lg:col-span-3">
                    <img
                        src={Banner4}
                        alt="Banner 4"
                        className="object-cover aspect-[16/9]"
                    />
                </div>
            </div>
        </section>
    );
};

export default BannerProduct;
