import { useCallback, useRef, useState } from "react";
import { Mousewheel, Navigation } from "swiper";
import { SwiperSlide } from "swiper/react";
import PlayButton from "../../../components/buttons/play-button/PlayButton";
import LazySwiper from "../../../components/lazy-swiper/LazySwiper";
import TrailerModal from "../../../components/modals/trailer-modal/TrailerModal";
import Overlay from "../../../components/overlay/Overlay";
import "./videoList.scss";

const VideoList = ({ videos = [] }) => {
  const [toPlayUrl, setToPlayUrl] = useState();

  const handleVideoItemClick = useCallback((url) => {
    setToPlayUrl(url);
  }, []);

  const handleTrailerClose = useCallback(() => {
    setToPlayUrl();
  }, []);

  const swiperRef = useRef();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className="video-list-container">
      <LazySwiper
        slidesPerView="2"
        breakpoints={{
          600: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          swiper.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.prevEl = navigationPrevRef.current;
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        modules={[Navigation, Mousewheel]}
      >
        {videos.map((v) => (
          <SwiperSlide key={v.srcUrl}>
            <VideoItem {...v} onClick={handleVideoItemClick} />
          </SwiperSlide>
        ))}
      </LazySwiper>

      <div
        onClick={() => {
          swiperRef.current?.slidePrev();
          if (swiperRef.current?.isBeginning)
            navigationPrevRef.current?.classList.add("swiper-button-disabled");
          navigationNextRef.current?.classList.remove("swiper-button-disabled");
        }}
        className="swiper-button-prev swiper-button-disabled"
        ref={navigationPrevRef}
      ></div>
      <div
        onClick={() => {
          swiperRef.current?.slideNext();
          if (swiperRef.current?.isEnd)
            navigationNextRef.current?.classList.add("swiper-button-disabled");
          navigationPrevRef.current?.classList.remove("swiper-button-disabled");
        }}
        className="swiper-button-next"
        ref={navigationNextRef}
      ></div>
      <TrailerModal
        open={toPlayUrl !== undefined}
        onClose={handleTrailerClose}
        srcUrl={toPlayUrl}
      />
    </div>
  );
};

const VideoItem = ({ thumbnailUrl, title = "Trailer", srcUrl, onClick }) => {
  return (
    <div className="video-item-container" onClick={() => onClick(srcUrl)}>
      <div className="thumbnail-container">
        <img loading="lazy" src={thumbnailUrl} alt={srcUrl} />
        <PlayButton />
      </div>
      <div className="video-title">{title}</div>
      <Overlay />
    </div>
  );
};

export default VideoList;
