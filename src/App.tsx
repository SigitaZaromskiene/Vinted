import { ReactElement, useState, useEffect } from "react";
import "./assets/styles/App.scss";
import Layout from "./components/Layout/Layout";
import Overlay from "./components/Overlay/Overlay";

type ImgProps = {
  id: string;
  owner: string;
  farm: number;
  isfamily: number;
  ispublic: number;
  secret: string;
  server: string;
  title: string;
};

const App = (): ReactElement => {
  const [imgList, setImgList] = useState<ImgProps[]>([]);
  const [hoveredImg, setHoveredImg] = useState<string | null>(null);

  async function getPhotos() {
    const apiKey = "07a847c289054889fe31484a7e2f4e5d";
    const method = "flickr.photos.search";
    const searchQuery = "animals";
    const format = "json";
    const nojsoncallback = 1;

    const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${apiKey}&text=${searchQuery}&format=${format}&nojsoncallback=${nojsoncallback}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.photos && data.photos.photo) {
        setImgList((prevImg) => [...prevImg, ...data.photos.photo]);
      } else {
        console.error("Unexpected data structure:", data);
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }

  useEffect(() => {
    getPhotos();
  }, []);

  const handleMouseEnter = (id: string) => {
    setHoveredImg(id);
  };

  const handleMouseLeave = () => {
    setHoveredImg(null);
  };

  return (
    <Layout>
      {imgList.map((img) => (
        <li key={img.id} className="img-container" onMouseEnter={() => handleMouseEnter(img.id)}
        onMouseLeave={handleMouseLeave}>
          <img
            loading="lazy"
            src={`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}_m.jpg`}
            alt={img.title}
          />
          {hoveredImg === img.id && <Overlay/>}
        </li>
      ))}
    </Layout>
  );
};

export default App;
