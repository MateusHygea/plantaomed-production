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
  Text
} from "./styles";
import { toast } from "react-toastify";

import { SideBar } from "../../../components/SideBar";
import { InputComponent } from "../../../components/Input";
import { firebase } from "../../../service/DB";
import { Header } from "../../../components/Header";
import alert from "../../../assets/alert.png";

export function NewLocal() {
  const [title, setTitle] = useState("");
  const [endereco, setEndereco] = useState("");
  const [number, setNumber] = useState("");
  const [bairro, setBairro] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const _collectionRefUser = firebase.firestore().collection("_LOCAL");

  async function enviarDados() {
    if (
      title === "" ||
      endereco === "" ||
      number == "" ||
      bairro === "" ||
      city == "" ||
      state == ""
    ) {
      toast.warning("Preenche os dados!");
      return;
    }
    const dados = {
      Titulo: title,
      Endereco: endereco,
      Numero: number,
      Bairro: bairro,
      Cidade: city,
      Estado: state,
    };
    try {
      const docRef = await _collectionRefUser.add(dados);
      toast.success("Local cadastrado com sucesso!");
      console.log("cadastrado com sucesso");
      //Limpando os campos preenchidos
      setTitle("");
      setEndereco("");
      setNumber("");
      setBairro("");
      setCity("");
      setState("");
    } catch (error) {
      toast.error("Erro ao cadastrar um local");
      console.error("Erro ao cadastrar um local");
    }
  }

  return (
    <Container>
      <SideBar />

      <ContainerDashboard>
        <Header title={'Novo Local'} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Novo Local</ActionText>
            <Title>Novo Local</Title>
          </ContTitle>
        </BoxTitleDashboard>

        <ContainerRegister>
          <ContainerRegisterNameAndPhone>
            <ContainerInputAndName>
              <TextName>Título</TextName>
              <Input>
                <InputTeste
                  placeholder="Digite o Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Input>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>Endereço</TextName>
              <Input>
                <InputTeste
                  placeholder="Digite o endereço"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </Input>
            </ContainerInputAndName>
          </ContainerRegisterNameAndPhone>

          <ContainerDataAndRegister>
            <ContainerInputAndName>
              <TextName>Número</TextName>
              <InputDDD>
                <InputTeste
                  placeholder="Digite o número"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </InputDDD>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>Bairro</TextName>
              <InputPhone>
                <InputTeste
                  placeholder="Digite o bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </InputPhone>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>Cidade</TextName>
              <InputCRM>
                <InputTeste
                  placeholder="Digite a cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </InputCRM>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>Estado</TextName>
              <InputCidade>
                <InputTeste
                  placeholder="Digite o estado"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </InputCidade>
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
          <ContainerButtonSave onClick={enviarDados}>
            <TextButtonSave>Salvar cadastro</TextButtonSave>
          </ContainerButtonSave>
        </ContainerLocal>
      </ContainerDashboard>
    </Container>
  );
}
