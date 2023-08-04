import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Selected from "react-select";
import makeAnimated from "react-select/animated";

import {
  Container,
  ContainerDashboard,
  BoxTitleDashboard,
  ActionText,
  Title,
  FlexDiv,
  ContTitle,
  ButtonAction,
  ButtonClosedModal,
  TitleButton,
  ContainerFilterAlignRow,
  ContainerHeaderAlign,
  ContainerListName,
  ContainerNames,
  Names,
  BoxSearchFilter,
  Filter,
  TextInputFilter,
  ContainerListNamesOf,
  BoxList,
  TitleName,
  BoxFlex,
  Photo,
  BoxNames,
  ContainerRegister,
  ContainerRegisterNameAndPhone,
  ContainerInputAndName,
  TextName,
  Input,
  InputDDD,
  InputPhone,
  ContainerDataAndRegister,
  InputTeste,
  DisplayButton,
  InputSelectLocal,
  BoxTitle,
} from "./styles";
import "./Components/styles.css";

import { FaRegEdit } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import { SideBar } from "../../components/SideBar";
import { firebase } from "../../service/DB";
import { toast } from "react-toastify";
import { Titulo } from "../Profile/NewProfile/styles";
import { Header } from "../../components/Header";
import { set, setHours } from "date-fns";
import { InputData, InputNameMedico } from "./NewJustification/styles";

import InputMask from "react-input-mask";

