import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Selected from "react-select";

import makeAnimated from "react-select/animated";
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
  ContainerDataAndRegister,
  ContainerLocal,
  ContainerTitleAndButton,
  ButtonNewLocal,
  TitleLocal,
  InputSelectLocal,
  Titulo,
  InputTeste,
  ContainerButtonSave,
  TextButtonSave,
  ContainerDisplayFlex,
  ContainerAlert,
  ImageAlert,
  Text,
  TextAlert
} from "./styles";
import "./style.css";
import { toast } from "react-toastify";

import { firebase } from "../../../service/DB";
import { SideBar } from "../../../components/SideBar";
import { Header } from "../../../components/Header";
import alert from "../../../assets/alert.png";


interface Item {
  Titulo: string;
}

interface PropsData {
  nome: string;
  telefone: string;
  DDD: string;
  CRM: string;
  Hospital: string;
}

export function NewDoctors() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ddd, setDdd] = useState("");
  const [crm, setCrm] = useState("");

  const [list, setList] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const animatedComponents = makeAnimated();

  const db = firebase.firestore();

  const _collectionRefUser = firebase.firestore().collection("_DOCTORS");

  const options = list.map((item) => ({
    value: item?.Titulo,
    label: item?.Titulo,
  }));

  useEffect(() => {
    let isActive = true;
    db.collection("_LOCAL")
      .get()
      .then((snapshot) => {
        const listData: Item[] = [];
        snapshot.forEach((document) => {
          listData.push({ Titulo, ...document.data() });
        });
        setList(listData);
      })
      .catch((error) => {
        console.error("error", error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  async function enviarDados() {
    if (name === "" || phone == "" || ddd === "" || crm === "") {
      toast.warning("Preenche os dados!");
      return;
    }
    const validateDoctorCRM = await _collectionRefUser
      .where("CRM", "==", crm)
      .get();
    if (!validateDoctorCRM.empty) {
      toast.error("Médico já cadastrado");
      return;
    }
    const dados = {
      nome: name,
      telefone: phone,
      DDD: ddd,
      CRM: crm,
      Plantão: selectedItem,
    };
    try {
      const docRef = await _collectionRefUser.add(dados);
      toast.success("Médico cadastrado com sucesso");
      console.log("Médico Cadastro");
      setName("");
      setPhone("");
      setDdd("");
      setCrm("");
      setSelectedItem(null);
    } catch (error) {
      toast.error("Erro ao cadastrar um médico");
      console.error("Erro ao cadastrar um médico");
    }
  }

  const handleChange = (selectedOption: any) => {
    setSelectedItem(selectedOption);
  };

  return (
    <Container>
      <SideBar />

      <ContainerDashboard>
        <Header title={'Novo Médico'} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Novo Médico</ActionText>
            <Title>Novo médico</Title>
          </ContTitle>
        </BoxTitleDashboard>

        <ContainerRegister>
          <ContainerRegisterNameAndPhone>
            <ContainerInputAndName>
              <TextName>Nome completo</TextName>
              <Input>
                <InputTeste
                  placeholder="Digite seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Input>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>CRM</TextName>
              <Input>
                <InputTeste
                  placeholder="Digite seu CRM"
                  value={crm}
                  onChange={(e) => setCrm(e.target.value)}
                />
              </Input>
            </ContainerInputAndName>
          </ContainerRegisterNameAndPhone>

          <ContainerDataAndRegister>
            <ContainerInputAndName>
              <TextName>DDD</TextName>
              <InputDDD>
                <InputTeste
                  maxLength={2}
                  placeholder="Digite o DDD"
                  value={ddd}
                  onChange={(e) => setDdd(e.target.value)}
                />
              </InputDDD>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>Telefone</TextName>
              <InputPhone>
                <InputTeste
                  maxLength={9}
                  placeholder="Digite seu telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputPhone>
            </ContainerInputAndName>
          </ContainerDataAndRegister>
        </ContainerRegister>

        <ContainerLocal>
          <ContainerTitleAndButton>
            <TitleLocal>Locais</TitleLocal>
            <ButtonNewLocal onClick={() => navigate("/newlocal")}>
              + Novo Local
            </ButtonNewLocal>
          </ContainerTitleAndButton>

          <InputSelectLocal>
            <Selected
              className="select"
              closeMenuOnSelect={false}
              components={animatedComponents}
              placeholder="Seleciona o local"
              isMulti
              options={options}
              onChange={handleChange}
            />
          </InputSelectLocal>

          <ContainerDisplayFlex>
          <ContainerAlert>
            <ImageAlert src={alert} />
            <Text>
              <TextAlert>Importante!</TextAlert>
              <TextAlert>Preencha todos os dados</TextAlert>
            </Text>
          </ContainerAlert>
            <ContainerButtonSave onClick={() => enviarDados()}>
              <TextButtonSave>Salvar Cadastro</TextButtonSave>
            </ContainerButtonSave>
          </ContainerDisplayFlex>
        </ContainerLocal>
      </ContainerDashboard>
    </Container>
  );
}
