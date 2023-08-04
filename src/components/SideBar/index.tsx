import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ContainerSideBar,
  BoxTop,
  Title,
  BoxLinksItem,
  Box,
  Icon,
  Text,
  ContentFooter,
} from "./styles";

import category from "../../assets/category.png";
import task from "../../assets/task.png";
import message from "../../assets/message.png";
import profile from "../../assets/profile.png";
import escala from "../../assets/escala.png";
import especialidade from "../../assets/especialidade.png";
import atuacao from "../../assets/atuacao.png";
import justificativa from "../../assets/justificativa.png";
import config from "../../assets/config.png";

import { Footer } from "../Footer";

import { AuthContext } from "../../contexts/Context";

interface LinkItemProps {
  name: string;
  icon: string; //IconType
  route: string;
}

export function SideBar() {
  const navigate = useNavigate();
  const { viewPonto } = useContext(AuthContext);

  const [viewPai, setViewPai] = useState(false);

  const toggleViewPai = () => {
    setViewPai(!viewPai);
  };

  return (
    <ContainerSideBar>
      <BoxTop>
        <Title>Plantão Med</Title>
      </BoxTop>

      <BoxLinksItem>
        {!viewPonto && (
          <Box>
            <Icon width="18px" height="18px" src={category} />
            <Text onClick={() => navigate("/dashboard")}>Dashboard</Text>
          </Box>
        )}
        {!viewPonto && (
          <Box>
            <Icon width="18px" height="18px" src={task} />
            <Text onClick={() => navigate("/doctors")}>Médicos</Text>
          </Box>
        )}
        {!viewPonto && (
          <Box>
            <Icon width="18px" height="18px" src={profile} />
            <Text onClick={() => navigate("/honda")}>Ronda</Text>
          </Box>
        )}
        <Box>
          <Icon width="18px" height="18px" src={task} />
          <Text onClick={() => navigate("/ponto")}>Plantão Digital</Text>
        </Box>
        {/* {!viewPonto && (
          <Box>
            <Icon width="18px" height="18px" src={escala} />
            <Text onClick={() => navigate("/scales")}>Escalas</Text>
          </Box>
        )} */}
        {!viewPonto && (
          <Box>
            <Icon width="18px" height="18px" src={profile} />
            <Text onClick={() => navigate("/newplantao")}>Novo Plantão</Text>
          </Box>
        )}
        <>
          <Box onClick={toggleViewPai}>
            <Icon width="18px" height="18px" src={config} />
            <Text>Configurações</Text>
          </Box>

          {viewPai && (
            <>
              <Box>
                <Icon width="18px" height="18px" src={profile} />
                <Text onClick={() => navigate("/profile")}>Usuários</Text>
              </Box>

              <Box>
                <Icon width="18px" height="18px" src={especialidade} />
                <Text onClick={() => navigate("/especialidades")}>
                  Especialidades
                </Text>
              </Box>
              <Box>
                <Icon width="18px" height="18px" src={atuacao} />
                <Text onClick={() => navigate("/performance")}>Atuação</Text>
              </Box>
              <Box>
                <Icon width="18px" height="18px" src={justificativa} />
                <Text onClick={() => navigate("/justification")}>
                  Justificativa
                </Text>
              </Box>
              <Box>
                <Icon width="18px" height="18px" src={message} />
                <Text onClick={() => navigate("/local")}>Locais</Text>
              </Box>
              <Box>
                <Icon width="18px" height="18px" src={message} />
                <Text onClick={() => navigate("/responsiblescalelist")}>Escalistas</Text>
              </Box>
            </>
          )}
        </>
      </BoxLinksItem>
      <ContentFooter>
        <Footer />
      </ContentFooter>
    </ContainerSideBar>
  );
}
