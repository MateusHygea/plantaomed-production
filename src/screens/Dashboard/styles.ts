import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;
export const ContainerDashboard = styled.div`
  width: 100%;
`;
export const BoxTitleDashboard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #E5E9EB;
`;
export const ContTitle = styled.div`
    display: flex;
    flex-direction: column;
`
export const ActionText = styled.p`
  font-size: 12px;
  color: #5b6871;
  margin-bottom: -10px;
  margin-left: 32px;
  margin-top: 52px;
`;
export const Title = styled.h1`
  font-size: 26px;
  color: #000000;
  margin-left: 32px
`;
export const ButtonAction = styled.div`
    height: 40px;
    width: 133px;
    margin-right: 8%;
    background-color: #00A84D;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
    background-color:#029746;
  }
`
export const TitleButton = styled.a`
    color: #fff;
    cursor: pointer;

    &:hover {
      color: #fff;
  }
`