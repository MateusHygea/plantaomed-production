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
  margin-left: 32px;
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
`
export const TitleButton = styled.a`
    color: #fff;
    cursor: pointer;
`

export const ContainerTags = styled.div`
  display: flex;
`
export const BoxName = styled.div`
  display: flex;
  width: 100%;

  p:first-child{
    width: 30%;
  }
  p:not(:first-child){
    width: 17.5%; 
  }
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
export const TextInputFilter = styled.input`
  all: unset;
  color: #00A84D;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 45px;
  ::placeholder {
    color: #00A84D
  }
`
export const ContainerListName = styled.div`
  height: 10px;
  margin-left: 32px;
  padding: 42px 0px;
`
export const Names = styled.p`
  color: #ccc;
  font-size: 14px;
`
export const ContainerNames = styled.div`
  border-bottom: 1px solid #E5E9EB;
  display: flex;
  justify-content: space-between;
`
export const ContainerListNamesOf = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  align-items: center;
  padding: 8px 28px;
  width: 100%;
`
export const BoxList = styled.div`
  padding: 0 8px;
  display: flex;
  align-items: center;
  width: 20%;
`
export const BoxListFirst = styled.div`
  padding: 0 8px;
  display: flex;
  align-items: center;
  width: 30%;
`


export const TitleName = styled.p`
  color: #000000;
  font-size: 14px;
  padding: 0 8px;
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
export const ContainerCalendar = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`
export const ContainerCalendarMonth = styled.div`
width: 62%;
display: flex;
align-items: center;
justify-content: flex-end;
`
export const BoxTitle = styled.p`
  color: #000000;
  font-size: 14px;
  padding: 0 8px;
  width: 20%;
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 200px;
  background-color: blue;
`;

export const IconPhoto = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 200px;
`;

export const ImagePhoto = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 200px;
`;

export const Lightbox = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  //width: 100%;
  height: 100%;
  background-color: rgba(196, 155, 237, 0.52);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LightboxImage = styled.img`
`;

export const ContentPaginate = styled.div`
  cursor: pointer;
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const Loading = styled.p`
  display: flex;
  justify-content: center;
  color: #00A84D;
`

export const InputSelectLocal = styled.div`
  width: 400px;
  border-radius: 8px;
  padding-left: 19px;
  margin-top: 24px;
`;

export const TitleSelect = styled.div`
  color: #00A84D;
  font-size: 15px;
  padding: 0.9rem 0;
`
export const ContainerTable = styled.div`
  width: 100%;
`