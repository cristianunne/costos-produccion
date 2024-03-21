import { URLS } from "./URLS";


export const getEmpresasAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.EMPRESAS_GET, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getRodalesAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.RODALES_GET, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getRodalesWithEmpresasAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.GET_RODALES_WITH_EMPRESAS, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getMaterialesAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.GET_MATERIALES, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getElaboradorAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.GET_ELABORADOR, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}


export const getChoferesAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.GET_CHOFERES, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}


export const getTransportistasAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.GET_TRANSPORTISTAS, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getCompradoresAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.GET_COMPRADORES, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getYearsAPI = async () => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

    //let data = { idcampaign: idcampaign, camion_origen: camion_origen }


    const rawResponse = await fetch(URLS.GET_YEARS_FORESTAL, {
        method: 'GET',
        headers: headers
        //body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}


export const getYearsPresentAPI = async (filter) => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

   
    let data = { filter }

    const rawResponse = await fetch(URLS.GET_YEARS_PRESENT_FORESTAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getMaterialesPresentAPI = async (filter) => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

   
    let data = { filter }

    const rawResponse = await fetch(URLS.GET_MATERIALES_PRESENT_FORESTAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getElaboradorPresentAPI = async (filter) => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

   
    let data = { filter }

    const rawResponse = await fetch(URLS.GET_ELABORADOR_PRESENT_FORESTAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}


export const getChoferesPresentAPI = async (filter) => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

   
    let data = { filter }

    const rawResponse = await fetch(URLS.GET_CHOFERES_PRESENT_FORESTAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getTransportistasPresentAPI = async (filter) => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

   
    let data = { filter }

    const rawResponse = await fetch(URLS.GET_TRANSPORTISTAS_PRESENT_FORESTAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export const getCompradorPresentAPI = async (filter) => {

    let headers = new Headers();


    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);

   
    let data = { filter }

    const rawResponse = await fetch(URLS.GET_COMPRADOR_PRESENT_FORESTAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}


export const getMonthsPresentAPI = async (filter) => {

    let headers = new Headers();

    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);
   
    let data = { filter }

    const rawResponse = await fetch(URLS.GET_MONTHS_PRESENT_FORESTAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}


export const getDaysPresentAPI = async (filter) => {

    let headers = new Headers();

    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);
   
    let data = { filter }

    const rawResponse = await fetch(URLS.GET_DAYS_PRESENT_FORESTAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}


export const getRodalesPresentAPI = async (filter) => {

    let headers = new Headers();

    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);
   
    let data = { filter }

    const rawResponse = await fetch(URLS.GET_RODALES_PRESENT_FORESTAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}


export const getEmpresasPresentAPI = async (filter) => {

    let headers = new Headers();

    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body
    headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('X-CSRF-Token', csrf);
   
    let data = { filter }

    const rawResponse = await fetch(URLS.GET_EMPRESAS_PRESENT_FORESTAL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    try {
        const content = rawResponse.json();
        //console.log(content);

        //user = content;
        return content;
    } catch (err) {
        console.log(err);
        return false;
    }

}



