import { render, screen } from "@testing-library/react";
import Layout from "./components/Layout/Layout";
import Overlay from "./components/Overlay/Overlay";
import { ImgProps } from "./components/App.logic";

test("renders children in the component", () => {
  render(
    <Layout>
      <div>This is children element</div>
    </Layout>
  );
  expect(screen.getByText("This is children element")).toBeInTheDocument();
});

const mockImg: ImgProps = {
  id: "1",
  server: "server",
  secret: "secret",
  title: "Image Title",
  owner: "Image Owner",
};

const mockAddToFavourites = jest.fn();
const mockRemoveFromFavourites = jest.fn();

test("there is a Remove from favourites button in the component", () => {
  render(
    <Overlay
      img={mockImg}
      photoId={["1"]}
      onAddToFavourites={mockAddToFavourites}
      onRemoveFromFavourites={mockRemoveFromFavourites}
    />
  );
  const btn = screen.getByRole("button", { name: "Remove from favourites" });
  expect(btn).toBeInTheDocument();
});

test("the title in rendering correctly", () => {
  render(
    <Overlay
      img={mockImg}
      photoId={["1"]}
      onAddToFavourites={mockAddToFavourites}
      onRemoveFromFavourites={mockRemoveFromFavourites}
    />
  );
  expect(screen.getByText("Image Title")).toBeInTheDocument();
});
