import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 163vh;
  background-color: #fff;
`;
export const ContainerDashboard = styled.div`
  width: max-content;
`;
export const BoxTitleDashboard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #E5E9EB;
`;
export const BoxSearchFilter = styled.div`
  width: 70%;
  height: 70px;
  margin-left: 32px;
  margin-top: 15px;
`
export const Filter = styled.div`
  border: 1px solid #DDE2E4;
  border-radius: 6px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
`
export const TextInputFilter = styled.input`
  all: unset;
  color: #000000;
  width: 100%;
  margin-left: 10px;

  ::placeholder {
    color: #DDE2E4
  }
`

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
export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`
export const ButtonAction = styled.div`
    margin-top: 35px;
    margin-left: 20px;
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
      background-color: #029746;
    }
`
export const ButtonClosedModal = styled.div`
    height: 40px;
    width: 133px;
    margin-right: 8%;
    background-color: #CC0000;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #B00202;
    }
`
export const TitleButton = styled.a`
    color: #fff;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
`
export const ContainerListName = styled.div`
  height: 236px;
  margin-left: 32px;
  padding: 0px 0px;
`
export const Names = styled.p`
  color: #ccc;
  font-size: 14px;
`
export const BoxNames = styled.div`
  display: flex;
`
export const ContainerNames = styled.div`
  border-bottom: 1px solid #E5E9EB;
  width: 978px;
  display: flex;
  justify-content: space-between;
`

export const BoxTitle = styled.p`
  color: #000000;
  font-size: 14px;
  width: 305px;
`;

export const ContainerListNamesOf = styled.div`
  display: flex;
  width: 800px;
  align-items: flex-start;
  justify-content: space-between;
`
export const BoxList = styled.div`
  display: flex;
  align-items: center;
  width: 390px;
  padding: 0 8x;
`
export const TitleName = styled.p`
  color: #000000;
  font-size: 14px;
`
export const BoxFlex = styled.div`
  min-width: 19em;
  display: flex;
  justify-content: start;
  text-align: left;
`
export const Photo = styled.div`
  height: 24px;
  width: 24px;
  background-color: #ccc;
  border-radius: 64px;
  margin-right: 10px;
`
//Modal Styles

export const ContainerRegister = styled.div`
  margin-left: 32px;
`;
export const ContainerFilterAlignRow = styled.div`

`
export const ContainerHeaderAlign = styled.div`
  display: flex;
  margin-top: 25px;
  margin-bottom: 35px;
  margin-left: 15px;
`
export const ContainerRegisterNameAndPhone = styled.div`
  display: flex;
`;
export const ContainerInputAndName = styled.div`
  margin-right: 35px;
`;
export const TextName = styled.text`
  color: #000000;
  margin-left: 20px;
`;
export const Input = styled.div`
  height: 40px;
  width: 440px;
  border-radius: 8px;
  border: 1px solid #e6e6f0;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 0px 15px;

  &:hover {
    border: 2px solid #00a84d;
  }
`;
export const InputDDD = styled.div`
  height: 40px;
  width: 100px;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 0px 15px;

  &:hover {
    border: 2px solid #00a84d;
  }
`;
export const InputPhone = styled.div`
  height: 40px;
  width: 320px;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 0px 15px;

  &:hover {
    border: 2px solid #00a84d;
  }
`;
export const InputCRM = styled.div`
  height: 40px;
  width: 200px;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 0px 15px;

  &:hover {
    border: 2px solid #00a84d;
  }
`;
export const ContainerDataAndRegister = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
`;
export const InputTeste = styled.input`
  all: unset;
  color: #000000;
  width: 100%;
`
export const DisplayButton = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`
export const InputSelectLocal = styled.div`
  width: 300px;
  border-radius: 8px;
  padding-left: 19px;
  margin-top: 10px;
`;