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

import { firebase } from "../../../service/DB";
import { SideBar } from "../../../components/SideBar";
import { Header } from "../../../components/Header";
import alert from "../../../assets/alert.png";

import { useNavigate } from "react-router-dom";

export function NewPerformance() {

  const navigate = useNavigate();

  const [atuacao, setAtuacao] = useState("");

  const _collectionRefUser = firebase.firestore().collection("_PERFORMANCE");

  async function enviarDados() {
    if (atuacao === "") {
      toast.warning("Preenche os dados!");
      return;
    }
    const dados = {
      atuacao: atuacao,
    };
    try {
      const docRef = await _collectionRefUser.add(dados);
      toast.success("Especialidade cadastrada com sucesso!");
      console.log("cadastrado com sucesso");
      //Limpando os campos preenchidos
      setAtuacao("");
      navigate('/performance')
    } catch (error) {
      toast.error("Erro ao cadastrar uma nova especialidade");
      console.error("Erro ao cadastrar um local");
    }
  }

  return (
    <Container>
      <SideBar />

      <ContainerDashboard>
        <Header title={"Nova Área de Atuação"} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Nova Atuação</ActionText>
            <Title>Nova Atuação</Title>
          </ContTitle>
        </BoxTitleDashboard>

        <ContainerRegister>
          <ContainerRegisterNameAndPhone>
            <ContainerInputAndName>
              <TextName>Área de Atuação</TextName>
              <Input>
                <InputTeste
                  placeholder="Digite a área de atuação"
                  value={atuacao}
                  onChange={(e) => setAtuacao(e.target.value)}
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
            <TextButtonSave>Cadastrar Atuação</TextButtonSave>
          </ContainerButtonSave>
        </ContainerLocal>
      </ContainerDashboard>
    </Container>
  );
}