interface DoctorProps {
  toLowerCase: Function;
  startsWith: Function;
  id: string;
  atendimento: string;
  atuacao: string;
  Ponto: any;
  dataEscala: string;
  especialidade: string;
  escalista: string;
  escala: string;
  inicioPlantao: string;
  terminoPlantao: string;
  unidade: string;
  crm: string;
}
interface DoctorUpdate extends DoctorProps {
  id: string;
}
interface Item {
  [x: string]: any;
  Titulo: string;
}
interface EscalaProps {
  [x: string]: any;
  nomeEscala: string;
}
export function Justification() {
  const navigate = useNavigate();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProps | null>(
    null
  );

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

  const [doctors, setDoctors] = useState<DoctorProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState<Item[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [escalaList, setEscalaList] = useState<EscalaProps[]>([]);

  const [selectEscala, setSelectEscala] = useState<EscalaProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const [filterEscalas, setFilterEscalas] = useState<any[]>([]);
  const db = firebase.firestore();

  const animatedComponents = makeAnimated();

  const handleConsultarDocumentos = async () => {
    try {
      const crmSelecionado = crm;
      const dataEscalaSelecionada = dataEscala;
      const unidadeSelecionada = selectedItem?.value;

      let query: any = db.collection("_NEWPLANTAO");

      if (crmSelecionado && crmSelecionado !== "false") {
        query = query.where("crm", "==", crmSelecionado);
      }
  
      if (dataEscalaSelecionada && dataEscalaSelecionada !== "false") {
        query = query.where("dataEscala", "==", dataEscalaSelecionada);
      }
  
      if (unidadeSelecionada && unidadeSelecionada !== "false") {
        query = query.where("unidade", "==", unidadeSelecionada);
      }
  
      const querySnapshot = await query.get();
      const escalasEncontradas: any = [];
      querySnapshot.forEach((doc: { data: () => any; id: string; }) => {
        const data = doc.data();
        if (
          (!crmSelecionado || data.crm === crmSelecionado) &&
          (!dataEscalaSelecionada || data.dataEscala === dataEscalaSelecionada) &&
          (!unidadeSelecionada || data.unidade === unidadeSelecionada)
        ) {
          const escala = {
            id: doc.id,
            ...data,
          };
          escalasEncontradas.push(escala);
        }
      });
  
      setFilterEscalas(escalasEncontradas);
    } catch (error) {
      console.error("Erro ao obter documentos:", error);
    }
  };

  const options = list.map((item) => ({
    value: item?.Titulo,
    label: item?.Titulo,
  }));
  const optionsEscala = escalaList.map((item) => ({
    value: item?.nomeEscala,
    label: item?.nomeEscala,
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
    db.collection("_SCALES")
      .get()
      .then((snapshot) => {
        const listData: EscalaProps[] = [];
        snapshot.forEach((document) => {
          listData.push({ nomeEscala: document.data().nomeEscala });
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
  const getDoctors = useCallback(() => {
    const itemsRef = db.collection("_NEWPLANTAO");
    const unsubscribe = itemsRef
      .orderBy("escala", "desc")
      .onSnapshot((snapshot) => {
        const data: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(data);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = getDoctors();

    return () => {
      unsubscribe();
    };
  }, []);

  const threadsMemo = useMemo(() => doctors, [doctors]);

  useEffect(() => {
    const unsubscribe = getDoctors();
    return unsubscribe;
  }, [getDoctors]);
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    setCurrentPage(0);
  }
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  function openModal(item: DoctorProps) {
    setSelectedDoctor(item);
    setAtendimento(item.atendimento);
    setAtuacao(item.atuacao);
    setDataEscala(item.dataEscala);
    setEscala(item.escala);
    setEspecialidade(item.especialidade);
    setUnidade(item.unidade);
    setSelectedItem(item.Ponto);
    setCrm(item.crm);
    setModalIsOpen(true);
    console.log(item);
  }
  async function updateDoctorData(item: DoctorProps) {
    /* if (
      name === selectedDoctor! &&
      crm === selectedDoctor!.CRM &&
      ddd === selectedDoctor!.unidade &&
      phone === selectedDoctor!.atendimento &&
      selectedItem === selectedDoctor!.Plantão
    ) {
      toast.warn("Você não alterou nenhum dos dados!");
      return;
    } */
    const dados = {
      atendiemtn: item?.atendimento,
      crm: item?.crm,
      escala: item?.escala,
      atuacao: item?.atuacao,
      dataEscala: item.dataEscala,
      Ponto: item.Ponto,
      escalista: item.escalista,
      inicioPlantao: item.inicioPlantao,
      terminoPlantao: item.terminoPlantao,
      unidade: item.unidade,
    };
    try {
      await firebase
        .firestore()
        .collection("_NEWPLANTAO")
        .doc(doctors.id)
        .update(dados)
        .then(() => {
          toast.success("Dados alterados com sucesso!");
          setModalIsOpen(false);
        });
    } catch (error) {
      console.log("ERRO AQUI ->", error);
      toast.error("Ops! algo deu errado...");
    }
  }
  const handleChange = (selectedOption: any) => {
    setSelectedItem(selectedOption);
  };
  const handleChangeEscala = (selectedOption: any) => {
    setSelectEscala(selectedOption);
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

        <ContainerHeaderAlign>
          <ContainerInputAndName style={{ marginRight: 30 }}>
            <TextName>Data</TextName>
            <InputData>
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
            </InputData>
          </ContainerInputAndName>
          <ContainerFilterAlignRow>
            <TextName>CRM</TextName>
            <InputDDD>
              <InputTeste
                placeholder="102030"
                value={crm}
                onChange={(e) => setCrm(e.target.value)}
              />
            </InputDDD>
          </ContainerFilterAlignRow>

          <ContainerFilterAlignRow>
            <TextName>Unidade</TextName>
            <InputSelectLocal>
              <Selected
                className="select"
                closeMenuOnSelect={false}
                components={animatedComponents}
                placeholder="Seleciona a unidade"
                //isMulti
                options={options}
                onChange={handleChange}
              />
            </InputSelectLocal>
          </ContainerFilterAlignRow>
          {/*  <ContainerFilterAlignRow>
            <TextName>Data</TextName>
            <InputDDD>
              <InputTeste
                placeholder="10/08/ 2024"
                //value={hours}
                //onChange={(e) => setHours(e.target.value)}
              />
            </InputDDD>
          </ContainerFilterAlignRow> */}
          <ContainerFilterAlignRow>
            <ButtonAction>
              <TitleButton onClick={() => handleConsultarDocumentos()}>
                Atualizar
              </TitleButton>
            </ButtonAction>
            {/* <ButtonAction>
              <TitleButton onClick={() => navigate("/newjustification")}>
                Atualizar
              </TitleButton>
            </ButtonAction> */}
          </ContainerFilterAlignRow>
        </ContainerHeaderAlign>

        <ContainerListName>
          <ContainerNames>
            <BoxNames>
              <BoxTitle>Data</BoxTitle>
              <BoxTitle>CRM</BoxTitle>
              <BoxTitle>Unidade</BoxTitle>
              {/* <BoxTitle>Previsto Final</BoxTitle> */}
            </BoxNames>
          </ContainerNames>
          {filterEscalas.length === 0 && <Names>Nada registrado...</Names>}
          {filterEscalas.map((item, index) => (
            <ContainerListNamesOf key={index}>
              <BoxList>
                <BoxFlex>
                  <TitleName>{item?.escalista || "Ponto APP"}</TitleName>
                </BoxFlex>
              </BoxList>
              <BoxList>
                <BoxFlex>
                  <TitleName>{item?.Ponto || "Ponto APP"}</TitleName>
                </BoxFlex>
              </BoxList>
              <BoxList>
                <BoxFlex>
                  <TitleName>
                    {item?.inicioPlantao || "Ponto APP"}
                  </TitleName>
                </BoxFlex>
              </BoxList>
              <BoxList>
                <BoxFlex>
                  <TitleName>
                    {item?.terminoPlantao || "Não encontrado"}
                    <Link to={`/newjustification?userId=${item.id}`}>
                      <TitleName>{"acessar"}</TitleName>
                    </Link>
                  </TitleName>
                </BoxFlex>
                <FlexDiv></FlexDiv>
              </BoxList>
            </ContainerListNamesOf>
          ))}

          <div style={{ cursor: "pointer" }}>
            <ReactPaginate
              pageCount={Math.ceil(threadsMemo.length / itemsPerPage)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              previousLabel={<MdKeyboardArrowLeft />}
              nextLabel={<MdKeyboardArrowRight />}
              containerClassName="style-paginate"
            />
          </div>
        </ContainerListName>
      </ContainerDashboard>
      {/* Modal Detail */}
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <ContainerRegister>
          <ContainerRegister>
            <ContainerRegisterNameAndPhone>
              <ContainerInputAndName>
                <TextName>Nome da escala</TextName>
                <Input>
                  <InputTeste
                    placeholder="Título da escala"
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
                      value={dataEscala}
                      mask="99/99/9999"
                      placeholder="DD/MM/AAAA"
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
                      value={inicioPlantao}
                      mask="99:99"
                      placeholder="00:00"
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
                      value={terminoPlantao}
                      mask="99:99"
                      placeholder="00:00"
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
                    placeholder="Título da escala"
                    //isMulti
                    options={options}
                    onChange={handleChange}
                  />
                </InputSelectLocal>
              </ContainerInputAndName>
              <ContainerInputAndName>
                <TextName>Nome do médico</TextName>
                <InputNameMedico>
                  <InputTeste
                    placeholder="Alzonia Moreira"
                    value={escalista}
                    onChange={(e) => setEscalista(e.target.value)}
                  />
                </InputNameMedico>
              </ContainerInputAndName>

              <ContainerInputAndName>
                <TextName>CRM</TextName>
                <InputDDD>
                  <InputTeste
                    placeholder="102030"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                  />
                </InputDDD>
              </ContainerInputAndName>
            </ContainerDataAndRegister>
          </ContainerRegister>
          {/* <ContainerRegisterNameAndPhone>
            <ContainerInputAndName>
              <TextName>Nome completo</TextName>
              <Input>
                <InputTeste
                  placeholder="Digite seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Input>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>CRM</TextName>
              <Input>
                <InputTeste
                  placeholder="Digite seu CRM"
                  value={crm}
                  onChange={(e) => setCrm(e.target.value)}
                />
              </Input>
            </ContainerInputAndName>
          </ContainerRegisterNameAndPhone> */}

          {/* <ContainerDataAndRegister>
            <ContainerInputAndName>
              <TextName>DDD</TextName>
              <InputDDD>
                <InputTeste
                  maxLength={2}
                  placeholder="Digite o DDD"
                  value={ddd}
                  onChange={(e) => setDdd(e.target.value)}
                />
              </InputDDD>
            </ContainerInputAndName>

            <ContainerInputAndName>
              <TextName>Telefone</TextName>
              <InputPhone>
                <InputTeste
                  maxLength={9}
                  placeholder="Digite seu telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputPhone>
            </ContainerInputAndName>

            <InputSelectLocal>
              <Selected
                className="select"
                closeMenuOnSelect={false}
                components={animatedComponents}
                placeholder="Selecione o local"
                isMulti
                options={options}
                onChange={handleChange}
              />
            </InputSelectLocal>
          </ContainerDataAndRegister> */}
          <DisplayButton>
            <ButtonAction
              onClick={() =>
                updateDoctorData({
                  id: selectedDoctor?.id,
                  atendimento: atendimento,
                  atuacao: atuacao,
                  escala: escala,
                  escalista: escalista,
                  Ponto: selectedItem,
                  dataEscala: dataEscala,
                  unidade: unidade,
                  inicioPlantao: inicioPlantao,
                  terminoPlantao: terminoPlantao,
                } as unknown as DoctorUpdate)
              }
            >
              <TitleButton>Salvar</TitleButton>
            </ButtonAction>

            <ButtonClosedModal onClick={() => setModalIsOpen(false)}>
              <TitleButton>Sair</TitleButton>
            </ButtonClosedModal>
          </DisplayButton>
        </ContainerRegister>
      </Modal>
    </Container>
  );
}
