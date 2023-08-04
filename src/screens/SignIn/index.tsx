import React, {useState, useContext, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import { 
  Container,
  BoxCenter,
  BoxSignIn,
  Title,
  BoxForm,
  TextEmail,
  BoxInput,
  BoxEmail,
  BoxPassword,
  ButtonAccess,
  TextBtn,
  TextAlert,
  ImageBackground,
  InputTeste
} from "./styles";
import { toast } from "react-toastify";

import shape from '../../assets/shapes.png'
import { AuthContext } from "../../contexts/Context";

export function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(AuthContext);

  const navigate = useNavigate()

  async function signIn(){
    try {
      if(email === '' || password == ''){
        toast.warning('Preenche os dados!')
        return
      }
      await login({email,password})
      const userLogin = localStorage.getItem('user')
      //console.log("userLogin", userLogin)
      if(userLogin) {
        setEmail("")
        setPassword("")
        navigate('/Dashboard')
      }
    } catch (error) {
      console.log(error, "ERRO NO LOGIN")
    }
    
  }
  
  return (
    <Container>
      <BoxCenter>
        <BoxSignIn>

          <BoxForm>
            <Title>Área restrita</Title>
            <BoxEmail>
              <TextEmail>Seu e-mail</TextEmail>
              <BoxInput>
              <InputTeste
                  placeholder="Digite seu e-mail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </BoxInput>
            </BoxEmail>

            <BoxPassword>
              <TextEmail>Sua senha</TextEmail>
              <BoxInput>
              <InputTeste
                  placeholder="Digite sua senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </BoxInput>
            </BoxPassword>

            <ButtonAccess onClick={() => signIn()}>
                <TextBtn>Acessar</TextBtn>
            </ButtonAccess>

            <TextAlert>Esqueceu a senha?</TextAlert>
            <TextAlert>Cadastra-se</TextAlert>

          </BoxForm>

        </BoxSignIn>
        <ImageBackground src={shape}/>
      </BoxCenter>
    </Container>
  );
}
