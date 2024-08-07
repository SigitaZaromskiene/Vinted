import { ImgProps } from "./App";

export type OverlayProps = {
  img: ImgProps;
  onAddToFavourites: (id: string) => void;
  onRemoveFromFavourites: (id: string) => void;
  photoId: string[];
};

const Overlay: React.FC<OverlayProps> = ({
  img,
  onAddToFavourites,
  photoId,
  onRemoveFromFavourites,
}) => {
  const handleAddToFavorites = () => {
    onAddToFavourites(img.id);
  };

  const handleRemoveFromFavourites = () => {
    onRemoveFromFavourites(img.id);
  };

  return (
    <div className="overlay-container">
      <h1 className="overlay-container__owner">{img.owner}</h1>
      <div className="overlay-container__border"></div>
      <i className="overlay-container__title">{img.title}</i>
      <button
        className={
          photoId.includes(img.id)
            ? "overlay-container__activeButton"
            : "overlay-container__button"
        }
        onClick={
          !photoId.includes(img.id)
            ? handleAddToFavorites
            : handleRemoveFromFavourites
        }
      >
        {!photoId.includes(img.id) ? "Favourite" : "Remove from favourites"}
      </button>
    </div>
  );
};

export default Overlay;
