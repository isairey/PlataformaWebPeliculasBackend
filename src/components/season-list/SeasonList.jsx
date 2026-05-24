import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mousewheel, Navigation } from "swiper";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { episodeReleased } from "../../api/tmdb/tmdbApi.helper";
import LazySwiper from "../lazy-swiper/LazySwiper";
import "./SeasonList.scss";
import SeasonCell from "./season-cell/SeasonCell";

const SeasonList = ({ seasons = [], showId }) => {
  const [selectedIndex, setSelectedIndex] = useState(endIndex(seasons));
  const navigate = useNavigate();
  const swiperRef = useRef();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  useEffect(() => {
    setSelectedIndex(endIndex(seasons));
  }, [seasons]);

  return (
    <div className="section mb-3">
      <div className="section__header mb-1">
        <FormControl size="small">
          <Select
            className="season-select"
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={{
              classes: {
                root: "main-select-menu",
              },
            }}
          >
            {seasons?.map((s, i) => (
              <MenuItem key={s.title} value={i}>
                {s.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="season-list">
        <LazySwiper
          slidesPerView="1"
          breakpoints={{
            600: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
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
          {seasons[selectedIndex]?.episodes
            ?.filter(episodeReleased)
            .map((ep) => (
              <SwiperSlide key={ep.episodeNumber}>
                <SeasonCell
                  item={ep}
                  onClick={() => {
                    navigate(
                      `/watch/show/${showId}/season/${seasons[selectedIndex]?.seasonNumber}/episode/${ep.episodeNumber}`
                    );
                  }}
                />
              </SwiperSlide>
            ))}
        </LazySwiper>
        <div
          onClick={() => {
            swiperRef.current?.slidePrev();
            if (swiperRef.current?.isBeginning)
              navigationPrevRef.current?.classList.add(
                "swiper-button-disabled"
              );
            navigationNextRef.current?.classList.remove(
              "swiper-button-disabled"
            );
          }}
          className="swiper-button-prev swiper-button-disabled"
          ref={navigationPrevRef}
        ></div>
        <div
          onClick={() => {
            swiperRef.current?.slideNext();
            if (swiperRef.current?.isEnd)
              navigationNextRef.current?.classList.add(
                "swiper-button-disabled"
              );
            navigationPrevRef.current?.classList.remove(
              "swiper-button-disabled"
            );
          }}
          className="swiper-button-next"
          ref={navigationNextRef}
        ></div>
      </div>
    </div>
  );
};

const endIndex = (arr) => (arr && arr.length > 0 ? arr.length - 1 : "");

export default SeasonList;
