import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const BoxCenter = styled.div`
  display: flex;
`;
export const BoxSignIn = styled.div`
  width: 585px;
  height: 550px;
  background-color: #ffff;
`;
export const Title = styled.h1`
  color: #000000;
  font-size: 32px;
`;
export const BoxText = styled.div`
  width: 585px;
  height: 550px;
  background-color: #00A84D;
`;
export const BoxForm = styled.div`
    margin-left: 93px;
    margin-top: 71px;
`;
export const BoxEmail = styled.div``
export const InputTeste = styled.input`
  all: unset;
  color: #000000;
  width: 100%;
`
export const BoxPassword = styled.div`
    margin-top: 30px;
`
export const TextEmail = styled.p`
  color: #acb6be;
`;
export const BoxInput = styled.div`
    height: 48px;
    width: 400px;
    border: 1px solid #acb6be;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0px 15px;
`;
export const Input = styled.input`
  text-decoration: none;
`;
export const ButtonAccess = styled.button`
    height: 48px;
    width: 400px;
    background-color: #00A84D;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    margin-top: 35px;
    margin-bottom: 30px;

    cursor: pointer;

    &:hover {
      background-color: #029746;
    }
`
export const TextBtn = styled.a`
    color: #fff;
    cursor: pointer;
  
    &:hover {
      color: #fff;
    }   
`
export const TextAlert = styled.a`
    color: #acb6be;
    cursor: pointer;
    &:hover {
      color: #acb6be;
    }   
`
export const ImageBackground = styled.img``