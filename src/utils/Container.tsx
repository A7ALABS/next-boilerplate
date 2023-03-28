import styled, { css } from "styled-components";

export const A7ARow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const A7AXCenteredRow = styled(A7ARow)`
  justify-content: center;
`;

export const A7AYCenteredRow = styled(A7ARow)`
  align-items: center;
`;

export const A7ACenteredRow = styled(A7ARow)`
  justify-content: center;
  align-items: center;
`;

export const A7AColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const A7AXCenteredColumn = styled(A7AColumn)`
  justify-content: center;
`;

export const A7AYCenteredColumn = styled(A7AColumn)`
  align-items: center;
`;

export const A7ACenteredColumn = styled(A7AColumn)`
  justify-content: center;
  align-items: center;
`;

export const A7AXSpaceBetweenRow = styled(A7ARow)`
  justify-content: space-between;
`;

export const A7AYSpaceBetweenRow = styled(A7AColumn)`
  align-items: center;
`;

export const A7ATag = styled.div`
  height: 20px;
  border-radius: 20px;
  background-color: "rgba(82, 192, 151, 0.2)";
  padding: 0px 8px 0 9px;
  align-items: center;
  justify-content: center;
  margin-top: -1px;
`;

export const A7ATagText = styled.p`
  color: #52c097;
  font-size: 10px;
  font-family: sfpro;
`;

export const A7ASolidTag = styled.div`
  height: 20px;
  border-radius: 20px;
  background-color: "rgba(82, 192, 151, 1)";
  padding: 0px 8px 0 9px;
  align-items: center;
  justify-content: center;
  margin-top: -1px;
`;

export const A7ASolidTagText = styled.p`
  color: #fff;
  font-size: 10px;
  font-family: sfpro;
`;

// BORDER OUTLINE

//  background: paint(squircle);
//   --squircle-fill: rgba(255, 255, 255, 0.2);
//   --squircle-radius: ${(props) => props.theme.borderRadius};
//   --squircle-outline: 1px;

// BORDER FILL

// mask: paint(squircle);
// background: blue;
// --squircle-radius: 20px;
// --squircle-smooth: 1;

export const SectionWrapper = styled(A7AColumn).attrs({ as: "section" })`
  position: relative;
  z-index: 10;
  max-width: 100%;
  width: 1240px;
  padding: 0 15.7px;
  margin: auto;
  color: ${(props)=>props.theme.colors.neutralBg};

  ${(props) => props.theme.mediaQuery.mobile} {
    padding: 0;
  }

  `;
