import React, { useState, useEffect, useContext } from "react";
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
  InputNameMedico,
  ButtonNewLocal,
  ContainerButtonAtualizar,
  TitleLocal,
  InputSelectLocal,
  Titulo,
  InputTeste,
  ContainerButtonSave,
  TextButtonSave,
  ContainerDisplayFlex,
  ContainerBoxEnd,
  ContainerAlert,
  ImageAlert,
  Text,
  TextAlert,
  AlignRowBox,
  InputData,
  InputJustificativa,
  InputNameTextArea,
  InputSelectTipo,
  InputAtendimentos,
  ButtonAtendimentoRealizados,
} from "./styles";
import "../Components/styles.css";
import { toast } from "react-toastify";

import InputMask from "react-input-mask";

import { firebase } from "../../../service/DB";
import { SideBar } from "../../../components/SideBar";
import { Header } from "../../../components/Header";
import alert from "../../../assets/alert.png";
import { AuthContext } from "../../../contexts/Context";
import { ButtonAction, TitleButton } from "../styles";

interface Item {
  Titulo: string;
}
interface EspecialidadesProps {
  especialidade: string;
}

interface AtuacaoProps {
  atuacao: string;
}
interface EntradaProps {
  Horario: string;
}

interface Doctor {
  nome: string;
  CRM: string;
}

interface EscalistaProps {
  [x: string]: any;
  escalistaName: string;
}
import { useLocation } from "react-router-dom";

