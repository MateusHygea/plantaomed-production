import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  ContainerDashboard,
  BoxTitleDashboard,
  ActionText,
  Title,
  ContTitle,
  ButtonAction,
  TitleButton
} from "./styles";

import { SideBar } from "../../components/SideBar";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/Context";

import {firebase} from '../../service/DB'
export function Dashboard() {
  
  //dashboard
  const navigate = useNavigate()
  const { viewPonto, user } = useContext(AuthContext);
  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      e.preventDefault();
    };

    window.history.pushState({ key: "some-unique-key" }, "", window.location.href);
    window.onpopstate = handleBackButton;

    return () => {
      window.onpopstate = null;
    };
  }, []);

  return (
    <Container>
      <SideBar />

      <ContainerDashboard>
        <Header title={'Dashboard'} />
        <BoxTitleDashboard>

          <ContTitle>
            <ActionText>Dashboard</ActionText>
            <Title>Dashboard</Title>
          </ContTitle>

          {!viewPonto &&<ButtonAction>
            <TitleButton onClick={() => navigate("/newdoctors")}>+ Novo Médico</TitleButton>
          </ButtonAction>}
        </BoxTitleDashboard>
      </ContainerDashboard>
    </Container>
  );
}
