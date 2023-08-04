import React, { useContext, useState, useEffect } from "react";
import more from "../../assets/more.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Context";
import { 
  Container, 
  Icon, 
  ContainerInfo, 
  Name, Email, 
  ContainerActions, 
  IconMore,
  IconPhoto,
  Dropdown,
  DropdownButton,
  Divisor 
} from "./style";

import {firebase} from '../../service/DB'

export function Footer() {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false);
  const { logout, user } = useContext(AuthContext);

  const [dataUser, setDataUser] = useState("")

  function userLogout() {
    logout()
    navigate('/')
  }

  /* useEffect(() => {
    const usersCollection = firebase.firestore().collection("_USERS");

    const userEmailToCheck = user?.email;
  
    usersCollection.where("email", "==", userEmailToCheck).get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userName = doc.data().name;
          setDataUser(userName);
        });
      } else {
        console.log("nao encontrado...");
      }
    })
    .catch((error) => {
      console.log("erro", error);
    });
  }, []) */
  
  return (
    <>
    <Divisor />
    <Container>
      { 
       !user?.providerData[0]?.photoURL ? 
          <Icon/> 
        : 
          <IconPhoto>
            <img src={user?.providerData[0]?.photoURL} width='40' />
          </IconPhoto>
      }
      <ContainerInfo>
        <Name>{''}</Name>
        <Email>{!user?.email ? "" : user?.email}</Email>
      </ContainerInfo>
      <ContainerActions onClick={() => setOpen(!open)}><IconMore src={more} /></ContainerActions>
      { open &&
        <Dropdown>
          <DropdownButton><a onClick={() => userLogout()}>Sair</a></DropdownButton>
        </Dropdown>
      }
    </Container>
    </>
  );
}