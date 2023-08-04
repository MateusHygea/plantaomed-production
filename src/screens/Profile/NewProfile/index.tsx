import React, { useState, useContext } from "react";

import {
  Container,
  ContainerDashboard,
  BoxTitleDashboard,
  ActionText,
  Title,
  ContTitle,
  ContainerRegister,
  ContainerRegisterNameAndPhone,
  ContainerInputAndName,
  TextName,
  Input,
  InputDDD,
  InputPhone,
  InputCRM,
  ContainerDataAndRegister,
  ContainerLocal,
  InputCidade,
  ContainerAlert,
  TextAlert,
  ContainerButtonSave,
  TextButtonSave,
  InputTeste,
  ImageAlert,
  Text
} from "./styles";
import { toast } from "react-toastify";

import { firebase } from "../../../service/DB";
import { SideBar } from "../../../components/SideBar";
import { InputComponent } from "../../../components/Input";
import { Header } from "../../../components/Header";
import alert from "../../../assets/alert.png";
import { AuthContext } from "../../../contexts/Context";

export function NewProfile() {
  const {signUp} = useContext(AuthContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const _collectionRefUser = firebase.firestore().collection("_USERS");

  async function SignUp() {
    if (
      name === "" ||
      email === "" ||
      password == "" ||
      confirmPassword === ""
    ) {
      toast.warning("Preenche os dados!");
      return;
    }
    await signUp({name, email,confirmPassword, password})
  }

  return (
    <Container>
      <SideBar />

      <ContainerDashboard>
        <Header title={'Novo Usuário'} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Novo Usuário</ActionText>
            <Title>Novo Usuário</Title>
          </ContTitle>
        </BoxTitleDashboard>

        <ContainerRegister>
          <ContainerRegisterNameAndPhone>
            <ContainerInputAndName>
              <TextName>Nome</TextName>
              <Input>
                <InputTeste
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Input>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>E-mail</TextName>
              <Input>
                <InputTeste
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Input>
            </ContainerInputAndName>
          </ContainerRegisterNameAndPhone>

          <ContainerDataAndRegister>
            <ContainerInputAndName>
              <TextName>Senha</TextName>
              <InputDDD>
                <InputTeste
                  placeholder="Digite sua senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputDDD>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>Confirme senha</TextName>
              <InputPhone>
                <InputTeste
                  placeholder="Confirme sua senha"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </InputPhone>
            </ContainerInputAndName>
          </ContainerDataAndRegister>
        </ContainerRegister>

        <ContainerLocal>
          <ContainerAlert>
            <ImageAlert src={alert} />
            <Text>
              <TextAlert>Importante!</TextAlert>
              <TextAlert>Preencha todos os dados</TextAlert>
            </Text>
          </ContainerAlert>

          <ContainerButtonSave onClick={() => SignUp()}>
            <TextButtonSave>Salvar usuário</TextButtonSave>
          </ContainerButtonSave>
        </ContainerLocal>
      </ContainerDashboard>
    </Container>
  );
}
