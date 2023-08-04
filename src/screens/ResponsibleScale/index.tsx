import React, { useState } from "react";

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
  ContainerDataAndRegister,
  ContainerLocal,
  ContainerAlert,
  TextAlert,
  ContainerButtonSave,
  TextButtonSave,
  InputTeste,
  ImageAlert,
  Text,
} from "./styles";
import { toast } from "react-toastify";

import { firebase } from "../../service/DB";
import { SideBar } from "../../components/SideBar";
import { Header } from "../../components/Header"
import alert from "../../assets/alert.png";

import { useNavigate } from "react-router-dom";

export function ResponsibleScale() {

  const navigate = useNavigate();

  const [especialidade, setEspecialidade] = useState("");

  const _collectionRefUser = firebase.firestore().collection("_RESPSCALE");

  async function enviarDados() {
    if (especialidade === "") {
      toast.warning("Preenche os dados!");
      return;
    }
    const dados = {
      escalistaName: especialidade,
    };
    try {
      const docRef = await _collectionRefUser.add(dados);
      toast.success("Escalista cadastrada com sucesso!");
      console.log("cadastrado com sucesso");
      //Limpando os campos preenchidos
      setEspecialidade("");
      //navigate("/especialidades")
    } catch (error) {
      toast.error("Erro ao cadastrar escalista");
      console.error("Erro ao cadastrar um local");
    }
  }

  return (
    <Container>
      <SideBar />

      <ContainerDashboard>
        <Header title={"Novo Escalistas"} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Novo Escalistas</ActionText>
            <Title>Novo Escalistas</Title>
          </ContTitle>
        </BoxTitleDashboard>

        <ContainerRegister>
          <ContainerRegisterNameAndPhone>
            <ContainerInputAndName>
              <TextName>Escalista</TextName>
              <Input>
                <InputTeste
                  placeholder="Digite o nome do escalista"
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                />
              </Input>
            </ContainerInputAndName>
          </ContainerRegisterNameAndPhone>

          <ContainerDataAndRegister></ContainerDataAndRegister>
        </ContainerRegister>

        <ContainerLocal>
          <ContainerAlert>
            <ImageAlert src={alert} />
            <Text>
              <TextAlert>Importante!</TextAlert>
              <TextAlert>Preencha todos os dados</TextAlert>
            </Text>
          </ContainerAlert>

          <ContainerButtonSave onClick={() => enviarDados()}>
            <TextButtonSave>Salvar</TextButtonSave>
          </ContainerButtonSave>
        </ContainerLocal>
      </ContainerDashboard>
    </Container>
  );
}
