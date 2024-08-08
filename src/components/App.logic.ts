import { useState } from "react";

export type ImgProps = {
  id: string;
  owner: string;
  farm: number;
  isfamily: number;
  ispublic: number;
  secret: string;
  server: string;
  title: string;
};

export const usePhotos = () => {
  const [imgList, setImgList] = useState<ImgProps[]>([]);

  console.log(imgList);
  const [page, setPage] = useState(1);

  const getPhotos = async (page: number) => {
    const apiKey = "07a847c289054889fe31484a7e2f4e5d";
    const method = "flickr.photos.search";
    const searchQuery = "all";
    const format = "json";
    const nojsoncallback = 1000;

    const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${apiKey}&text=${searchQuery}&format=${format}&nojsoncallback=${nojsoncallback}&page=${page}`;

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
  };

  return {
    imgList,
    getPhotos,
    setPage,
  };
};
