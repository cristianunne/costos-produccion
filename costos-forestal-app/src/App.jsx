import { useEffect, useState } from 'react'
import TabLeftContainer from './components/tab-left-container/TabLeftContainer'
import { CostosGlobalContext, DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from './context/GlobalContext'
import YearsBoxContainer from './components/header/years/YearsBoxContainer';
import { getYearsAPI } from './utility/Querys';

import '../src/styles/DateHeader/dateheader.css'
import '../src/styles/DateHeader/dayscontainer.css'
import '../src/styles/CostosContainer/CostosContainer.css'

import MonthsBoxContainer from './components/header/month/MonthsBoxContainer';
import DaysBoxContainer from './components/header/days/DaysBoxContainer';
import Loading from './components/alert/Loading';
import ExtraccionTableContainer from './components/extraccion/ExtraccionTableContainer';
import ProduccionYearsGraphic from './components/graphics_container/ProduccionYearsGraphic';
import RMDContainer from './components/RMDExtraccion/RMDContainer';
import ResumenMain from './components/resumen/ResumenMain';



function App() {

  //construyo los estados del Context

  const [rodalesData, setRodalesData] = useState([]);
  const [rodalesDinamicData, setRodalesDinamicData] = useState([]);

  const [empresasData, setEmpresasData] = useState([]);
  const [empresasDinamicData, setEmpresasDinamicData] = useState([]);

  const [materialesData, setMaterialesData] = useState([]);
  const [materialesDinamicData, setMaterialesDinamicData] = useState([]);

  const [elaboradorData, setElaboradorData] = useState([]);
  const [elaboradorDinamicData, setElaboradorDinamicData] = useState([]);

  const [choferesData, setChoferesData] = useState([]);
  const [choferesDinamicData, setChoferesDinamicData] = useState([]);

  const [transportistaData, setTransportistaData] = useState([]);
  const [transportistaDinamicData, setTransportistaDinamicData] = useState([]);

  const [compradorData, setCompradorData] = useState([]);
  const [compradorDinamicData, setCompradorDinamicData] = useState([]);


  const [yearsData, setYearsData] = useState([]);
  const [yearsDinamicData, setYearsDinamicData] = useState([]);
  const [monthsData, setMonthsData] = useState([]);
  const [monthsDinamicData, setMonthsDinamicData] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [daysDinamicData, setDaysDinamicData] = useState([]);


  //creo los status
  const [statusRodales, setStatusRodales] = useState(false);
  const [statusEmpresas, setStatusEmpresas] = useState(false);
  const [statusMateriales, setStatusMateriales] = useState(false);
  const [statusElaborador, setStatusElaborador] = useState(false);
  const [statusChoferes, setStatusChoferes] = useState(false);
  const [statusTransportista, setStatusTransportista] = useState(false);
  const [statusComprador, setStatusComprador] = useState(false);

  const [statusYears, setStatusYears] = useState(false);
  const [statusYearsGeneral, setStatusYearsGeneral] = useState(false);
  const [statusMonths, setStatusMonths] = useState(false);
  const [statusDays, setStatusDays] = useState(false);

  //estados utilizados para saber quien hizo el Query inicialmente y proceder en virtud de este evento
  const [statusQuery, setStatusQuery] = useState(false);
  const [textStatusQuery, setTextStatusQuery] = useState(null);
  const [levels, setLevels] = useState({});


  const [isLoading, setIsLoading] = useState(false);

  const [statusLevels, setStatusLevels] = useState(false);




  //creo los SELECTED 
  const [rodalesSelected, setRodalesSelected] = useState([]);
  const [empresasSelected, setEmpresasSelected] = useState([]);
  const [materialesSelected, setMaterialesSelected] = useState([]);
  const [elaboradorSelected, setElaboradorSelected] = useState([]);
  const [choferesSelected, setChoferesSelected] = useState([]);
  const [transportistaSelected, setTransportistaSelected] = useState([]);
  const [compradorSelected, setCompradorSelected] = useState([]);

  const [yearsSelected, setYearsSelected] = useState([]);
  const [monthsSelected, setMonthsSelected] = useState([]);
  const [daysSelected, setDaysSelected] = useState([]);

  //creo todos los presents

  const [rodalesPresent, setRodalesPresent] = useState([]);
  const [empresasPresent, setEmpresasPresent] = useState([]);
  const [materialesPresent, setMaterialesPresent] = useState([]);
  const [elaboradorPresent, setElaboradorPresent] = useState([]);
  const [choferesPresent, setChoferesPresent] = useState([]);
  const [transportistaPresent, setTransportistaPresent] = useState([]);
  const [compradorPresent, setCompradorPresent] = useState([]);

  const [yearsPresent, setYearsPresent] = useState([]);
  const [monthsPresent, setMonthsPresent] = useState([]);
  const [daysPresent, setDaysPresent] = useState([]);


  //creo las funciones para las tablas
  const [pagesExtraccion, setPagesExtraccion] = useState();
  const [numberDataExtraccion, setNumberDataExtraccion] = useState();
  const [dataExtraccion, setDataExtraccion] = useState([]);
  const [isLoadingTableExtraccion, setIsLoadingTableExtraccion] = useState(true);
  const [currentPageExtraccion, setCurrentPageExtraccion] = useState(1);


  const [dataRDM, setDataRDM] = useState([]);
  const [isLoadingTableRDM, setIsLoadingTableRDM] = useState(true);

  const [costoElab, setCostoElab] = useState(0);
  const [costoTrans, setCostoTrans] = useState(0);
  const [toneladas, setToneladas] = useState(0);


  const getYears = async () => {

    setIsLoading(true);
    const data_years = await getYearsAPI();

    if (data_years) {

      setYearsData(data_years);
      setYearsDinamicData(data_years);

      setStatusYearsGeneral(!statusYearsGeneral);
      setStatusYears(!statusYears);

    }
    setIsLoading(false);
  }

  useEffect(() => {




    if (!statusYearsGeneral) {
      getYears();

    }


  })


  return (
    <div className="page-wrapper">

      <DataGlobalContext.Provider value={{
        rodalesData, setRodalesData,
        rodalesDinamicData, setRodalesDinamicData,
        empresasData, setEmpresasData,
        empresasDinamicData, setEmpresasDinamicData,
        materialesData, setMaterialesData,
        materialesDinamicData, setMaterialesDinamicData,
        elaboradorData, setElaboradorData,
        elaboradorDinamicData, setElaboradorDinamicData,
        choferesData, setChoferesData,
        choferesDinamicData, setChoferesDinamicData,
        transportistaData, setTransportistaData,
        transportistaDinamicData, setTransportistaDinamicData,
        compradorData, setCompradorData,
        compradorDinamicData, setCompradorDinamicData,
        yearsData, setYearsData,
        yearsDinamicData, setYearsDinamicData,
        monthsData, setMonthsData,
        monthsDinamicData, setMonthsDinamicData,
        daysData, setDaysData,
        daysDinamicData, setDaysDinamicData

      }} >

        <StatusGlobalContext.Provider value={{
          statusRodales, setStatusRodales,
          statusEmpresas, setStatusEmpresas,
          statusMateriales, setStatusMateriales,
          statusElaborador, setStatusElaborador,
          statusChoferes, setStatusChoferes,
          statusTransportista, setStatusTransportista,
          statusComprador, setStatusComprador,
          statusYears, setStatusYears,
          statusYearsGeneral, setStatusYearsGeneral,
          statusMonths, setStatusMonths,
          statusDays, setStatusDays,
          statusQuery, setStatusQuery,
          textStatusQuery, setTextStatusQuery,
          levels, setLevels,
          isLoading, setIsLoading,
          statusLevels, setStatusLevels

        }}>

          <SelectedGlobalContext.Provider value={{

            rodalesSelected, setRodalesSelected,
            empresasSelected, setEmpresasSelected,
            materialesSelected, setMaterialesSelected,
            elaboradorSelected, setElaboradorSelected,
            choferesSelected, setChoferesSelected,
            transportistaSelected, setTransportistaSelected,
            compradorSelected, setCompradorSelected,
            yearsSelected, setYearsSelected,
            monthsSelected, setMonthsSelected,
            daysSelected, setDaysSelected

          }}>
            <PresentGlobalContext.Provider value={{
              rodalesPresent, setRodalesPresent,
              empresasPresent, setEmpresasPresent,
              materialesPresent, setMaterialesPresent,
              elaboradorPresent, setElaboradorPresent,
              choferesPresent, setChoferesPresent,
              transportistaPresent, setTransportistaPresent,
              compradorPresent, setCompradorPresent,
              yearsPresent, setYearsPresent,
              monthsPresent, setMonthsPresent,
              daysPresent, setDaysPresent

            }}>
              <CostosGlobalContext.Provider value={{
                pagesExtraccion, setPagesExtraccion,
                numberDataExtraccion, setNumberDataExtraccion,
                dataExtraccion, setDataExtraccion,
                isLoadingTableExtraccion, setIsLoadingTableExtraccion,
                currentPageExtraccion, setCurrentPageExtraccion,
                dataRDM, setDataRDM,
                isLoadingTableRDM, setIsLoadingTableRDM,
                costoElab, setCostoElab,
                costoTrans, setCostoTrans,
                toneladas, setToneladas

              }}>
              <Loading></Loading>
                <div className="container" id="container">

                

                  <div className="row" id='row-container'>

                    <div className="col-lg-2 bg-dark" id='left-container'>

                      <TabLeftContainer></TabLeftContainer>


                    </div>

                    <div className="col-lg-10 d-flex flex-column" id='main-container'>

                      <div className="row pb-3 bg-dark">

                        <YearsBoxContainer></YearsBoxContainer>
                        <MonthsBoxContainer></MonthsBoxContainer>
                        <div className="hr-text unset-margin mb-1 mt-1">Dias</div>
                        <DaysBoxContainer></DaysBoxContainer>


                      </div>

                      <div className="row" id='costos-container'>
                        <div className="col-lg-12 mb-5">

                          <div className="row">
                            <div className="col-lg-8">
                              <div className="col-12">
                                <div className="card">
                                  <div className="card-body">
                                    <div id="chart-tasks-overview">

                                      <ProduccionYearsGraphic></ProduccionYearsGraphic>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4">

                              <ResumenMain></ResumenMain>

                            </div>
                          </div>

                        </div>

                        <div className="col-lg-12">
                                <ExtraccionTableContainer></ExtraccionTableContainer>
                        </div>

                        <div className="col-lg-12">
                                <RMDContainer></RMDContainer>
                        </div>
                      </div>


                    </div>

                  </div>

                </div>
              </CostosGlobalContext.Provider>




            </PresentGlobalContext.Provider>



          </SelectedGlobalContext.Provider>


        </StatusGlobalContext.Provider>
      </DataGlobalContext.Provider>

    </div>
  )
}

export default App
