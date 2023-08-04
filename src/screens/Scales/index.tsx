import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ContainerDashboard,
  BoxTitleDashboard,
  ActionText,
  Title,
  ContTitle,
  ButtonAction,
  TitleButton,
  ContainerTags,
  Tag,
  TitleTag,
  ContainerListName,
  ContainerNames,
  Names,
  ContainerListNamesOf,
  BoxList,
  TitleName,
  BoxFlex,
  Photo,
} from "./styles";


import { SideBar } from "../../components/SideBar";
import { firebase } from "../../service/DB";
import { Header } from "../../components/Header";

interface Item {
  nomeEscala: string;
  data: string;
  inicioPlantao: string;
  terminoPlantao: string;
}

export function Scales() {
  const navigate = useNavigate();

  const [threads, setThreads] = useState<Item[]>([]);

  var db = firebase.firestore();
  var itemsRef = db.collection("_SCALES");

  const getProfileUsers = useCallback(() => {
    const unsubscribe = itemsRef.onSnapshot((querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => doc.data() as Item);
      setThreads(docs);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = getProfileUsers();
    return unsubscribe;
  }, [getProfileUsers]);

  return (
    <Container>
      <SideBar />

      <ContainerDashboard>
        <Header title={'Escalas'} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Escalas</ActionText>
            <Title>Todas as escalas</Title>
          </ContTitle>

          <ButtonAction>
            <TitleButton onClick={() => navigate("/newscales")}>
              + Nova Escala
            </TitleButton>
          </ButtonAction>
        </BoxTitleDashboard>

        <ContainerListName>
          <ContainerNames>
            <Names>Titulo da escala</Names>
            <Names>Início do plantão</Names>
            <Names>Termino do plantão</Names>
            <Names>Data</Names>
          </ContainerNames>

          {threads.length === 0 && <Names>Nenhuma escala encontrada!</Names>}
          {threads.map((item, index) => (
            <ContainerListNamesOf key={index}>
              <BoxList>{<TitleName>{item?.nomeEscala}</TitleName>}</BoxList>
              <BoxList>{<TitleName>{item?.inicioPlantao}</TitleName>}</BoxList>
              <BoxList>{<TitleName>{item?.terminoPlantao}</TitleName>}</BoxList>
              <BoxList>{<TitleName>{item?.data}</TitleName>}</BoxList>
              {/* <BoxList>
                <TitleName>Suspenso</TitleName>
                <TitleName>Aprovado</TitleName>
                <TitleName>Analisar</TitleName>
              </BoxList> */}
            </ContainerListNamesOf>
          ))}
        </ContainerListName>
      </ContainerDashboard>
    </Container>
  );
}
