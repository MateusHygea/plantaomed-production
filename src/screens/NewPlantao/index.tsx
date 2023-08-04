import React, { useState, useEffect } from "react";
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
  InputQuantidade,
  InputDDD,
  InputPhone,
  ContainerDataAndRegister,
  ContainerLocal,
  ContainerTitleAndButton,
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
  AlignRowFlex,
  BoxTeste,
  InputDataEscala,
} from "./styles";
import "./components/styles.css";
import { toast } from "react-toastify";

import InputMask from "react-input-mask";

import { firebase } from "../../service/DB";
import { SideBar } from "../../components/SideBar";
import { Header } from "../../components/Header";
import alert from "../../assets/alert.png";

interface Item {
  [x: string]: any;
  Titulo: string;
}
interface EspecialidadesProps {
  [x: string]: any;
  especialidade: string;
}
interface EscalaProps {
  [x: string]: any;
  nomeEscala: string;
}
interface AtuacaoProps {
  [x: string]: any;
  atuacao: string;
}
interface EscalistaProps {
  [x: string]: any;
  name: string;
}
interface AtendimentoProps {
  [x: string]: any;
  nome: string;
}
interface Doctor {
  [x: string]: any;
  nome: string;
  CRM: string;
}

export function NewPlantao() {
  const navigate = useNavigate();

  const [inicioPlantao, setInicioPlantao] = useState("");
  const [terminoPlantao, setTerminoPlantao] = useState("");

  const [crm, setCrm] = useState("");
  const [crmResult, setCrmResult] = useState<Doctor | null>(null);

  const [dataEscala, setDataEscala] = useState("");

  const [quantidadeAtendimentos, setQuantidadeAtendimentos] = useState("");

  const [list, setList] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [escalaList, setEscalaList] = useState<EscalaProps[]>([]);
  
  const [escalistaList, setEscalistaList] = useState<EscalistaProps[]>([]);
  const [selectEscalista, setSelectEscalista] = useState<EscalistaProps | null>(
    null
  );
  const [respEscala, setRespEscala] = useState<EscalistaProps[]>([]);
  const [selectRespEscalista, setSelectRespEscalista] = useState<EscalistaProps | null>(
    null
  );
  const [atendimentoList, setAtendimentoList] = useState<AtendimentoProps[]>(
    []
  );
  const [selectAtendimento, setSelectAtendimento] = useState<
    AtendimentoProps | any
  >("");

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
  const optionsEscalista = escalistaList.map((item) => ({
    value: item?.name,
    label: item?.name,
  }));
  const optionsRespEscalista = escalistaList.map((item) => ({
    value: item?.name,
    label: item?.name,
  }));
  const optionsAtendimento = [
    { value: "plantao", label: "Plantão" },
    { value: "ambulatorio", label: "Ambulatório" },
  ];
  //lista de unidades
  useEffect(() => {
    let isActive = true;
    db.collection("_LOCAL")
      .get()
      .then((snapshot) => {
        const listData: Item[] = [];
        snapshot.forEach((document) => {
          listData.push({ Titulo: document.data().Titulo });
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
  //lista de escalas
  useEffect(() => {
    let isActive = true;
    db.collection("_SCALES")
      .get()
      .then((snapshot) => {
        const listData: EscalaProps[] = [];
        snapshot.forEach((document) => {
          if (document.data()) {
            listData.push({ ...document.data() });
          }
        });
        setEscalaList(listData);
      })
      .catch((error) => {
        console.error("error", error);
      });

    return () => {
      isActive = false;
    };
  }, []);
  // lista de atuação
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
  //lista de escalistas
  useEffect(() => {
    let isActive = true;
    db.collection("_USERS")
      .get()
      .then((snapshot) => {
        const listData: EscalistaProps[] = [];
        snapshot.forEach((document) => {
          if (document.data().name) {
            listData.push({ name: document.data().name });
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
  //lista atendimento
  useEffect(() => {
    let isActive = true;
    db.collection("_SERVICETYPE")
      .get()
      .then((snapshot) => {
        const listData: AtendimentoProps[] = [];
        snapshot.forEach((document) => {
          if (document.data().nome) {
            listData.push({
              nome: document.data().nome,
            });
          }
        });
        setAtendimentoList(listData);
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
  const handleChangeEscalalista = (selectedOptionEscalalista: any) => {
    setSelectEscalista(selectedOptionEscalalista);
  };
  const handleChangeRespEscalalista = (selectedOptionEscalalista: any) => {
    setSelectRespEscalista(selectedOptionEscalalista);
  };
  const handleChangeAtendimento = (selectedOptionAtendimento: any) => {
    setSelectAtendimento(selectedOptionAtendimento);
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

  //console.log('atendimento', selectAtendimento.label)

  const _collectionRefUser = firebase.firestore().collection("_NEWPLANTAO");

  async function enviarDados() {
    if (
      selectAtuacao === null ||
      selectEspecialidade == null ||
      selectEscalista === null ||
      selectAtendimento === null ||
      inicioPlantao === "" ||
      terminoPlantao === "" ||
      selectedItem === null || crm === ""
    ) {
      toast.warning("Preenche os dados!");
      return;
    }

    const dados = {
      Titulo: selectedItem,
      areaAtuacao: selectAtuacao,
      especialidade: selectEspecialidade,
      escalista: selectEscalista,
      responsavelEscala: selectRespEscalista,
      atendimento: selectAtendimento,
      inicioPlantao: inicioPlantao,
      terminoPlantao: terminoPlantao,
    };
    const teste = {
      unidade: dados.Titulo.value,
      atuacao: dados.areaAtuacao.value,
      especialidade: dados.especialidade.value,
      escalista: dados.escalista.value,
      responsavelEscala: dados.responsavelEscala.value,
      atendimento: dados.atendimento.label,
      inicioPlantao: inicioPlantao,
      terminoPlantao: terminoPlantao,
      dataEscala: dataEscala,
      crm: crm,
      quantidadeAtendimentos: quantidadeAtendimentos,
      status: 'Ronda Pendente',
      doctor: crmResult?.nome
    };
    try {
      const docRef = await _collectionRefUser.add(teste);
      toast.success("Escala cadastrada com sucesso!");
      console.log("cadastrado com sucesso");
      setCrm("")
      setInicioPlantao("")
      setTerminoPlantao("")
      setDataEscala("")
      setSelectAtuacao(null)
      setSelectedItem(null)
      setSelectEspecialidade(null)
      setSelectEscalista(null)
      setSelectAtendimento("")
      //navigate("/newplantao")
    } catch (error) {
      toast.error("Erro ao cadastrar uma nova Escala");
      console.error("Erro ao cadastrar um local");
    }
  }

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

  return (
    <Container>
      <SideBar />

      <ContainerDashboard>
        <Header title={"Novo Plantão"} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Novo Plantão</ActionText>
            <Title>Novo Plantão</Title>
          </ContTitle>
        </BoxTitleDashboard>

        <ContainerRegister>
          <ContainerRegisterNameAndPhone>
            <ContainerInputAndName>
              <TextName>CRM</TextName>
              <Input>
                <InputTeste
                  placeholder="Buscar médico"
                  value={crm}
                  onChange={(e) => setCrm(e.target.value)}
                />
              </Input>
              <ContainerButtonAtualizar
                onClick={() => handleSearch()}
                style={{ marginTop: 20 }}
              >
                <TextButtonSave>Atualizar</TextButtonSave>
              </ContainerButtonAtualizar>
            </ContainerInputAndName>

            <ContainerAlert>
              <ImageAlert src={alert} />
              <Text>
                <TextAlert>
                  {crmResult?.nome ? crmResult?.nome : "Nome: "}
                </TextAlert>
                <TextAlert>
                  {crmResult?.CRM ? "CRM: " + crmResult?.CRM : "CRM: "}
                </TextAlert>
              </Text>
            </ContainerAlert>
          </ContainerRegisterNameAndPhone>

          <ContainerDataAndRegister>
            {/* <ContainerInputAndName>
              <TextName>Unidade</TextName>
              <InputSelectLocal style={{ marginTop: 12 }}>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder="Título da escala"
                  //isMulti
                  options={optionsEscala}
                  onChange={handleChangeEscala}
                />
              </InputSelectLocal>
            </ContainerInputAndName> */}
            <ContainerInputAndName>
              <TextName>Inicío do Plantão</TextName>
              <InputDDD>
                {/* <InputTeste
                  //maxLength={2}
                  placeholder="00:00"
                  value={inicioPlantao}
                  onChange={(e) => setInicioPlantao(e.target.value)}
                /> */}
                <div className="input-container">
                  <InputMask
                    style={{
                      background: "none",
                      color: "black",
                      border: "none",
                    }}
                    value={inicioPlantao}
                    mask="99:99"
                    placeholder="00:00"
                    onChange={handleInputInicio}
                  />
                </div>
              </InputDDD>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>Termino do Plantão</TextName>
              <InputDDD>
                {/* <InputTeste
                  //maxLength={2}
                  placeholder="00:00"
                  value={terminoPlantao}
                  onChange={(e) => setTerminoPlantao(e.target.value)}
                /> */}
                <div className="input-container">
                  <InputMask
                    style={{
                      background: "none",
                      color: "black",
                      border: "none",
                    }}
                    value={terminoPlantao}
                    mask="99:99"
                    placeholder="00:00"
                    onChange={handleInputChangeTermino}
                  />
                </div>
              </InputDDD>
            </ContainerInputAndName>
          </ContainerDataAndRegister>
        </ContainerRegister>

        <ContainerLocal>
          <AlignRowBox>
            <ContainerTitleAndButton>
              <TextName>Data da escala</TextName>
              <InputSelectLocal style={{ marginBottom: 20 }}>
                <InputDataEscala>
                  <div className="input-container">
                    <InputMask
                      style={{
                        background: "none",
                        color: "black",
                        border: "none",
                      }}
                      value={dataEscala}
                      mask="99/99/9999"
                      placeholder="00/00/0000"
                      onChange={handleInputChange}
                    />
                  </div>
                </InputDataEscala>
              </InputSelectLocal>
              <TextName>Área de Atuação</TextName>
              <InputSelectLocal style={{ marginBottom: 20 }}>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder="Seleciona o tipo"
                  //isMulti
                  options={optionsAtuacao}
                  value={selectAtuacao}
                  onChange={handleChangeAtuacao}
                />
              </InputSelectLocal>
              <TextName>Especialidade</TextName>
              <InputSelectLocal>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder="Seleciona a especialidade"
                  options={optionsEspecialidade}
                  value={selectEspecialidade}
                  onChange={handleChangeEspecialidade}
                />
              </InputSelectLocal>
              
            </ContainerTitleAndButton>


            <ContainerTitleAndButton style={{ marginLeft: 25 }}>
              
              <AlignRowFlex>
                <TextName>Unidade</TextName>
                <InputSelectLocal style={{ marginBottom: 20 }}>
                  <Selected
                    className="select"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    placeholder="Seleciona a unidade"
                    //isMulti
                    options={options}
                    value={selectedItem}
                    onChange={handleChange}
                  />
                </InputSelectLocal>
                
                <TextName>Responsável pela Ronda</TextName>
                <InputSelectLocal style={{ marginBottom: 20 }}>
                  <Selected
                    className="select"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    placeholder="Seleciona o escalista"
                    //isMulti
                    options={optionsEscalista}
                    value={selectEscalista}
                    onChange={handleChangeEscalalista}
                  />
                </InputSelectLocal>

                <TextName>Responsável pela Escala</TextName>
                <InputSelectLocal style={{ marginBottom: 20 }}>
                  <Selected
                    className="select"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    placeholder="Seleciona o escalista"
                    //isMulti
                    options={optionsRespEscalista}
                    value={selectRespEscalista}
                    onChange={handleChangeRespEscalalista}
                  />
                </InputSelectLocal>
              </AlignRowFlex>
              
              {/* Plantão e ambulatório */}
              <TextName>Tipo de atendimento</TextName>
              <InputSelectLocal style={{ marginBottom: 20 }}>
                <Selected
                  className="select"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder="Tipo de atendimento"
                  //isMulti
                  options={optionsAtendimento}
                  value={selectAtendimento}
                  onChange={handleChangeAtendimento}
                />
              </InputSelectLocal>
              <>
                {selectAtendimento?.label === "Ambulatório" ? (
                  <>
                    <TextName>Quantidade de atendimentos agendados</TextName>
                    <InputSelectLocal style={{ marginBottom: 20 }}>
                      <InputQuantidade>
                        <InputTeste
                          placeholder="Somente números"
                          value={quantidadeAtendimentos}
                          onChange={(e) =>
                            setQuantidadeAtendimentos(e.target.value)
                          }
                        />
                      </InputQuantidade>
                    </InputSelectLocal>
                  </>
                ) : null}
              </>
              {/*  */}
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
