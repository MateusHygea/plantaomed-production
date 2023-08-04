import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  //height: 330vh;
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
  margin-left: 32px;
`;
export const ButtonAction = styled.div`
    height: 40px;
    margin-right: 8%;
    background-color: #00A84D;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #029746;
    }
`
export const TitleButton = styled.a`
    color: #fff;
    cursor: pointer;
    margin: 0px 25px;
    &:hover {
      color: #fff;
    }
`

export const ContainerTags = styled.div`
  display: flex;
`
export const Tag = styled.div`
  width: 200px;
  height: 44px;
  border: 1px solid #00A84D;
  border-radius: 8px;
  margin-left: 32px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const TitleTag = styled.p`
  color: #00A84D;
  font-size: 15px;
`
export const ContainerListName = styled.div`
  width: 978px;
  height: 236px;
  margin-left: 32px;
  padding: 42px 0px;
`
export const Names = styled.p`
  color: #ccc;
  font-size: 14px;
`
export const ContainerNames = styled.div`
  border-bottom: 1px solid #E5E9EB;
  width: 978px;
  display: flex;
  justify-content: space-between;
`
export const ContainerListNamesOf = styled.div`
  display: flex;
  justify-content: space-between;
  width: 990px;
`
export const BoxList = styled.div`
`
export const TitleName = styled.p`
  color: #000000;
  font-size: 14px;
`
export const BoxFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Photo = styled.div`
  height: 24px;
  width: 24px;
  background-color: #ccc;
  border-radius: 64px;
  margin-right: 10px;
`