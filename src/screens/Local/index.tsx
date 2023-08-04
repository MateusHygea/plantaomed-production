import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
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
  BoxName,
} from "./styles";

import { SideBar } from "../../components/SideBar";
import { firebase } from "../../service/DB";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";

interface Item {
  Titulo: string;
  Endereco: string;
  Cidade: String;
  Estado: string;
}

interface CollectionData {
  field1: string;
  field2: string;
  field3: string;
}
export function Local() {
  const navigate = useNavigate();

  const [threads, setThreads] = useState<Item[]>([]);
  const [collectionData, setCollectionData] = useState<CollectionData[]>([]);

  var db = firebase.firestore();
  var itemsRef = db.collection("_LOCAL");

  const getLocal = useCallback(() => {
    const unsubscribe = itemsRef.onSnapshot((querySnapshot) => {
      const docs = querySnapshot.docs.map(
        (doc) => doc.data() as Item & CollectionData
      );
      setThreads(docs);
      setCollectionData(docs);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = getLocal();
    return unsubscribe;
  }, [getLocal]);

  

  return (
    <Container>
      <SideBar />

      <ContainerDashboard>
        <Header title={'Locais'} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Locais</ActionText>
            <Title>Todos os locais</Title>
          </ContTitle>

          <ButtonAction>
            <TitleButton onClick={() => navigate("/newlocal")}>
              + Novo Local
            </TitleButton>
          </ButtonAction>
        </BoxTitleDashboard>

        <Tag>
          <TitleTag>
            <CSVLink
              style={{ color: "#00A84D" }}
              data={collectionData}
              filename={"Relatorio_Local.csv"}>
              Exportar Relatório
            </CSVLink>
          </TitleTag>
        </Tag>

        <ContainerListName>
          <ContainerNames>
            <BoxName>
              <Names>Título</Names>
              <Names>Endereço</Names>
              <Names>Cidade</Names>
              <Names>Estado</Names>
            </BoxName>
          </ContainerNames>

          {threads.map((item, index) => (
            <ContainerListNamesOf key={index}>
              <BoxList>{<TitleName>{item?.Titulo}</TitleName>}</BoxList>
              <BoxList>{<TitleName>{item?.Endereco}</TitleName>}</BoxList>
              <BoxList>
                {
                  <TitleName style={{ marginLeft: 30 }}>
                    {item?.Cidade}
                  </TitleName>
                }
              </BoxList>
              <BoxList>
                {
                  <TitleName style={{ marginLeft: 45 }}>
                    {item?.Estado}
                  </TitleName>
                }
              </BoxList>
            </ContainerListNamesOf>
          ))}
        </ContainerListName>
      </ContainerDashboard>
    </Container>
  );
}
