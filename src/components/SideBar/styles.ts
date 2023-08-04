import styled from "styled-components";

export const ContainerSideBar = styled.div`
  border-right: 1px solid #EAECF0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh; //
  div:last-child {
  margin-top: auto;
}

`;
export const BoxTopSideBar = styled.div`
  display: flex;
`
export const BoxTop = styled.div`
   border-bottom: 1px solid #EAECF0;
`
export const TopFixed = styled.div`
  border-bottom: 1px solid #EAECF0;
`
export const Title = styled.p`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  margin-right: 120px;
`;
export const BoxLinksItem = styled.div`
  margin-left: 19px;
`;
export const Box = styled.div`
    display: flex;
    align-items: center;
    margin-right: 107px;
`;
export const Icon = styled.img``;

export const Text = styled.p`
    margin-left: 12px;
    color: #344054;
    cursor: pointer;

    &:hover {
      color: #029746;
    }
`;

export const ContentFooter = styled.div `
  bottom: 0;
`