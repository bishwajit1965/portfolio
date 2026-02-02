import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TestimonialCard from "./TestimonialCard";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import SectionTitle from "../../sectionTitle/SectionTitle";
import Loader from "../../loader/Loader";
import { FaCommentAlt } from "react-icons/fa";

const TestimonialSection = () => {
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await api.get("/testimonials", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTestimonials(response.data.data);
      } catch (error) {
        console.error("Error in fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="lg:max-w-7xl mx-auto min-h-96">
      {loading && <Loader />}

      <SectionTitle
        title="What"
        decoratedText="People Say"
        subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        icon={FaCommentAlt}
      />

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonialData) => (
          <SwiperSlide key={testimonialData._id}>
            <TestimonialCard testimonialData={testimonialData} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialSection;
