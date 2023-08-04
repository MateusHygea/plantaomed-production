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
  InputNameTextArea
} from "./styles";
import "../Components/styles.css";
import { toast } from "react-toastify";

import InputMask from "react-input-mask";

import { firebase } from "../../../service/DB";
import { SideBar } from "../../../components/SideBar";
import { Header } from "../../../components/Header";
import alert from "../../../assets/alert.png";
import { AuthContext } from "../../../contexts/Context";

interface Item {
  Titulo: string;
}
interface EspecialidadesProps {
  especialidade: string;
}

interface AtuacaoProps {
  atuacao: string;
}

interface Doctor {
  nome: string;
  CRM: string;
}

import { useLocation } from "react-router-dom";

export function NewJustification() {
  const [hours, setHours] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

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
  }, [userId]);

  const [crmResult, setCrmResult] = useState<Doctor | null>(null);

  const [atendimento, setAtendimento] = useState("");
  const [atuacao, setAtuacao] = useState("");
  const [dataEscala, setDataEscala] = useState("");
  const [escala, setEscala] = useState("");
  const [escalista, setEscalista] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [inicioPlantao, setInicioPlantao] = useState("");
  const [terminoPlantao, setTerminoPlantao] = useState("");
  const [unidade, setUnidade] = useState("");
  const [crm, setCrm] = useState("");
  const [observacao, setObservacao] = useState("")
  const [solicitante, setSolicitante] = useState("")

  const [list, setList] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [especialidadeList, setEspecialidadeList] = useState<
    EspecialidadesProps[]
  >([]);
  const [selectEspecialidade, setSelectEspecialidade] =
    useState<EspecialidadesProps | null>(null);

  const [atuacaoList, setAtuacaoList] = useState<AtuacaoProps[]>([]);
  const [selectAtuacao, setSelectAtuacao] = useState<AtuacaoProps | null>(null);

  const animatedComponents = makeAnimated();

  const db = firebase.firestore();

  const options = list.map((item) => ({
    value: item?.Titulo,
    label: item?.Titulo,
  }));
  const optionsEspecialidade = especialidadeList.map((item) => ({
    value: item?.especialidade,
    label: item?.especialidade,
  }));
  const optionsAtuacao = atuacaoList.map((item) => ({
    value: item?.atuacao,
    label: item?.atuacao,
  }));

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

  const handleChange = (selectedOption: any) => {
    setSelectedItem(selectedOption);
  };
  const handleChangeEspecialidade = (selectedOptionEspecialidade: any) => {
    setSelectEspecialidade(selectedOptionEspecialidade);
  };
  const handleChangeAtuacao = (selectedOptionAtuacao: any) => {
    setSelectAtuacao(selectedOptionAtuacao);
  };
  const searchCrm = () => {
    const db = firebase.firestore();
    const doctorsCollection = db.collection("_DOCTORS");

    doctorsCollection
      .where("CRM", "==", crm)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          console.log("CRM encontrado!");
          querySnapshot.forEach((doc) => {
            const doctorData = doc.data() as Doctor;
            setCrmResult(doctorData);
          });
        } else {
          toast.error("CRM não encontrado!");
          console.log("CRM não encontrado!");
        }
      })
      .catch((error) => {
        toast.error("Ocorreu um erro na busca!");
        console.error("Ocorreu um erro na busca: ", error);
      });
  };
  const handleSearch = () => {
    searchCrm();
  };

  const handleInputChange = (event: any) => {
    const formattedValue = event.target.value;
    setDataEscala(formattedValue);
  };
  const handleInputInicio = (event: any) => {
    const formattedValue = event.target.value;
    setInicioPlantao(formattedValue);
  };
  const handleInputChangeTermino = (event: any) => {
    const formattedValue = event.target.value;
    setTerminoPlantao(formattedValue);
  };

  async function enviarDados() {
    if (
      escala === "" ||
      dataEscala === "" ||
      inicioPlantao == "" ||
      terminoPlantao === "" ||
      selectedItem === null
    ) {
      toast.warning("Preenche os dados!");
      return;
    }

    const dados = {
      atendimento: atendimento,
      escalista: escalista,
      escala: escala,
      dataEscala: dataEscala,
      inicioPlantao: inicioPlantao,
      terminoPlantao: terminoPlantao,
      observacao: observacao,
      solicitante: solicitante
    };
    try {
      const _collectionRefUser = firebase.firestore().collection("_NEWPLANTAO")
      const docRef = await _collectionRefUser.add(dados)
      toast.success("Alterado com sucesso!");
      console.log("cadastrado com sucesso");
      //Limpando os campos preenchidos
      /* setNomeEscala("");
      setDataEscala("");
      setInicioPlantao("");
      setTerminoPlantao(""); */
    } catch (error) {
      toast.error("Erro ao cadastrar uma nova Escala");
      console.error("Erro ao cadastrar um local");
    }
  }

  return (
    <Container>
      <SideBar />
      <ContainerDashboard>
        <Header title={"Justificativas"} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Justificativas</ActionText>
            <Title>Justificativas</Title>
          </ContTitle>
        </BoxTitleDashboard>

        <ContainerRegister>
          <ContainerRegisterNameAndPhone>
            <ContainerInputAndName>
              <TextName>Nome da escala</TextName>
              <Input>
                <InputTeste
                  placeholder={userData?.escala}
                  value={escala}
                  onChange={(e) => setEscala(e.target.value)}
                />
              </Input>
            </ContainerInputAndName>
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
                    placeholder={userData?.dataEscala}
                    onChange={handleInputChange}
                  />
                </div>
              </InputData>
            </ContainerInputAndName>
            <ContainerInputAndName>
              <TextName>Previsto Inicial</TextName>
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
                  />
                </div>
              </InputData>
            </ContainerInputAndName>
            <ContainerInputAndName>
              <TextName>Previsto Final</TextName>
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
                  />
                </div>
              </InputData>
            </ContainerInputAndName>
          </ContainerRegisterNameAndPhone>

          <ContainerDataAndRegister>
            <ContainerInputAndName>
              <TextName>Unidade</TextName>
              <InputSelectLocal style={{ marginTop: 12 }}>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder={userData?.unidade}
                  //isMulti
                  options={options}
                  value={unidade}
                  onChange={handleChange}
                />
              </InputSelectLocal>
            </ContainerInputAndName>
            <ContainerInputAndName>
              <TextName>Nome do médico</TextName>
              <InputNameMedico>
                <InputTeste
                  placeholder={userData?.escalista}
                  value={escalista}
                  onChange={(e) => setEscalista(e.target.value)}
                />
              </InputNameMedico>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>CRM</TextName>
              <InputDDD>
                <InputTeste
                  placeholder={userData?.crm}
                  value={crm}
                  onChange={(e) => setCrm(e.target.value)}
                />
              </InputDDD>
            </ContainerInputAndName>
          </ContainerDataAndRegister>
        </ContainerRegister>

        <ContainerLocal>
          <AlignRowBox>
            <ContainerTitleAndButton>
              <TextName>Especialidade</TextName>
              <InputSelectLocal style={{ marginBottom: 25 }}>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder={userData?.especialidade}
                  //isMulti
                  value={especialidade}
                  options={optionsEspecialidade}
                  onChange={handleChange}
                />
              </InputSelectLocal>
              <TextName>Motivo pelo qual nao efetuou o registro.</TextName>
              <InputSelectLocal>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder="Seleciona o motivo"
                  //isMulti
                  options={optionsAtuacao}
                  onChange={handleChangeAtuacao}
                />
              </InputSelectLocal>

              <ContainerInputAndName style={{marginTop: 20}}>
              <TextName>Solicitante</TextName>
              <InputNameMedico>
                <InputTeste
                  placeholder="Usuário"
                  value={solicitante}
                  onChange={(e) => setSolicitante(e.target.value)}
                />
              </InputNameMedico>
            </ContainerInputAndName>
            <ContainerInputAndName style={{marginTop: 20}}>
              <TextName>Informe uma Observação</TextName>
              <InputNameTextArea>
                <InputTeste
                  placeholder="Digite aqui..."
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </InputNameTextArea>
            </ContainerInputAndName>
            </ContainerTitleAndButton>

            <ContainerTitleAndButton style={{ marginLeft: 25 }}>
              {/* <TextName>Unidade</TextName> */}
              <TextName>Justificativa</TextName>
              <InputSelectLocal style={{ marginBottom: 20 }}>
                <InputJustificativa>
                  <InputTeste
                    placeholder="Não registrou QRcode"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </InputJustificativa>
              </InputSelectLocal>
              <TextName>A justificativa refere-se a:</TextName>
              <InputSelectLocal style={{ marginBottom: 20 }}>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder="Selecione a justificativa"
                  //isMulti
                  options={options}
                  onChange={handleChange}
                />
              </InputSelectLocal>
              {/* Plantão e ambulatório */}
              {/* <TextName>Tipo de atendimento</TextName>
              <InputSelectLocal>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder="Tipo de atendimento"
                  //isMulti
                  options={options}
                  onChange={handleChange}
                />
              </InputSelectLocal> */}
            </ContainerTitleAndButton>
          </AlignRowBox>

          <ContainerDisplayFlex>
            <ContainerButtonSave onClick={() => enviarDados()}>
              <TextButtonSave>Salvar Plantão</TextButtonSave>
            </ContainerButtonSave>
          </ContainerDisplayFlex>
        </ContainerLocal>
      </ContainerDashboard>
    </Container>
  );
}
