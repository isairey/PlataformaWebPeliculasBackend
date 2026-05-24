import MediaApi from "../api/backendApi/class/MediaApi";
import MovieGrid from "../components/movie-grid/MovieGrid";
import PageHeader from "../components/page-header/PageHeader";

const Catalog = ({ itemType, browseType }) => {
  return (
    <>
      <PageHeader>
        {itemType === MediaApi.itemType.movie ? "Movies" : "Shows"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid itemType={itemType} browseType={browseType} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
