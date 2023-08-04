import React, { useState, useEffect, useCallback, useMemo, useContext } from "react";

import {
  Container,
  ContainerDashboard,
  BoxTitleDashboard,
  ActionText,
  Title,
  ContTitle,
  ContainerTags,
  Tag,
  TitleTag,
  ContainerListName,
  ContainerNames,
  Names,
  BoxName,
  BoxList,
  ContainerListNamesOf,
  TitleName,
  TextInputFilter,
  ContainerCalendar,
  IconPhoto,
  ImagePhoto,
  BoxListFirst,
  BoxTitle,
  ContentPaginate,
  Loading,
  TitleSelect,
  ContainerTable
} from "./styles";

import moment from "moment";

import { CSVLink } from "react-csv";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
//thiago
import "./components/calendar.css";
import "../Doctors/Components/styles.css";
import { SideBar } from "../../components/SideBar";
import { firebase } from "../../service/DB";
import { Header } from "../../components/Header";
import { LightBox } from "../../components/LightBox";
import ReactPaginate from "react-paginate";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Select } from "../../components/Select";
import { AuthContext } from "../../contexts/Context";
import { headers } from "../../utils/headerCsv";

interface Item {
  Titulo: string;
  nome: string;
  Ponto: string;
  Doutor: string;
  Data: string;
  Horario: string;
  id: string;
  entrada?: string;
  saida?: string;
  status: string;
  hour?: string;
}

interface CollectionData {
  field1: string;
  field2: string;
  field3: string;
  Horario: string;
  Data: string;
  Doutor?: string;
  Ponto?: string;
  url?: string; 
  photo?: string; 
  id?: string;
  unidade?: string;
  entrada?: string;
  saida?: string;
  status: string;
  hour?: string;
}

interface Ponto {
  [x: string]: any;
  Horario: string;
  Data: string;
  // :: ---- :: \\
  nome: string;
  Ponto: string;
  Doutor: string;
  id: string;
  // :: ---- :: \\
  field1: string;
  field2: string;
  field3: string;
  
}

interface CollectionDataLocal {
  field1: string;
  field2: string;
  field3: string;
}

