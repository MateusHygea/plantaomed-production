import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import header from "../../assets/left-alignment.png";
import settings from "../../assets/settings.png";
import { 
    Container, 
    TextInputFilter, 
    ContainerIcon, 
    Icon, 
    ContainerInput,
    ContainerSettings,
    Content,
    Title
} from "./styles";

interface HeaderProps {
    title?: string;
}

export function Header({title} : HeaderProps) {
    const [search, setSearch] = useState<string>("");
  
    return (
        <Container>
            <ContainerIcon>
                <Icon width="18px" height="18px" src={header} />
                <Title>{title}</Title>
            </ContainerIcon>
            <Content>
                <ContainerInput>
                    <AiOutlineSearch size={25} color="#DDE2E4" />
                    <TextInputFilter
                        placeholder="Faça sua busca"
                        color="#DDE2E4"
                        type="text"
                        value={search}
                        onChange={() => {}}
                    />
                </ContainerInput>
                <ContainerSettings>
                <Icon width="18px" height="18px" src={settings} />
                </ContainerSettings>
            </Content>
      </Container>
    );
}
  