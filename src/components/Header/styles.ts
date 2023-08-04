import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 8px 10px;
`;


export const Content = styled.div`
  display: flex;
  padding: 8px 25px 0;
  align-items: center;
`;


export const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -10px;
  border-bottom: 1px solid #00A84D;
`;

export const Title = styled.span`
  padding: 0 8px;
  font-weight: 600;
  color: #00A84D;
`;

export const ContainerInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #DDE2E4;
  border-radius: 7px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
  padding: 8px 12px;
`;

export const Icon = styled.img`
`;

export const TextInputFilter = styled.input`
  all: unset;
  color: #000000;
  width: 100%;
  margin-left: 10px;

  ::placeholder {
    color: #DDE2E4
  }
`

export const ContainerSettings = styled.div`
  display: flex;
  padding: 8px 25px;
`;