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
  CsvContainer,
  IconValidate,
} from "./styles";
import "./Components/styles.css";

import { FaRegEdit } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";

import cancel from "../../assets/cancel.png";
import ok from "../../assets/ok.png";

import { SideBar } from "../../components/SideBar";
import { firebase } from "../../service/DB";
import { toast } from "react-toastify";
import { Titulo } from "../Profile/NewProfile/styles";
import { Header } from "../../components/Header";
import { set, setHours } from "date-fns";
import {
  InputData,
  InputNameMedico,
} from "../Justification/NewJustification/styles";
import { Link } from "react-router-dom";

import InputMask from "react-input-mask";
import { CSVLink } from "react-csv";
import moment from "moment";

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
interface Doctor {
  [x: string]: any;
  nome: string;
  CRM: string;
}
export function Honda() {
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

  const [selectAtendimento, setSelectAtendimento] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const [doctorName, setDoctorName] = useState<any>(null);

  const [crms, setCrms] = useState<any>();

  const [filterEscalas, setFilterEscalas] = useState<any[]>([]);
  const [dataToCsv, setDataToCsv] = useState<any[]>([]);
  const db = firebase.firestore();

  const [crmResult, setCrmResult] = useState<Doctor | null>(null);

  //console.log('opksaoksa',crms)
  const animatedComponents = makeAnimated();

  useEffect(() => {
    const valoresMapeados = filterEscalas.map((item) => item.crm);
    setCrms(valoresMapeados);
  }, [filterEscalas]);

  const handleConsultarDocumentos = async () => {
    try {
      const escalaSelecionada = selectEscala?.value;
      const crmSelecionado = crm;
      const dataEscalaSelecionada = dataEscala;

      let query: any = db.collection("_NEWPLANTAO");

      const hasFilters =
        escalaSelecionada || crmSelecionado || dataEscalaSelecionada;

      if (hasFilters) {
        if (escalaSelecionada) {
          query = query.where("escala", "==", escalaSelecionada);
        }

        if (dataEscalaSelecionada) {
          query = query.where("dataEscala", "==", dataEscalaSelecionada);
        }

        if (crmSelecionado) {
          query = query.where("crm", "==", crmSelecionado);
        }
      }

      const querySnapshot = await query.get();
      const escalasEncontradas: any = [];
      querySnapshot.forEach((doc: { id: any; data: () => any }) => {
        const escala = {
          id: doc.id,
          ...doc.data(),
        };
        escalasEncontradas.push(escala);
      });
      let ArrayToCsv: Array<any> = []

      await Promise.all(escalasEncontradas.map(async (item) => {
        if (item?.escalista && item?.crm && item?.dataEscala) {
          const doctor = await firebase
            .firestore()
            .collection("_DOCTORS")
            .where("CRM", "==", item.crm).get()

          if (doctor.docs[0]) {
            ArrayToCsv = [...ArrayToCsv, {
              "Nome do médico": doctor.docs[0].data().nome ?? "",
              "CRM": item?.crm ?? "",
              "Status": item?.status ?? "",
              "Data": item?.dataEscala ?? "",
              "Especialidade": item?.especialidade ?? "",
              "Área de atuaçao": item?.atuacao ?? "",
              "Tipo de atendimento": item?.atendimento ?? "",
              "Previsto": item?.inicioPlantao ?? "",
              "Realizado": item?.terminoPlantao ?? "",
              "Inicio QR": item?.atualizarInicioPlantao ?? "",
              "Termino QR": item?.atualizarTerminoPlantao ?? "",
              "Justificativa": item?.justificativa ?? "",
              "Escalista": item?.escalista ?? "",
            }]

            return ArrayToCsv
          }
        }
      }))
      console.log(ArrayToCsv)
      setDataToCsv(ArrayToCsv)
      setFilterEscalas(escalasEncontradas);
    } catch (error) {
      console.error("Erro ao obter documentos:", error);
    }
  };
  const options = list.map((item) => ({
    value: item?.Titulo,
    label: item?.Titulo,
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
  /* const getDoctors = useCallback(() => {
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
  }, [getDoctors]); */
  /* const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  }; */
  const handleChange = (selectedOption: any) => {
    setSelectedItem(selectedOption);
  };
  const handleInputChange = (event: any) => {
    const formattedValue = event.target.value;
    setDataEscala(formattedValue);
  };
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

        <ContainerHeaderAlign>
          <ContainerFilterAlignRow>
            <TextName>Unidade</TextName>
            <InputSelectLocal>
              <Selected
                className="select"
                closeMenuOnSelect={false}
                components={animatedComponents}
                placeholder="Seleciona a escala"
                //isMulti
                options={options}
                onChange={handleChange}
              />
            </InputSelectLocal>
          </ContainerFilterAlignRow>
          {/* <ContainerFilterAlignRow>
            <TextName>Tipo de atendimento</TextName>
            <InputSelectLocal>
              <Selected
                className="select"
                closeMenuOnSelect={false}
                components={animatedComponents}
                placeholder="Seleciona"
                //isMulti
                options={optionsAtendimento}
                onChange={handleChangeAtendimento}
              />
            </InputSelectLocal>
          </ContainerFilterAlignRow> */}
          <ContainerFilterAlignRow>
            <TextName>CRM</TextName>
            <InputDDD>
              <InputTeste
                placeholder="Buscar médico"
                value={crm}
                onChange={(e) => setCrm(e.target.value)}
              />
            </InputDDD>
          </ContainerFilterAlignRow>
          <ContainerFilterAlignRow>
            <TextName>Filtro por Data</TextName>
            <InputDDD>
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
            </InputDDD>
          </ContainerFilterAlignRow>
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
          <CsvContainer>
            <CSVLink
              style={{ color: "#00A84D" }}
              data={dataToCsv}
              separator=";"
              filename={"Relatorio_Ronda.csv"}>
              Exportar Relatório
            </CSVLink>
          </CsvContainer>
        </ContainerHeaderAlign>

        <ContainerListName>
          <ContainerNames>
            <BoxNames>
              <BoxTitle>Nome do médico</BoxTitle>
              <BoxTitle>CRM</BoxTitle>
              <BoxTitle>Status</BoxTitle>
              <BoxTitle style={{ marginLeft: 55 }}>Data</BoxTitle>
              <BoxTitle>Especialidade</BoxTitle>
              <BoxTitle>Área de atuaçao</BoxTitle>
              <BoxTitle>Tipo de atendimento</BoxTitle>
              <BoxTitle>Previsto</BoxTitle>
              <BoxTitle>Realizado</BoxTitle>
              <BoxTitle>Inicio QR</BoxTitle>
              <BoxTitle>Termino QR</BoxTitle>
              <BoxTitle>Justificativa</BoxTitle>
              <BoxTitle>Escalista</BoxTitle>
            </BoxNames>
          </ContainerNames>
          {filterEscalas.length === 0 && <Names>Nada registrado...</Names>}
          {filterEscalas.map((item, index) => {
            if (item?.doctor && item?.crm && item?.dataEscala) {
              return (
                <ContainerListNamesOf key={index}>
                  <Link to={`/newhonda?userId=${item.id}`} style={{ display: 'flex', fontWeight: 300 }}>
                    <BoxList>
                      <BoxFlex>
                        <TitleName>{item?.doctor}</TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList>
                      <BoxFlex>
                        <TitleName>{item?.crm}</TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList>
                      {item?.status === "Ronda Pendente" ? (
                        <IconValidate style={{ marginRight: 10 }} src={cancel} />
                      ) : (
                        <IconValidate style={{ marginRight: 10 }} src={ok} />
                      )}
                      <BoxFlex>
                        <TitleName>
                          {item?.status ? item?.status : "Ronda Pendente"}
                        </TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList style={{ marginLeft: 18 }}>
                      <BoxFlex>
                        <TitleName>{item?.dataEscala}</TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList>
                      <BoxFlex>
                        <TitleName>{item?.especialidade}</TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList>
                      <BoxFlex>
                        <TitleName>{item?.atuacao}</TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList>
                      <BoxFlex>
                        <TitleName>{item?.atendimento}</TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList>
                      <BoxFlex>
                        <TitleName>{item?.inicioPlantao}</TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList>
                      <BoxFlex>
                        <TitleName>{item?.terminoPlantao}</TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList>
                      <BoxFlex>
                        <TitleName>{item?.atualizarInicioPlantao ? item?.atualizarInicioPlantao : '00:00'}</TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList>
                      <BoxFlex>
                        <TitleName>{item?.atualizarTerminoPlantao ? item?.atualizarTerminoPlantao : '00:00'}</TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList style={{ marginLeft: -25 }}>
                      <BoxFlex>
                        <TitleName>{item?.justificativa ? item?.justificativa : "Justificativa"}</TitleName>
                      </BoxFlex>
                    </BoxList>
                    <BoxList>
                      <BoxFlex>
                        <TitleName>
                          {item?.escalista}

                          {/* <FaRegEdit
                            style={{ marginLeft: 15 }}
                            cursor="pointer"
                            color="#ccc"
                            size={17}
                          /> */}
                        </TitleName>
                      </BoxFlex>
                    </BoxList>
                  </Link>
                </ContainerListNamesOf>
              );
            }
            return null;
          })}

          {/* <div style={{ cursor: "pointer" }}>
            <ReactPaginate
              pageCount={Math.ceil(threadsMemo.length / itemsPerPage)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              previousLabel={<MdKeyboardArrowLeft />}
              nextLabel={<MdKeyboardArrowRight />}
              containerClassName="style-paginate"
            />
          </div> */}
        </ContainerListName>
      </ContainerDashboard>
      {/* Modal Detail */}
    </Container>
  );
}