export function Ponto() {
  const [search, setSearch] = useState<string>("");
  const [localizacao, setLocalizacao] = useState<string>("");

  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [collectionData, setCollectionData] = useState<CollectionData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [openCalendarStart, setOpenCalendarStart] = useState(false);
  const [openCalendarFinal, setOpenCalendarFinal] = useState(false);

  const _dataAtual = moment().format("DD/MM/YYYY");

  const [selectedData, setSelectedData] = useState<string>('');

  const [selectedDataFinal, setSelectedDataFinal] = useState<string>('');
  const [filteredPontos, setFilteredPontos] = useState<CollectionData[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const [loading, setLoading] = useState(false);

  const [threads, setThreads] = useState<Item[]>([]);
  const [collectionDataLocal, setCollectionDataLocal] = useState<CollectionDataLocal[]>([]);

 const { viewPonto } = useContext(AuthContext);

  function handleOpenCalendarStart() {
    setOpenCalendarStart(!openCalendarStart);
  }

  function handleOpenCalendarFinal() {
    setOpenCalendarFinal(!openCalendarFinal);
  }

  const handleDateChangeStart = (date: any | Date[]) => {
    const selectedDate = moment(date).format("DD/MM/YYYY");
    setSelectedData(selectedDate);
    setOpenCalendarStart(!openCalendarStart);
  };

  const handleDateChangeFinal = (date: any | Date[]) => {
    const selected = moment(date).format("DD/MM/YYYY");
    setSelectedDataFinal(selected);
    setOpenCalendarFinal(!openCalendarFinal);
  };

  const getPontos = useCallback(async () => {
    let startDate
    let endDate
    const dataAtual = selectedData ? selectedData : moment()
    const dateMoment = moment(selectedData ? selectedData : dataAtual, 'DD/MM/YYYY')
    const dateMomentFinal = moment(selectedDataFinal ? selectedDataFinal : dataAtual, 'DD/MM/YYYY');
    startDate = (dateMoment.startOf('day')).toDate();
    endDate = (dateMomentFinal.endOf('day')).toDate();
    setLoading(true);
    try {
      const db = firebase.firestore();
      const itemsRef = db.collection("_PONTOS")
        .where("Horario", ">=", startDate )
        .where("Horario", "<=", endDate)
        .orderBy("Horario", selectedDataFinal ? "asc" : "desc");

      const querySnapshot = await itemsRef.get();

      const tempArray = querySnapshot.docs.map((doc) => {
        const { seconds } = doc.data().Horario;
        const data = moment(doc.data().Horario.toDate()).format("DD/MM/YYYY");
        const horario = moment.unix(seconds).format("HH:mm:ss A");
        return {
            ...(doc.data() as Item & CollectionData),
            Horario: horario,
            Data: data,
            photo: doc.data().photo ?? doc.data().url,
            entrada: doc.data().status === 'entrada' ? horario : '',
            saida: doc.data().status === 'saida' ? horario : '',
            hour: !doc.data().status ? horario : '',
            status: doc.data().status
        };
      });
      setPontos(tempArray);
      setCollectionData(
        tempArray.map((ponto) => {
            return {
                field1: ponto.field1,
                field2: ponto.field2,
                field3: ponto.field3,
                Horario: ponto.Horario,
                Data: ponto.Data,
                entrada: ponto.Horario ? ponto.Horario : '',
                saida:  ponto.Horario ? ponto.Horario : '',
                status: ponto.status,
                hour: ponto.hour
            };
        })
      );
      setFilteredPontos(tempArray as any);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [selectedData, selectedDataFinal]);

  var db = firebase.firestore();
  var itemsRef = db.collection("_LOCAL");

  const getLocal = useCallback(() => {
    const unsubscribe = itemsRef.onSnapshot((querySnapshot) => {
      const docs = querySnapshot.docs.map(
        (doc) => doc.data() as Item & CollectionData
      );
      setThreads(docs);
      setCollectionDataLocal(docs);
    });
    return () => {
      unsubscribe;
    };
  }, []);


  const filteredPontosMemo = useMemo(() => filteredPontos, [filteredPontos]);

  function getItemsPerPage() {
    let filterPontos = filteredPontos;
    if (search) {
      filterPontos = filterPontos.filter((pontos) =>
        pontos.Doutor?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if(localizacao) {
      filterPontos = filterPontos.filter((pontos) =>
      pontos.unidade === localizacao
    );
    }

    const startIndex = currentPage * itemsPerPage;
    return filterPontos.slice(startIndex, startIndex + itemsPerPage);
  }

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const options = [{ label: 'Selecione uma unidade', value: '' }].concat(
    threads.map(thread => {
      return { label: thread.Titulo, value: thread.Titulo };
    })
  );

  useEffect(() => {
    async function fetchData() {
      const unsubscribe = await getPontos();
      return unsubscribe;
    }
    fetchData();
  }, [getPontos]);

  useEffect(() => {
    const unsubscribe = getLocal();
    return unsubscribe;
  }, [getLocal]);

  return (
    <Container>
      <SideBar />
      <ContainerDashboard>
        <Header title={'Plantão Digital'} />
        <BoxTitleDashboard>
          <ContTitle>
            <ActionText>Plantão Digital</ActionText>
            <Title>Plantão Digital</Title>
          </ContTitle>
        </BoxTitleDashboard>

        <ContainerTags>
          <Tag>
            <TextInputFilter
              placeholder="Buscar médico"
              color="#DDE2E4"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Tag>
          <Tag
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={handleOpenCalendarStart}
          >
          <TitleTag>{selectedData ? selectedData : 'Data Inicial'}</TitleTag>
          </Tag>

          <Tag
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={handleOpenCalendarFinal}
          >
            <TitleTag>{selectedDataFinal ? selectedDataFinal : 'Data Final'}</TitleTag>
          </Tag>

          {!viewPonto ?
            <Tag>
              <TitleTag>
                <CSVLink
                style={{ color: "#00A84D" }}
                data={filteredPontos}
                filename={`${selectedData} Relatorio_Pontos.csv`}
                separator=";"
                headers={headers}
                >
                Exportar Relatório
              </CSVLink>
              </TitleTag>
            </Tag>
            :
            <TitleSelect>
              <Select options={options} onChange={(e) => setLocalizacao(e.target.value)}  />
            </TitleSelect>
          }
        </ContainerTags>

        {openCalendarStart && (
          <ContainerCalendar>
            <Calendar
              className="custom-calendar"
              onChange={handleDateChangeStart}
              value={selectedDate}
            />
          </ContainerCalendar>
        )}

        {openCalendarFinal && (
          <ContainerCalendar>
            <Calendar
              className="custom-calendar"
              onChange={handleDateChangeFinal}
              value={selectedDate}
            />
          </ContainerCalendar>
        )}
      <ContainerTable>
        <ContainerListName>
          <ContainerNames>
            <BoxName>
              <BoxTitle>Nome</BoxTitle>
              <BoxTitle>CRM</BoxTitle>
              <BoxTitle>Data</BoxTitle>
              <BoxTitle>Entrada</BoxTitle>
              <BoxTitle>Saída</BoxTitle>
            </BoxName>
          </ContainerNames>
        </ContainerListName>

        {/* filter month */}
        {loading ? (
            <Loading>Carregando...</Loading>
        ) : (
          <>
          {getItemsPerPage()
            .filter((doctor) =>
              doctor?.Doutor?.toLowerCase()!.includes(search?.toLowerCase()!)
            )
            .map((doctor) => {
              return (
                <ContainerListNamesOf key={doctor.id}>
                  <BoxListFirst>
                    <LightBox src={doctor?.photo} alt="Photo">
                      {
                        !doctor?.photo ? '' : <IconPhoto><ImagePhoto src={doctor?.photo} /></IconPhoto>
                      }
                    </LightBox>
                    <TitleName>{doctor?.Doutor}</TitleName>
                  </BoxListFirst>
                  <BoxList>
                    <TitleName>{doctor?.Ponto}</TitleName>
                  </BoxList>
                  <BoxList>
                    <TitleName>
                      {doctor?.hour ? doctor?.Data + " " + doctor?.hour : doctor.Data}
                    </TitleName>
                  </BoxList>
                 <BoxList>
                    <TitleName>
                      {doctor?.entrada ? doctor?.entrada : ''}
                    </TitleName>
                  </BoxList>
                  <BoxList>
                    <TitleName>
                      {doctor?.saida ? doctor?.saida : ''}
                    </TitleName>
                  </BoxList>
                </ContainerListNamesOf>
              );
            })}
            </>
        )}
        <ContentPaginate>
          <ReactPaginate
            pageCount={Math.ceil(filteredPontosMemo.length / itemsPerPage)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            previousLabel={<MdKeyboardArrowLeft />}
            nextLabel={<MdKeyboardArrowRight />}
            containerClassName="style-paginate"
          />
        </ContentPaginate>
      </ContainerTable>
      </ContainerDashboard>
    </Container>
  );
}
