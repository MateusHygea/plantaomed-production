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
  Text,
} from "./styles";
import { toast } from "react-toastify";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

import { firebase } from "../../../service/DB";
import { SideBar } from "../../../components/SideBar";
import { Header } from "../../../components/Header";
import alert from "../../../assets/alert.png";

export function NewScales() {

  const navigate = useNavigate();

  const [nomeEscala, setNomeEscala] = useState("");
  const [dataEscala, setDataEscala] = useState("");
  const [inicioPlantao, setInicioPlantao] = useState("");
  const [terminoPlantao, setTerminoPlantao] = useState("");

  const _collectionRefUser = firebase.firestore().collection("_SCALES");

  async function enviarDados() {
    if (
      nomeEscala === "" ||
      dataEscala === "" ||
      inicioPlantao == "" ||
      terminoPlantao === ""
    ) {
      toast.warning("Preenche os dados!");
      return;
    }

    const dados = {
      nomeEscala: nomeEscala,
      data: dataEscala,
      inicioPlantao: inicioPlantao,
      terminoPlantao: terminoPlantao,
    };
    try {
      const docRef = await _collectionRefUser.add(dados);
      toast.success("Escala cadastrada com sucesso!");
      console.log("cadastrado com sucesso");
      //Limpando os campos preenchidos
      setNomeEscala("");
      setDataEscala("");
      setInicioPlantao("");
      setTerminoPlantao("");
      navigate("/scales")
    } catch (error) {
      toast.error("Erro ao cadastrar uma nova Escala");
      console.error("Erro ao cadastrar um local");
    }
  }

  const handleInputChange = (event: any) => {
    const formattedValue = event.target.value;
    setDataEscala(formattedValue);
  };
  const handleInputInicio = (event: any) => {
    const formattedValue = event.target.value;
    setInicioPlantao(formattedValue);
  };
  const handleInputChangeTermino = (event: any) => {
    const formattedValue = event.target.value;
    setTerminoPlantao(formattedValue);
  };
  return (
    <Container>
      <SideBar />

      <ContainerDashboard>
        <Header title={"Nova Escala"} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Nova Escala</ActionText>
            <Title>Novo Escala</Title>
          </ContTitle>
        </BoxTitleDashboard>

        <ContainerRegister>
          <ContainerRegisterNameAndPhone>
            <ContainerInputAndName>
              <TextName>Nome da escala</TextName>
              <Input>
                <InputTeste
                  placeholder="Titulo da escala"
                  value={nomeEscala}
                  onChange={(e) => setNomeEscala(e.target.value)}
                />
              </Input>
            </ContainerInputAndName>
          </ContainerRegisterNameAndPhone>

          <ContainerDataAndRegister>
            <ContainerInputAndName>
              <TextName>Data da escala</TextName>
              <InputDDD>
                <div className="input-container">
                  <InputMask
                    style={{
                      background: "none",
                      color: "black",
                      border: "none",
                    }}
                    mask="99/99/9999"
                    placeholder="DD/MM/AAAA"
                    onChange={handleInputChange}
                  />
                </div>
              </InputDDD>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>Início do Plantão</TextName>
              <InputPhone>
                <div className="input-container">
                  <InputMask
                    style={{
                      background: "none",
                      color: "black",
                      border: "none",
                    }}
                    mask="99:99"
                    placeholder="00:00"
                    onChange={handleInputInicio}
                  />
                </div>
              </InputPhone>
            </ContainerInputAndName>
            <ContainerInputAndName>
              <TextName>Termino do Plantão</TextName>
              <InputPhone>
                <div className="input-container">
                  <InputMask
                    style={{
                      background: "none",
                      color: "black",
                      border: "none",
                    }}
                    mask="99:99"
                    placeholder="00:00"
                    onChange={handleInputChangeTermino}
                  />
                </div>
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

          <ContainerButtonSave onClick={() => enviarDados()}>
            <TextButtonSave>Salvar Escala</TextButtonSave>
          </ContainerButtonSave>
        </ContainerLocal>
      </ContainerDashboard>
    </Container>
  );
}
