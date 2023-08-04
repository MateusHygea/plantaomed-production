import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: #fff;
  height: 140vh;
`;
export const ContainerDashboard = styled.div`
  width: 100%;
  background-color: #fff;
`;
export const BoxTitleDashboard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e9eb;
`;
export const ContTitle = styled.div`
  display: flex;
  flex-direction: column;
`;
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
  background-color: #00a84d;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ContainerRegister = styled.div`
  margin-left: 32px;
`;
export const ContainerRegisterNameAndPhone = styled.div`
  display: flex;
`;
export const ContainerInputAndName = styled.div`
  margin-right: 25px;
`;
export const TextName = styled.text`
  color: #000000;
`;
export const Input = styled.div`
  height: 40px;
  width: 300px;
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
export const ButtonAtendimentoRealizados = styled.div`
  height: 60px;
  width:320px;
  background-color: #1DC96C;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  font-size: 20px;
  color: #fff;
`
export const InputAtendimentos = styled.div`
   height: 40px;
  width: 130px;
  border-radius: 8px;
  border: 1px solid #e6e6f0;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 0px 15px;

  &:hover {
    border: 2px solid #00a84d;
  }
`
export const InputData = styled.div`
  height: 40px;
  width: 150px;
  border-radius: 8px;
  border: 1px solid #e6e6f0;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 0px 15px;

  &:hover {
    border: 2px solid #00a84d;
  }
`
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
export const InputNameMedico = styled.div`
 height: 40px;
  width: 180px;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 0px 15px;

  &:hover {
    border: 2px solid #00a84d;
  }
`
export const InputNameTextArea = styled.div`
  height: 100px;
  width: 380px;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 0px 15px;

  &:hover {
    border: 2px solid #00a84d;
  }
`
export const InputJustificativa = styled.div`
 height: 40px;
  width: 280px;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 0px 15px;

  &:hover {
    border: 2px solid #00a84d;
  }
`
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
`;
export const ContainerLocal = styled.div`
  margin-left: 32px;
  width: 100vh;
`;
export const AlignRowBox = styled.div`
  display: flex;
`
export const ContainerTitleAndButton = styled.div`
  align-items: center;
  width: 608px;
  justify-content: space-between;
  margin-top: 16px;
  //border-bottom: 1px solid #e6e6f0;
  //background-color: red;
`;
export const ButtonNewLocal = styled.a`
  color: #00a84d;
  cursor: pointer;
`;
export const TitleLocal = styled.h1`
  color: #000000;
  font-size: 24px;
`;
export const InputSelectLocal = styled.div`
  width: 340px;
  border-radius: 8px;
  margin-top: 24px;
`;
export const InputSelectTipo = styled.div`
   width: 300px;
  border-radius: 8px;
  margin-top: 100px;
`
export const TitleSelect = styled.p`
  color: #e6e6f0;
`;
export const ContainerNameLocalAndCity = styled.div`
  height: 160px;
  width: 459px;
  border-radius: 16px;
  background-color: #F7F9FB;
  margin-top: 20px;
`;
export const InputTeste = styled.input`
  all: unset;
  color: #000000;
  width: 100%;
  ::placeholder {
    color: #DDE2E4
  }
`
export const ContainerTitle = styled.div`
  display: flex;
  width: 380px;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6f0;
  padding: 0px 20px;
`
export const Titulo = styled.p`
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
`;
export const ContainerListNames = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
`;
export const ContainerFlexList = styled.div`
`;
export const TitleNameLocal = styled.p`
  color: #000000;
  font-size: 12px;
`;
export const ContainerButtonSave = styled.button`
  all: unset;
  height: 56px;
  width: 197px;
  background-color: #00a84d;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
      background-color: #029746;
    }
`;
export const ContainerButtonAtualizar = styled.button`
  all: unset;
  height: 40px;
  width: 130px;
  background-color: #00a84d;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
      background-color: #029746;
    }
`
export const TextButtonSave = styled.a`
  color: #fff;
  cursor: pointer;

  &:hover {
      color: #fff;
    }
`;
export const ContainerBoxEnd = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 120px;
`
export const ContainerDisplayFlex = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 50px;
  width: 155%;
  //background-color: red;
`
export const ContainerAlert = styled.div`
  display: flex;
  margin-bottom: 25px;
  align-items: center; 
`
export const TextAlert = styled.p`
  color: #A0A0B2;
  padding: 0 8px;
  margin: 0;
`

export const ImageAlert = styled.img`
  padding: 0 8px;
  width: 30px;
  height: 30px;
`;

export const Text = styled.div`
`;
export const BoxTeste = styled.div`
  padding-top: 20px;
`