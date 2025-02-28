import React, { useState } from "react";
import BookCard from "../books/BookCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";


// Import required Swiper modules

const categories = [
    "Choose a genre",
    "Business",
    "Fiction",
    "Horror",
    "Adventure",
];

const TopSellers = () => {
    
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

    const {data: books = []} = useFetchAllBooksQuery()


    const filteredBooks =
        selectedCategory === "Choose a genre"
            ? books
            : books.filter(
                (book) => book.category === selectedCategory.toLowerCase()
            );


    return (
        <div className="py-10">
            <h2 className="text-3xl font-montserrat font-extrabold text-gray-800 mb-6 uppercase tracking-wider">
                Top Sellers
            </h2>
            {/* category Filtering */}
            <div className="relative w-50 max-w-xs">
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category"
                    id="category"
                    className="w-full appearance-none border border-gray-300 bg-white rounded-lg px-5 py-3 shadow-lg text-gray-700 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0D0842] focus:border-[#0D0842] transition-all duration-300 hover:bg-gray-100 sm:text-sm sm:py-2"
                >
                    {categories.map((category, index) => (
                        <option
                            key={index}
                            value={category}
                            className="bg-white text-gray-700 py-2 px-4 sm:py-1 sm:px-3 text-sm md:text-base hover:bg-gray-200 transition-all"
                        >
                            {category}
                        </option>
                    ))}
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-600">
                    ⌄
                </div>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {filteredBooks.length > 0 &&
                    filteredBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default TopSellers;
