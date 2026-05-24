import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import MediaApi from "../../api/backendApi/class/MediaApi";
import useBackendApi from "../../hooks/useBackendApi";
import LazySwiper from "../lazy-swiper/LazySwiper";
import MovieCard from "../movie-card/MovieCard";
import "./movie-list.scss";

const MovieList = ({ id, itemType, listType }) => {
  const [items, setItems] = useState([]);
  const backendApi = useBackendApi()[itemType];

  useEffect(() => {
    const getList = async () => {
      try {
        if (listType === MediaApi.listType.similar) {
          const { data } = await backendApi.getSimilarItems(id);
          setItems(data);
        } else {
          const { data } = await backendApi.getList(listType);
          setItems(data.docs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [itemType, listType, id, backendApi]);

  return (
    <div className="movie-list">
      <LazySwiper
        slidesPerView={2.5}
        breakpoints={{
          600: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 6.67,
          },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={`${item._id}`}>
            <MovieCard item={item} itemType={itemType} />
          </SwiperSlide>
        ))}
      </LazySwiper>
    </div>
  );
};

MovieList.propTypes = {
  listType: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
};

export default MovieList;
