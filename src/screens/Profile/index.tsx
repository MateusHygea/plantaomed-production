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
  name: string;
  email: string;
}

export function Profile() {
  const navigate = useNavigate();

  const [threads, setThreads] = useState<Item[]>([]);

  var db = firebase.firestore();
  var itemsRef = db.collection("_USERS");

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
        <Header title={'Usuários'} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Usuários</ActionText>
            <Title>Todos os usuários</Title>
          </ContTitle>

          <ButtonAction>
            <TitleButton onClick={() => navigate("/newprofile")}>
              + Novo Usuário
            </TitleButton>
          </ButtonAction>
        </BoxTitleDashboard>

        <ContainerListName>
          <ContainerNames>
            <Names>Nome do usuário</Names>
            <Names>E-mail</Names>
            {/* <Names>Status</Names> */}
          </ContainerNames>

          {threads.length === 0 && <Names>Nenhum usuário cadastrado!</Names>}
          {threads.map((item, index) => (
            <ContainerListNamesOf key={index}>
              <BoxList>{<TitleName>{item?.name}</TitleName>}</BoxList>
              <BoxList>{<TitleName>{item?.email}</TitleName>}</BoxList>
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
