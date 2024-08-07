import { useState } from "react";
import Overlay from "../Overlay/Overlay";
import { OverlayProps } from "../Overlay/Overlay";


const [hoveredImg, setHoveredImg] = useState<string | null>(null);


const handleMouseEnter = (id: string) => {
  setHoveredImg(id);
};

const handleMouseLeave = () => {
  setHoveredImg(null);
};

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

const Img: React.FC = ({img}:OverlayProps) => {
  return (
    <li
    key={img.id}
    className="img-container"
    onMouseEnter={() => handleMouseEnter(img.id)}
    onMouseLeave={handleMouseLeave}
  >
    <img
      loading="lazy"
      src={`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}_m.jpg`}
      alt={img.title}
    />
    {hoveredImg === img.id && <Overlay img={img}/>}
  </li>
  );
};
export default Img;