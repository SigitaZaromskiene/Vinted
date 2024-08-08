import { ReactElement, useState, useEffect, useRef } from "react";
import "./assets/styles/App.scss";
import Layout from "./components/Layout/Layout";
import Overlay from "./components/Overlay/Overlay";
import { usePhotos } from "./components/App.logic";

const KEY = "SavedImg";

const App = (): ReactElement => {
  const [hoveredImg, setHoveredImg] = useState<string | null>(null);
  const [photoId, setPhotoId] = useState<string[]>(() => {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const { imgList, getPhotos, setPage } = usePhotos();

  const observer = useRef<IntersectionObserver>();
  const lastPhotoRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    getPhotos(1);
  }, []);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            getPhotos(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 1.0 }
    );
    if (lastPhotoRef.current) observer.current.observe(lastPhotoRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [imgList]);

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

  useEffect(() => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          const src = image.getAttribute("data-src");
          if (src) {
            image.src = src;
            observer.unobserve(image);
          }
        }
      });
    });

    const images = document.querySelectorAll(".img-container__img");
    images.forEach((image) => imageObserver.observe(image));

    return () => {
      imageObserver.disconnect();
    };
  }, [imgList]);

  return (
    <Layout>
      <ul className="layout__img-list">
        {imgList.map((img, i) => {
          const isLastPhoto = i === imgList.length - 1;
          return (
            <li
              key={img.id}
              className="img-container"
              onMouseEnter={() => handleMouseEnter(img.id)}
              onMouseLeave={handleMouseLeave}
              ref={isLastPhoto ? lastPhotoRef : null}
            >
              <img
                className="img-container__img"
                data-src={`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}_m.jpg`}
                alt={img.title}
                loading="lazy"
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
          );
        })}
      </ul>
    </Layout>
  );
};

export default App;
