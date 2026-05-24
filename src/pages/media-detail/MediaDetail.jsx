import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MediaApi from "../../api/backendApi/class/MediaApi";
import { toYoutubeVideoUrl } from "../../api/backendApi/helper";
import youtubeApi from "../../api/youtube/youtubeApi";
import Button, { OutlineButton } from "../../components/button/Button";
import CommentList from "../../components/comment-list/comment-list";
import HoverPopover from "../../components/hover-popover/hover-popover";
import MovieList from "../../components/movie-list/MovieList";
import SeasonList from "../../components/season-list/SeasonList";
import useBackendApi from "../../hooks/useBackendApi";
import CastList from "./cast-list/CastList";
import GenreList from "./genre-list/GenreList";
import "./mediaDetail.scss";
import VideoList from "./video-list/VideoList";

const MediaDetail = ({ itemType }) => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [sentimentOverview, setSentimentOverview] = useState();
  const [credits, setCredits] = useState();
  const [seasons, setSeasons] = useState();
  const [trailers, setTrailers] = useState();
  const [reviewClips, setReviewClips] = useState();
  const [topReviews, setTopReviews] = useState();
  const trailersRef = useRef();
  const seasonsRef = useRef();
  const navigate = useNavigate();
  const backendApi = useBackendApi();
  const mediaApi = backendApi[itemType];
  const reviewApi = backendApi.review;

  useEffect(() => {
    const getDetail = async () => {
      try {
        const { data } = await mediaApi.getItem(id);
        setItem(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
  }, [itemType, id, mediaApi]);

  useEffect(() => {
    const getSentimentOverview = async () => {
      try {
        const { data } = await reviewApi.getSentimentOverview(id);
        setSentimentOverview(data);
      } catch (error) {
        if (error.response.status) setSentimentOverview(undefined);
        console.log(error);
      }
    };
    getSentimentOverview();
  }, [itemType, id, reviewApi]);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const { data } = await mediaApi.getCredits(id);
        setCredits(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCredits();
  }, [itemType, id, mediaApi]);

  useEffect(() => {
    const getSeasons = async () => {
      try {
        const { data } = await mediaApi.getSeasons(id);
        setSeasons(data.filter((s) => s.episodes.length > 0));
      } catch (error) {
        console.log(error);
      }
    };
    if (itemType === MediaApi.itemType.show) getSeasons();
  }, [itemType, id, mediaApi]);

  const handlePlay = () => {
    itemType === MediaApi.itemType.movie
      ? navigate(`/watch/movie/${id}`)
      : scrollToRef(seasonsRef);
  };

  useEffect(() => {
    const getTrailers = async (ids) => {
      try {
        const videoData = (
          await Promise.allSettled(
            ids.map((id) => youtubeApi.getVideoDetail(id))
          )
        )
          .filter((r) => r.status === "fulfilled")
          .map((r, i) => toVideoModel({ ...r.value, id: ids[i] }));
        setTrailers(videoData);
      } catch (error) {
        console.log(error);
      }
    };
    item?.trailers?.length > 0 ? getTrailers(item.trailers) : setTrailers([]);
  }, [item, id]);

  useEffect(() => {
    const getReviews = async (ids) => {
      try {
        const videoData = (
          await Promise.allSettled(
            ids.map((id) => youtubeApi.getVideoDetail(id))
          )
        )
          .filter((r) => r.status === "fulfilled")
          .map((r, i) => toVideoModel({ ...r.value, id: ids[i] }));
        setReviewClips(videoData);
      } catch (error) {
        console.log(error);
      }
    };
    item?.reviewClips?.length > 0
      ? getReviews(item.reviewClips)
      : setReviewClips();
  }, [item, id]);

  useEffect(() => {
    const getTopReviews = async () => {
      try {
        const { data } = await reviewApi.getTopReviews(id, 5);
        console.log(data);
        setTopReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTopReviews();
  }, [itemType, id, reviewApi]);

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${item?.backdropUrl})`,
        }}
      />
      <div className="mb-3 movie-content container">
        <div className="movie-content__poster">
          <div
            className="movie-content__poster__img"
            style={{
              backgroundImage: `url(${item?.posterUrl?.replace(
                "w500",
                "original"
              )})`,
            }}
          />
        </div>
        <div className="movie-content__info">
          <h1 className="title">{item?.title}</h1>
          <GenreList itemType={itemType} genres={item?.genres} />

          <div>
            <div className="rating-overview">
              <div>
                {itemType === "movie"
                  ? toYear(item?.releaseDate)
                  : toYearPrediod(
                      toYear(item?.firstAirDate),
                      toYear(item?.lastAirDate)
                    )}{" "}
                {formatTime(item?.runtime)}
              </div>

              <div className="rating-item">
                <svg
                  width="35"
                  height="20"
                  viewBox="0 0 35 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <image
                    href="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                    width="100%"
                    height="100%"
                  />
                </svg>
                <span>{item?.imdbScore}</span>
              </div>

              <div className="rating-item">
                <svg
                  width="50"
                  height="20"
                  viewBox="0 0 50 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <image
                    href="https://upload.wikimedia.org/wikipedia/commons/6/6f/Rotten_Tomatoes_logo.svg"
                    width="100%"
                    height="100%"
                  />
                </svg>
                {item?.rottenTomatoesScore && (
                  <span>{item.rottenTomatoesScore}%</span>
                )}
              </div>

              <div className="rating-item youtube-review-overall">
                <svg
                  width="30"
                  height="20"
                  viewBox="0 0 30 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <image
                    href="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                    width="100%"
                    height="100%"
                  />
                </svg>
                {sentimentOverview && (
                  <div className="positve-percentage">
                    {Math.round(sentimentOverview.positivePercentage)}%{" "}
                    <HoverPopover
                      className="test"
                      hoverContent={`${Math.round(
                        sentimentOverview.positivePercentage
                      )}% of the ${
                        sentimentOverview.totalReviews
                      } comments on Youtube are positive.`}
                    >
                      <InfoOutlinedIcon
                        sx={{ fontSize: 15, color: "#ffffff", marginLeft: 0.5 }}
                      />
                    </HoverPopover>
                  </div>
                )}
              </div>
            </div>
            <p className="overview">{item?.overview}</p>
          </div>

          <div className="cast">
            <div className="section__header">
              <h2>Casts</h2>
            </div>
            <CastList cast={credits?.cast} />
          </div>
          <div className="buttons">
            <Button className="play-button" onClick={handlePlay}>
              <FontAwesomeIcon icon={faPlay} />
              Play
            </Button>
            <OutlineButton
              className="trailer-button"
              onClick={() => scrollToRef(trailersRef)}
            >
              Trailer
            </OutlineButton>
          </div>
        </div>
      </div>
      <div className="container" ref={seasonsRef}>
        {itemType === "show" && <SeasonList seasons={seasons} showId={id} />}
        <div className="section mb-3" ref={trailersRef}>
          <div className="section__header mb-1">
            <h2>Trailer</h2>
          </div>
          <VideoList videos={trailers} />
        </div>

        {reviewClips && (
          <div className="section mb-3">
            <div className="section__header mb-1">
              <h2>Relevant</h2>
            </div>
            <VideoList videos={reviewClips} />
          </div>
        )}

        {topReviews && sentimentOverview && (
          <div className="section mb-3">
            <div className="section__header mb-1">
              <h2>Reviews</h2>
            </div>
            <CommentList
              comments={topReviews}
              sentimentOverview={sentimentOverview}
            />
          </div>
        )}

        <div className="section mb-3">
          <div className="section__header mb-1">
            <h2>Similar</h2>
          </div>
          <MovieList
            id={item?._id || id}
            itemType={itemType}
            listType={MediaApi.listType.similar}
          />
        </div>
      </div>
    </>
  );
};

const scrollToRef = (ref) => {
  ref.current.scrollIntoView({ behavior: "smooth" });
};

const toVideoModel = (v) => ({
  title: v.title,
  thumbnailUrl: v.thumbnails.standard.url,
  srcUrl: toYoutubeVideoUrl(v.id),
});

function formatTime(durationInMinutes) {
  if (!durationInMinutes) return "";
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  let formattedTime = "";
  if (hours > 0) {
    formattedTime += hours + " hr ";
  }
  if (minutes > 0) {
    formattedTime += minutes + " min";
  }

  return formattedTime.trim();
}

function toYear(datetimeStr) {
  const date = new Date(datetimeStr);
  return date ? date.getFullYear() : "";
}

function toYearPrediod(fromYear, toYear) {
  return fromYear !== toYear ? fromYear + " - " + toYear : toYear;
}

export default MediaDetail;
