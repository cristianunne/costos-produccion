import React, { useContext, useEffect, useState } from 'react'
import DayItem from './DayItem';
import { PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';

const DaysBoxContainer = () => {

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
        textStatusQuery, setTextStatusQuery
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

    const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', 
    '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', 
    '26', '27', '28', '29', '30', '31'];

    const [items, setItems] = useState([]);




    const createItems = () => {

        let it_ = [];

        if (daysPresent.length > 0) {

            days.forEach(day => {

                let is_present = false;
                daysPresent.forEach(d_pres => {

                    if(d_pres.day == day){
                    is_present = true;
                      
                    }

                });

                it_.push(<DayItem number_day={day} 
                    key={day} isPresent={is_present}>
    
                    </DayItem>);

            });


        } else {

            days.forEach(day => {

                it_.push(<DayItem number_day={day} 
                    key={day} isPresent={false}>
    
                    </DayItem>);
    
            });

        }

        setItems(it_);
    }

    useEffect(() => {
        setItems(null);
        createItems();

    }, [statusDays]);

    return (
        <div className="col-xl-12 d-flex gap-1 days-container justify-content-center pt-3" >

        {items}

    </div>
    )
}

export default DaysBoxContainer