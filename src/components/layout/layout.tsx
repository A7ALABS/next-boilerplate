import styled from "styled-components";
// import Navbar from "../common/Navbar";
// import Footer from "../common/Footer";

export const LandingWrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
`;

interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

declare namespace CSS {
  namespace paintWorklet {
    export function addModule(url: string): void;
  }
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <LandingWrapper>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </LandingWrapper>
    </>
  );
};

export default Layout;
