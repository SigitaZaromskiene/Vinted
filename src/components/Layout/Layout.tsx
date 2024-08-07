import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <ul className="layout__img-list">{children}</ul>
    </div>
  );
};
export default Layout;
