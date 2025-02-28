import React from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import news1 from "../../assets/news/news-1.png";
import news2 from "../../assets/news/news-2.png";
import news3 from "../../assets/news/news-3.png";
import news4 from "../../assets/news/news-4.png";

const news = [
    {
        id: 1,
        title: "Global Climate Summit Calls for Urgent Action",
        description:
            "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change.",
        image: news1,
    },
    {
        id: 2,
        title: "Breakthrough in AI Technology Announced",
        description:
            "A major AI breakthrough has been announced, promising to revolutionize industries from healthcare to finance.",
        image: news2,
    },
    {
        id: 3,
        title: "New Space Mission Aims to Explore Distant Galaxies",
        description:
            "NASA has unveiled plans for a new space mission to explore distant galaxies and uncover insights into the universe.",
        image: news3,
    },
    {
        id: 4,
        title: "Stock Markets Reach Record Highs Amid Economic Recovery",
        description:
            "Global stock markets have reached record highs as economic recovery continues post-pandemic.",
        image: news4,
    },
    {
        id: 5,
        title: "Innovative New Smartphone Released by Leading Tech Company",
        description:
            "A leading tech company has launched a cutting-edge smartphone with improved battery life and design.",
        image: news2,
    },
];

const News = () => {
    return (
        <div className="py-12 px-4">
            <h2 className="text-3xl font-montserrat text-center font-extrabold text-gray-800 mb-6 uppercase tracking-wider">
                News
            </h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                navigation={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 30 },
                    1024: { slidesPerView: 2, spaceBetween: 40 },
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {news.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col items-center md:flex-row md:justify-between gap-6 bg-white shadow-lg rounded-lg p-4 md:p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-rotate-1">
                            {/* Image - High Quality Fix */}
                            <div className="w-full md:w-1/2 flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-auto max-h-64 object-contain rounded-lg shadow-md transition-all duration-500 hover:scale-105"
                                    loading="lazy"
                                />
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-1/2 text-center md:text-left">
                                <Link to="/">
                                    <h3 className="text-lg md:text-xl font-semibold hover:text-blue-600 mb-3 transition-all duration-300">
                                        {item.title}
                                    </h3>
                                </Link>
                                <div className="w-10 h-[4px] bg-[#FFCE1A] mx-auto md:mx-0 mb-4"></div>
                                <p className="text-gray-600 text-sm md:text-base">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default News;