export function NewHonda() {

  const navigate = useNavigate();

  var user = firebase.auth().currentUser;

  const [dataUser, setDataUser] = useState("")

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await db.collection("_NEWPLANTAO").doc(userId).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const [atuacao, setAtuacao] = useState("");
  const [dataEscala, setDataEscala] = useState("");
  const [inicioPlantao, setInicioPlantao] = useState("");
  const [terminoPlantao, setTerminoPlantao] = useState("");
  const [AtualizarinicioPlantao, setAtualizarInicioPlantao] = useState("");
  const [AtualizarterminoPlantao, setAtualizarTerminoPlantao] = useState("");
  const [observacao, setObservacao] = useState("");

  const [escalistaList, setEscalistaList] = useState<EscalistaProps[]>([]);
  const [selectEscalista, setSelectEscalista] = useState<EscalistaProps | null>(
    null
  );

  const [statusSelect, setStatusSelect] = useState<any>(null);

  const [list, setList] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [selectAtendimento, setSelectAtendimento] = useState<any>("");

  const [especialidadeList, setEspecialidadeList] = useState<
    EspecialidadesProps[]
  >([]);
  const [selectEspecialidade, setSelectEspecialidade] =
    useState<EspecialidadesProps | null>(null);

  const [selectJustificativa, setSelectJustificativa] = useState(null);
  const [atuacaoList, setAtuacaoList] = useState<AtuacaoProps[]>([]);
  const [selectAtuacao, setSelectAtuacao] = useState<AtuacaoProps | null>(null);

  const [pontoEntrada, setPontoEntrada] = useState<EntradaProps[]>([]);
  const [selectPontoEntrada, setSelectPontoEntrada] = useState<any>(null);

  const [quantidadeAtendimentos, setQuantidadeAtendimentos] = useState("");

  const isSelectDisabled = true;

  const animatedComponents = makeAnimated();

  const db = firebase.firestore();

  const options = list.map((item) => ({
    value: item?.Titulo,
    label: item?.Titulo,
  }));
  const optionsPontoEntrada = pontoEntrada.map((item) => ({
    value: item?.Horario,
    label: item?.Horario,
  }));
  const optionsEspecialidade = especialidadeList.map((item) => ({
    value: item?.especialidade,
    label: item?.especialidade,
  }));
  const optionsEscalista = escalistaList.map((item) => ({
    value: item?.escalistaName,
    label: item?.escalistaName,
  }));
  const optionsAtuacao = atuacaoList.map((item) => ({
    value: item?.atuacao,
    label: item?.atuacao,
  }));
  const optionsStatus = [
    { value: "pendente", label: "Pendente" },
    { value: "inconforme", label: "Inconforme" },
    { value: "conforme", label: "Conforme" },
    { value: "furoMedico", label: "Furo Médico" },
    { value: "furoEscala", label: "Furo Escala" },
    { value: "excluir", label: "Excluir" },
    //{ value: "bloqueado", label: "Bloqueado" },
    //{ value: "anular", label: "Anular" },
  ];
  const optionsJustificativa = [
    { value: "justificativa", label: "Sem Justificativa" },
    { value: "naoEscala", label: "Não estava na escala" },
    { value: "naoUnidade", label: "Não estava na unidade no horário" },
    {
      value: "semUnidade",
      label: "Esta unidade não está no posto de trabalho",
    },
    { value: "semQR", label: "Não Registrou o QRCode" },
  ];
  const optionsAtendimento = [
    { value: "plantao", label: "Plantão" },
    { value: "ambulatorio", label: "Ambulatório" },
  ];
  //lista de escalistas
  useEffect(() => {
    let isActive = true;
    db.collection("_RESPSCALE")
      .get()
      .then((snapshot) => {
        const listData: EscalistaProps[] = [];
        snapshot.forEach((document) => {
          if (document.data().escalistaName) {
            listData.push({ escalistaName: document.data().escalistaName });
          }
        });
        setEscalistaList(listData);
      })
      .catch((error) => {
        console.error("error", error);
      });

    return () => {
      isActive = false;
    };
  }, []);
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
  useEffect(() => {
    let isActive = true;
    db.collection("_SPECIALTIES")
      .get()
      .then((snapshot) => {
        const listData: EspecialidadesProps[] = [];
        snapshot.forEach((document) => {
          if (document.data().especialidade) {
            listData.push({ especialidade: document.data().especialidade });
          }
        });
        setEspecialidadeList(listData);
      })
      .catch((error) => {
        console.error("error", error);
      });

    return () => {
      isActive = false;
    };
  }, []);
  useEffect(() => {
    let isActive = true;
    db.collection("_PERFORMANCE")
      .get()
      .then((snapshot) => {
        const listData: AtuacaoProps[] = [];
        snapshot.forEach((document) => {
          if (document.data().atuacao) {
            listData.push({ atuacao: document.data().atuacao });
          }
        });
        setAtuacaoList(listData);
      })
      .catch((error) => {
        console.error("error", error);
      });

    return () => {
      isActive = false;
    };
  }, []);
  useEffect(() => {
    let isActive = true;
    db.collection("_PONTOS")
      .get()
      .then((snapshot) => {
        const listData: EntradaProps[] = [];
        snapshot.forEach((document) => {
          if (document.data().Horario) {
            listData.push({ Horario: document.data().Horario });
          }
        });
        setPontoEntrada(listData);
      })
      .catch((error) => {
        console.error("error", error);
      });

    return () => {
      isActive = false;
    };
  }, []);
  const handleChange = (selectedOption: any) => {
    setSelectedItem(selectedOption);
  };
  const handleChangePontoEntrada = (selectedOptionPontoEntrada: any) => {
    setSelectPontoEntrada(selectedOptionPontoEntrada);
  };
  const handleChangeEspecialidade = (selectedOptionEspecialidade: any) => {
    setSelectEspecialidade(selectedOptionEspecialidade);
  };
  const handleChangeAtuacao = (selectedOptionAtuacao: any) => {
    setSelectAtuacao(selectedOptionAtuacao);
  };
  const handleChangeAtendimento = (selectedOptionAtuacao: any) => {
    setSelectAtendimento(selectedOptionAtuacao);
  };
  const handleChangeStatus = (selectedOptionAtuacao: any) => {
    setStatusSelect(selectedOptionAtuacao);
  };
  const handleChangeJustificativa = (selectedOptionAtuacao: any) => {
    setSelectJustificativa(selectedOptionAtuacao);
  };
  const handleInputChange = (event: any) => {
    const formattedValue = event.target.value;
    setDataEscala(formattedValue);
  };
  const handleInputInicio = (event: any) => {
    const formattedValue = event.target.value;
    setAtualizarInicioPlantao(formattedValue);
  };
  const handleInputTermino = (event: any) => {
    const formattedValue = event.target.value;
    setAtualizarTerminoPlantao(formattedValue);
  };
  const handleInputChangeTermino = (event: any) => {
    const formattedValue = event.target.value;
    setTerminoPlantao(formattedValue);
  };
  const handleChangeEscalalista = (selectedOptionEscalalista: any) => {
    setSelectEscalista(selectedOptionEscalalista);
  };

  async function enviarDados() {
    const dados = {
      responsavelEscala: selectEscalista?.value,
      atualizarInicioPlantao: AtualizarinicioPlantao,
      atualizarTerminoPlantao: AtualizarterminoPlantao,
      status: statusSelect?.label,
      observacao: observacao,
      justificativa: selectJustificativa
        ? selectJustificativa.label || "Justificativa"
        : "Justificativa",
    };

    try {
      const _collectionRefUser = firebase.firestore().collection("_NEWPLANTAO");
      // Faz o update dos campos no documento com o ID especificado
      await _collectionRefUser.doc(userId).update(dados);
      toast.success("Atualizado com sucesso!");
      console.log("atualizado com sucesso");
      setSelectEscalista(null);
      setAtualizarInicioPlantao("");
      setAtualizarTerminoPlantao("");
      setStatusSelect(null);
      setObservacao("");
      navigate("/honda")
      //window.location.reload();
    } catch (error) {
      toast.error("Erro ao atualizar a Escala");
      console.error(JSON.stringify(error));
    }
  }

  const atualizarAtendimentos = async (novoValor: string) => {
    try {
      const db = firebase.firestore();
      const documentoRef = db.collection("_NEWPLANTAO").doc(userId);
      await documentoRef.update({
        quantidadeAtendimentos: parseInt(novoValor),
      });
      documentoRef.onSnapshot((documentoSnapshot) => {
        if (documentoSnapshot.exists) {
          const data: any = documentoSnapshot.data();
          const novaQuantidade = data.quantidadeAtendimentos;
          setQuantidadeAtendimentos(novaQuantidade);
        }
      });

      toast.success("Alterado com sucesso!");
      setQuantidadeAtendimentos("");
    } catch (error) {
      toast.error("Ops! Algo deu errado...");
    }
  };

  /* useEffect(() => {
    async function buscarHorariosPorCrm() {
      try {
        const collectionRef = firebase.firestore().collection("_PONTOS");
        if (userData?.crm && typeof userData.crm === "string") {
          const snapshot = await collectionRef
            .where("crm", "==", userData.crm)
            .get();
          const horarios: any = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            const horario = data.Horario?.trim()?.toLowerCase();
            if (horario) {
              horarios.push(horario);
            }
          });
          //console.log("Horários:", horarios);
          setPontoEntrada(horarios);
        } else {
          console.warn("userData.crm é inválido ou não está definido.");
        }
      } catch (error) {
        console.error("Ocorreu um erro:", error);
      }
    }

    buscarHorariosPorCrm();
  }, [userData?.crm]); */

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
    <Container>
      <SideBar />
      <ContainerDashboard>
        <Header title={"Ronda"} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Ronda</ActionText>
            <Title>Ronda</Title>
          </ContTitle>
        </BoxTitleDashboard>

        <ContainerRegister>
          <ContainerRegisterNameAndPhone>
            {/* <ContainerInputAndName>
              <TextName>Nome da escala</TextName>
              <Input>
                <InputTeste
                  placeholder={userData?.escala}
                  value={escala}
                  onChange={(e) => setEscala(e.target.value)}
                />
              </Input>
            </ContainerInputAndName> */}
            <ContainerInputAndName>
              <TextName>Inicio previsto escala</TextName>
              <InputData>
                <div className="input-container">
                  <InputMask
                    style={{
                      background: "none",
                      color: "black",
                      border: "none",
                    }}
                    mask="99:99"
                    value={inicioPlantao}
                    placeholder={userData?.inicioPlantao}
                    onChange={handleInputInicio}
                    disabled={true}
                  />
                </div>
              </InputData>
            </ContainerInputAndName>
            <ContainerInputAndName>
              <TextName>Termino previsto escala</TextName>
              <InputData>
                <div className="input-container">
                  <InputMask
                    style={{
                      background: "none",
                      color: "black",
                      border: "none",
                    }}
                    mask="99:99"
                    value={terminoPlantao}
                    placeholder={userData?.terminoPlantao}
                    onChange={handleInputChangeTermino}
                    disabled={true}
                  />
                </div>
              </InputData>
            </ContainerInputAndName>
            <ContainerAlert>
              <ImageAlert src={alert} />
              <Text>
                <TextAlert>{userData?.doctor}</TextAlert>
                <TextAlert>
                  {userData?.crm ? "CRM: " + userData.crm : "CRM: "}
                </TextAlert>
              </Text>
            </ContainerAlert>
          </ContainerRegisterNameAndPhone>

          <ContainerDataAndRegister>
            <ContainerInputAndName>
              <TextName>Data</TextName>
              <InputData>
                <div className="input-container">
                  <InputMask
                    style={{
                      background: "none",
                      color: "black",
                      border: "none",
                    }}
                    mask="99/99/9999"
                    value={dataEscala}
                    placeholder={userData?.dataEscala}
                    onChange={handleInputChange}
                    disabled={true}
                  />
                </div>
              </InputData>
            </ContainerInputAndName>
            <ContainerInputAndName>
              <TextName>Unidade</TextName>
              <InputSelectLocal style={{ marginTop: 12 }}>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder={userData?.unidade}
                  options={options}
                  value={selectedItem}
                  onChange={handleChange}
                  isDisabled={isSelectDisabled}
                />
              </InputSelectLocal>
            </ContainerInputAndName>
            <ContainerInputAndName>
              <TextName>Especialidade</TextName>
              <InputSelectLocal style={{ marginTop: 12 }}>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder={userData?.especialidade}
                  //isMulti
                  options={optionsEspecialidade}
                  onChange={handleChangeEspecialidade}
                  isDisabled={isSelectDisabled}
                />
              </InputSelectLocal>
            </ContainerInputAndName>
          </ContainerDataAndRegister>
        </ContainerRegister>

        <ContainerLocal>
          <AlignRowBox>
            <ContainerTitleAndButton>
              <TextName>Área de atuação</TextName>
              <InputSelectLocal>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder={userData?.atuacao}
                  //isMulti
                  value={atuacao}
                  options={optionsAtuacao}
                  onChange={handleChangeAtuacao}
                  isDisabled={isSelectDisabled}
                />
              </InputSelectLocal>

              {userData?.atendimento === "Ambulatório" ? (
                <ContainerInputAndName style={{ marginTop: 8 }}>
                  <div style={{ marginTop: 20, marginBottom: -2 }}>
                    <TextName>Atendimentos realizados</TextName>
                  </div>
                  <InputSelectLocal style={{ display: "flex" }}>
                    <InputAtendimentos>
                      <InputTeste
                        placeholder={userData?.quantidadeAtendimentos}
                        value={quantidadeAtendimentos}
                        onChange={(e) =>
                          setQuantidadeAtendimentos(e.target.value)
                        }
                      />
                    </InputAtendimentos>
                    <ButtonAction style={{ marginTop: 11 }}>
                      <TitleButton
                        onClick={() =>
                          atualizarAtendimentos(quantidadeAtendimentos)
                        }
                      >
                        Atualizar
                      </TitleButton>
                    </ButtonAction>
                  </InputSelectLocal>
                </ContainerInputAndName>
              ) : null}
              {userData?.atendimento === "Ambulatório" && (
                <ButtonAtendimentoRealizados
                  style={{
                    backgroundColor:
                      userData?.quantidadeAtendimentos >= "40"
                        ? "#00a84d"
                        : "orange",
                  }}
                >
                  {userData?.quantidadeAtendimentos || quantidadeAtendimentos}
                  {" Atendimentos"}
                </ButtonAtendimentoRealizados>
              )}
              <ContainerInputAndName style={{ marginTop: 41 }}>
                  <div style={{ marginTop: -20 }}>
                    <TextName>Tipo de atendimento</TextName>
                  </div>
                  <InputSelectTipo style={{ marginTop: 20 }}>
                    <Selected
                      className="select"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder={userData?.atendimento}
                      //isMulti
                      options={optionsAtendimento}
                      onChange={handleChangeAtendimento}
                      isDisabled={isSelectDisabled}
                    />
                  </InputSelectTipo>
                </ContainerInputAndName>
              <div style={{ display: "flex", width: "200%", marginTop: 60 }}>
                <ContainerInputAndName style={{ marginTop: 40 }}>
                  <div style={{ marginTop: -90 }}>
                    <TextName>Status</TextName>
                  </div>
                  <InputSelectTipo style={{ marginTop: 20 }}>
                    <Selected
                      className="select"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder={
                        userData?.status ? userData?.status : "Pendente"
                      }
                      //isMulti
                      options={optionsStatus}
                      value={statusSelect}
                      onChange={handleChangeStatus}
                    />
                  </InputSelectTipo>

                  {statusSelect?.label === "Inconforme" ? (
                    <ContainerInputAndName style={{ marginTop: -80 }}>
                      <InputSelectTipo>
                        <div style={{ marginBottom: 15 }}>
                          <TextName>Justificativa</TextName>
                        </div>
                        <Selected
                          className="select"
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          placeholder="Selecione"
                          value={selectJustificativa}
                          //isMulti
                          options={optionsJustificativa}
                          onChange={handleChangeJustificativa}
                        />
                      </InputSelectTipo>
                    </ContainerInputAndName>
                  ) : null}
                </ContainerInputAndName>

                {/* <ButtonAction style={{ marginTop: 115, cursor: "pointer" }}>
                  <TitleButton onClick={() => alterarStatus()}>
                    Atualizar
                  </TitleButton>
                </ButtonAction> */}
              </div>
              <ContainerInputAndName style={{ marginTop: 10 }}>
                <TextName>Informe uma Observação</TextName>
                <InputNameTextArea>
                  <InputTeste
                    placeholder="Digite aqui..."
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                  />
                </InputNameTextArea>
              </ContainerInputAndName>
              <div style={{ display: "flex" }}>
                <ContainerInputAndName style={{ marginTop: 40 }}>
                  <div style={{ marginTop: -20 }}>
                    <TextName>Ponto entrada</TextName>
                  </div>
                  <InputSelectTipo style={{ marginTop: 20 }}>
                    <Selected
                      className="select"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder={"Ponto...."}
                      //isMulti
                      options={optionsPontoEntrada}
                      value={selectPontoEntrada}
                      onChange={handleChangePontoEntrada}
                      isDisabled={isSelectDisabled}
                    />
                  </InputSelectTipo>
                </ContainerInputAndName>

                <ContainerInputAndName style={{ marginTop: 40 }}>
                  <div style={{ marginTop: -20 }}>
                    <TextName>Ponto Saida</TextName>
                  </div>
                  <InputSelectTipo style={{ marginTop: 20 }}>
                    <Selected
                      className="select"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder={"Ponto..."}
                      //isMulti
                      options={optionsPontoEntrada}
                      value={selectPontoEntrada}
                      onChange={handleChangePontoEntrada}
                      isDisabled={isSelectDisabled}
                    />
                  </InputSelectTipo>
                </ContainerInputAndName>
              </div>
            </ContainerTitleAndButton>

            <ContainerTitleAndButton style={{ marginLeft: 25 }}>
              {/* <TextName>Unidade</TextName> */}
              <InputSelectLocal
                style={{ display: "flex", marginBottom: 7, marginLeft: -230 }}
              >
                <ContainerInputAndName
                  style={{ marginTop: -1, marginLeft: 70 }}
                >
                  <div style={{ marginTop: -20 }}>
                    <TextName>Responsável pela Ronda</TextName>
                  </div>
                  <InputSelectLocal style={{ marginTop: 20 }}>
                    <Selected
                      className="select"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder={''}
                      //isMulti
                      //options={optionsEscalista}
                      //value={selectEscalista}
                      isDisabled={isSelectDisabled}
                      onChange={handleChangeEscalalista}
                    />
                  </InputSelectLocal>
                </ContainerInputAndName>
                <ContainerInputAndName
                  style={{ marginTop: -1, marginLeft: 10 }}
                >
                  <div style={{ marginTop: -20 }}>
                    <TextName>Responsável pela Escala</TextName>
                  </div>
                  <InputSelectLocal style={{ marginTop: 20 }}>
                    <Selected
                      className="select"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder={"Escolha um escalista"}
                      //isMulti
                      options={optionsEscalista}
                      value={selectEscalista}
                      //isDisabled={isSelectDisabled}
                      onChange={handleChangeEscalalista}
                    />
                  </InputSelectLocal>
                </ContainerInputAndName>
                {/*  */}
              </InputSelectLocal>
              
              <p
                style={{ color: "#029746", fontWeight: 700, marginLeft: -135 }}
              >
                Horário QRCode
              </p>
              <div style={{ display: "flex", marginTop: 30, marginLeft: -130 }}>
                <div style={{ display: "flex" }}>
                  <ContainerInputAndName>
                    <TextName>Inicio QRCode</TextName>
                    <InputData>
                      <div className="input-container">
                        <InputMask
                          style={{
                            background: "none",
                            color: "black",
                            border: "none",
                          }}
                          mask="99:99"
                          placeholder={
                            userData?.atualizarInicioPlantao
                              ? userData?.atualizarInicioPlantao
                              : "00:00"
                          }
                          value={AtualizarinicioPlantao}
                          onChange={handleInputInicio}
                          disabled={
                            userData?.atualizarInicioPlantao
                              ? isSelectDisabled
                              : userData?.atualizarInicioPlantao
                          }
                        />
                      </div>
                    </InputData>
                  </ContainerInputAndName>
                  <ContainerInputAndName>
                    <TextName>Termino QRCode</TextName>
                    <InputData>
                      <div className="input-container">
                        <InputMask
                          style={{
                            background: "none",
                            color: "black",
                            border: "none",
                          }}
                          mask="99:99"
                          placeholder={
                            userData?.atualizarTerminoPlantao
                              ? userData?.atualizarTerminoPlantao
                              : "00:00"
                          }
                          value={AtualizarterminoPlantao}
                          onChange={handleInputTermino}
                          disabled={
                            userData?.atualizarTerminoPlantao
                              ? isSelectDisabled
                              : userData?.atualizarTerminoPlantao
                          }
                        />
                      </div>
                    </InputData>
                  </ContainerInputAndName>
                  <ButtonAction>
                  <TitleButton onClick={() => enviarDados()}>
                  Atualizar
                  </TitleButton>
                </ButtonAction>
                </div>
              </div>
            </ContainerTitleAndButton>
          </AlignRowBox>

          <ContainerDisplayFlex>
            {userData?.atualizarTerminoPlantao &&
            userData?.atualizarInicioPlantao ? 
            <ContainerButtonSave onClick={() => navigate("/honda")}>
            <TextButtonSave>Voltar</TextButtonSave>
          </ContainerButtonSave>
            : (
              <ContainerButtonSave onClick={() => enviarDados()}>
                <TextButtonSave>Salvar Plantão</TextButtonSave>
              </ContainerButtonSave>
            )}
          </ContainerDisplayFlex>
        </ContainerLocal>
      </ContainerDashboard>
    </Container>
  );
}
