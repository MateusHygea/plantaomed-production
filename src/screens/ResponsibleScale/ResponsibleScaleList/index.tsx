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

import { SideBar } from "../../../components/SideBar";
import { firebase } from "../../../service/DB";
import { Header } from "../../../components/Header";

interface Item {
  escalistaName: string;
}

export function ResponsibleScaleList() {
  const navigate = useNavigate();

  const [threads, setThreads] = useState<Item[]>([]);

  var db = firebase.firestore();
  var itemsRef = db.collection("_RESPSCALE");

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
        <Header title={'Escalistas'} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Escalistas</ActionText>
            <Title>Todos os Escalista</Title>
          </ContTitle>

          <ButtonAction>
            <TitleButton onClick={() => navigate("/responsiblescale")}>
              + Novo Escalista
            </TitleButton>
          </ButtonAction>
        </BoxTitleDashboard>

        <ContainerListName>
          <ContainerNames>
            <Names>Escalista</Names>
            {/* <Names>Status</Names> */}
          </ContainerNames>

          {threads.length === 0 && <Names>Nenhum Escalista</Names>}
          {threads.map((item, index) => (
            <ContainerListNamesOf key={index}>
              <BoxList>{<TitleName>{item?.escalistaName}</TitleName>}</BoxList>
              {/* <BoxList>{<TitleName>{item?.email}</TitleName>}</BoxList> */}
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
