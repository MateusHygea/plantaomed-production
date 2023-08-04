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
  BoxTitle
} from "./styles";
import "./Components/styles.css";

import { FaArrowLeft, FaArrowRight, FaRegEdit } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";

import { SideBar } from "../../components/SideBar";
import { firebase } from "../../service/DB";
import { toast } from "react-toastify";
import { Titulo } from "../Profile/NewProfile/styles";
import { Header } from "../../components/Header";

interface DoctorProps {
  toLowerCase: Function;
  startsWith: Function;
  nome: string;
  DDD: string;
  telefone: string;
  CRM: string;
  id: string;
  Plantão: any;
}
interface DoctorUpdate extends DoctorProps {
  id: string;
}
interface Item {
  Titulo: string;
}

export function Doctors() {
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
  const [name, setName] = useState("");
  const [crm, setCrm] = useState("");
  const [ddd, setDdd] = useState("");
  const [phone, setPhone] = useState("");

  const [doctors, setDoctors] = useState<DoctorProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState<Item[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const db = firebase.firestore();
  const itemsRef = db.collection("_DOCTORS");

  const animatedComponents = makeAnimated();

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

  const getDoctors = useCallback(() => {
    const unsubscribe = itemsRef
      .orderBy("nome", "asc")
      .onSnapshot((snapshot) => {
        const data: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(data);
      });
    return () => {
      unsubscribe;
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

  function getItemsPerPage() {
    let filteredDoctors = threadsMemo;
    if (search) {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.nome.toLowerCase().includes(search.toLowerCase())
      );
    }

    const startIndex = currentPage * itemsPerPage;
    return filteredDoctors.slice(startIndex, startIndex + itemsPerPage);
  }

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  function openModal(doctor: DoctorProps) {
    setSelectedDoctor(doctor);
    setName(doctor.nome);
    setCrm(doctor.CRM);
    setDdd(doctor.DDD);
    setPhone(doctor.telefone);
    setModalIsOpen(true);
    setSelectedItem(doctor.Plantão)
  }

  async function updateDoctorData(doctor: DoctorProps) {
    if (
      name === selectedDoctor!.nome &&
      crm === selectedDoctor!.CRM &&
      ddd === selectedDoctor!.DDD &&
      phone === selectedDoctor!.telefone &&
      selectedItem === selectedDoctor!.Plantão
    ) {
      toast.warn("Você não alterou nenhum dos dados!");
      return;
    }
    const dados = {
      nome: doctor?.nome,
      DDD: doctor?.DDD,
      telefone: doctor?.telefone,
      CRM: doctor?.CRM,
      Plantão: doctor.Plantão
    };
    try {
      await firebase
        .firestore()
        .collection("_DOCTORS")
        .doc(doctor.id)
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

  return (
    <Container>
      <SideBar />

      <ContainerDashboard>
        <Header title={'Médicos'} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Médicos</ActionText>
            <Title>Todos os médicos</Title>
          </ContTitle>

          <ButtonAction>
            <TitleButton onClick={() => navigate("/newdoctors")}>
              + Novo Médico
            </TitleButton>
          </ButtonAction>
        </BoxTitleDashboard>

        <BoxSearchFilter>
          <Filter>
            <AiOutlineSearch size={25} color="#DDE2E4" />
            <TextInputFilter
              placeholder="Buscar médico"
              color="#DDE2E4"
              type="text"
              value={search}
              onChange={handleSearch}
            />
          </Filter>
        </BoxSearchFilter>
        <ContainerListName>
          <ContainerNames>
            <BoxNames>
              <BoxTitle>Nome do médico</BoxTitle>
              <BoxTitle>Telefone</BoxTitle>
              <BoxTitle>CRM</BoxTitle>
            </BoxNames>
          </ContainerNames>
          {threadsMemo.length === 0 && (
            <Names>Nenhum médico registrado...</Names>
          )}
          {getItemsPerPage().map((doctor) => (
            <ContainerListNamesOf key={doctor.id}>
              <BoxList>
                <BoxFlex>
                  <TitleName>{doctor.nome}</TitleName>
                </BoxFlex>
              </BoxList>
              <BoxList>
                <BoxFlex>
                  <TitleName>{doctor.DDD + " " + doctor.telefone}</TitleName>
                </BoxFlex>
              </BoxList>
              <BoxList>
                <FlexDiv>
                  <TitleName>{doctor.CRM}</TitleName>
                  <FaRegEdit
                    onClick={() => openModal(doctor)}
                    style={{ marginLeft: 15 }}
                    cursor="pointer"
                    color="#ccc"
                    size={17}
                  />
                </FlexDiv>
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
          <ContainerRegisterNameAndPhone>
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
          </ContainerRegisterNameAndPhone>

          <ContainerDataAndRegister>
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
          </ContainerDataAndRegister>
          <DisplayButton>
            <ButtonAction
              onClick={() =>
                updateDoctorData({
                  id: selectedDoctor?.id,
                  nome: name,
                  CRM: crm,
                  DDD: ddd,
                  telefone: phone,
                  Plantão: selectedItem
                } as DoctorUpdate)
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
