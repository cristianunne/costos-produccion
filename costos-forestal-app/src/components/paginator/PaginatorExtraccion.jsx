import React, { useContext, useEffect, useState } from 'react'
import { CostosGlobalContext, DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../context/GlobalContext';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem'
import { getExtraccionDataFunction } from '../../utility/Procesamiento';

const PaginatorExtraccion = () => {

    const {
        statusRodales, setStatusRodales,
        statusEmpresas, setStatusEmpresas,
        statusMateriales, setStatusMateriales,
        statusElaborador, setStatusElaborador,
        statusChoferes, setStatusChoferes,
        statusTransportista, setStatusTransportista,
        statusComprador, setStatusComprador,
        statusYears, setStatusYears,
        statusMonths, setStatusMonths,
        statusDays, setStatusDays,
        statusQuery, setStatusQuery,
        textStatusQuery, setTextStatusQuery,
        levels, setLevels,
        isLoading, setIsLoading
    } = useContext(StatusGlobalContext);

    const {
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
    } = useContext(SelectedGlobalContext);

    const {
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
    } = useContext(PresentGlobalContext);

    const {
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
    } = useContext(DataGlobalContext);


    const {
        pagesExtraccion, setPagesExtraccion,
        numberDataExtraccion, setNumberDataExtraccion,
        dataExtraccion, setDataExtraccion,
        isLoadingTableExtraccion, setIsLoadingTableExtraccion,
        currentPageExtraccion, setCurrentPageExtraccion
    } = useContext(CostosGlobalContext);

    //traigo el context de selected y el context de data extraccion

    //creoun estado para manejar laposision del widget pgae actual
    const [currentPageWidget, setCurrentPageWidget] = useState(1);
    const [numberPageWidget, setNumberPageWidget] = useState(1);

    const [items, setItems] = useState([]);


    const number_pages_show = 30

    const onClickInPage = async (page) => {

        let page_ = parseInt(page.target.text);

        //revisi si es yearQuery o no
        setIsLoading(true);
        setIsLoadingTableExtraccion(false);

        if(statusQuery){

            //con que este el query activo ya puedo hacer la consulta
            const data_extrac = await getExtraccionDataFunction(empresasSelected, rodalesSelected, materialesSelected, 
                elaboradorSelected, choferesSelected, transportistaSelected, compradorSelected, yearsSelected, monthsSelected, 
                daysSelected, page_);
            
            if(data_extrac){
                setDataExtraccion(data_extrac);
            }

        }



        setCurrentPageExtraccion(page_);
        setIsLoadingTableExtraccion(true);
        setIsLoading(false);

    }

    const onClickPrevious = () => {

        if(currentPageWidget > 1){

            //consulto si es el ultimo

            let res_ = currentPageWidget - 1;
            setCurrentPageWidget(res_);

        }

    }

    const onClickFirst = () => {

          //tengo que aumentar una pagina
          setCurrentPageWidget(1);

    }

    const onClickNext = () => {

        //tengo que aumentar una pagina
        if((currentPageWidget + 1) <= numberPageWidget){


            let res_ = currentPageWidget + 1;
            setCurrentPageWidget(res_);
           
        }

    }

    const onClickLast = () => {

        setCurrentPageWidget(numberPageWidget);

    }

    const createPages = () => {

        if(pagesExtraccion > 0){

            let mod_page_pag = pagesExtraccion % number_pages_show;


            let number_pages_in_windget = mod_page_pag == 0 ? (pagesExtraccion / number_pages_show) : 
                                            ((pagesExtraccion - mod_page_pag) / number_pages_show) + 1;

            setNumberPageWidget(number_pages_in_windget);

            let lim_sup = currentPageWidget == number_pages_in_windget ? 
            pagesExtraccion : (currentPageWidget * number_pages_show);

            let lim_inf = 0;

            if(currentPageWidget == number_pages_in_windget){

                if(mod_page_pag == 0){
                    lim_inf = (lim_sup - number_pages_show) + 1;
                } else {
                    lim_inf = (lim_sup - mod_page_pag) + 1;
                }
            
            } else {
                lim_inf = (lim_sup - number_pages_show) + 1;
            }

            let items_ = [];

            for (let index = lim_inf; index <= lim_sup; index++) {


                items_.push(<PageItem key={index} active={index === currentPageExtraccion} onClick={onClickInPage}>
                    {index}
                </PageItem>);
                
            }

            setItems(items_);


        }

    }

    useEffect(() => {

        if(pagesExtraccion > 0){
            createPages();
        } else {
            setItems(null);
        }
       
     
        
        
    }, [currentPageExtraccion, currentPageWidget, pagesExtraccion]);

    


    return (
        <Pagination className='mb-0' id='pagination-costos'>
        <Pagination.First onClick={onClickFirst} />
        <Pagination.Prev onClick={onClickPrevious} />

        {items}

        
        <Pagination.Next onClick={onClickNext} />
        <Pagination.Last onClick={onClickLast} />
    </Pagination>
    )
}

export default PaginatorExtraccion