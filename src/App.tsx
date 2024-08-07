import { ReactElement, useState, useEffect } from "react";
import "./assets/styles/App.scss";
import Layout from "./components/Layout/Layout";
import Overlay from "./components/Overlay/Overlay";
import { usePhotos} from "./components/App.logic";







const KEY = "SavedImg";

const App=():ReactElement=>{
  
  const [hoveredImg, setHoveredImg] = useState<string | null>(null);
  const [photoId, setPhotoId] = useState<string[]>(() => {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const { imgList, getPhotos } = usePhotos();

  
  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(photoId));
  }, [photoId]);

  const handleMouseEnter = (id: string) => {
    setHoveredImg(id);
  };

  const handleMouseLeave = () => {
    setHoveredImg(null);
  };

  const handleAddToFavorites = (id: string) => {
    if (!photoId.includes(id)) {
      setPhotoId((prevId) => [...prevId, id]);
    }
  };
  const removeItemFromFavourites = (id: string) => {
    setPhotoId((prevId) => prevId.filter((photoId) => photoId !== id));
  };


  return (
    <Layout>
      {imgList.map((img)=> (
        <li
          key={img.id}
          className="img-container"
          onMouseEnter={() => handleMouseEnter(img.id)}
          onMouseLeave={handleMouseLeave}
        >
          <img className="img-container"
            loading="lazy"
            src={`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}_m.jpg`}
            alt={img.title}
          />
          {hoveredImg === img.id && (
            <Overlay
              img={img}
              photoId={photoId}
              onAddToFavourites={handleAddToFavorites}
              onRemoveFromFavourites={removeItemFromFavourites}
            />
          )}
        </li>
      ))}
    </Layout>
  );
};

export default App;
