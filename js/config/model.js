const getNewsPapers = async () => {
    try {
        return await axios.get('https://cani-ya.herokuapp.com/newspapers')
    }
    catch (error) {
        console.error(error)
    }
}

const processNewsPapers = async (day) => {
    const preConfig = await getNewsPapers()
    const data = preConfig.data.newsPapers;
    pConfig = {
        days: [
            (domingo = []),
            (lunes = []),
            (martes = []),
            (miercoles = []),
            (jueves = []),
            (viernes = []),
            (sabado = []),
        ]
    }
    data.forEach( datum => {
        datum.domingo.newsPaper = datum.newsPaper;
        datum.lunes.newsPaper = datum.newsPaper;
        datum.martes.newsPaper = datum.newsPaper;
        datum.miercoles.newsPaper = datum.newsPaper;
        datum.jueves.newsPaper = datum.newsPaper;
        datum.viernes.newsPaper = datum.newsPaper;
        datum.sabado.newsPaper = datum.newsPaper;

        datum.domingo.id = datum._id;
        datum.lunes.id = datum._id;
        datum.martes.id = datum._id;
        datum.miercoles.id = datum._id;
        datum.jueves.id = datum._id;
        datum.viernes.id = datum._id;
        datum.sabado.id = datum._id;

        pConfig.days[0].push(datum.domingo);
        pConfig.days[1].push(datum.lunes)
        pConfig.days[2].push(datum.martes);
        pConfig.days[3].push(datum.miercoles);
        pConfig.days[4].push(datum.jueves);
        pConfig.days[5].push(datum.viernes);
        pConfig.days[6].push(datum.sabado);
    });
    mostrarDiarios(pConfig.days[day], day);
}
    
const createNewsPaper = async (body) => {
    try{
       return await axios.post(`https://cani-ya.herokuapp.com/newspapers`, body)
    }
    catch (error){
        console.log(error)
    }
}

const processCreateNewsPaper = async (body, day) =>{
    await createNewsPaper(body);
    await processNewsPapers(day);
}

const editNewsPaperOnDay = async (day, body) => {
    try {
        return await axios.put(`https://cani-ya.herokuapp.com/newspapers/${body.id}/${day}`, body)
    }
    catch (error) {
        console.error(error)
    }
}

const processEdit = async (day, body) => {
    let cDay = 'domingo'
    switch (day) {
        case 0: cDay = 'domingo'; break;
        case 1: cDay = 'lunes'; break;
        case 2: cDay = 'martes'; break;
        case 3: cDay = 'miercoles'; break;
        case 4: cDay = 'jueves'; break;
        case 5: cDay = 'viernes'; break;
        case 6: cDay = 'sabado'; break;
    }
    await editNewsPaperOnDay(cDay, body);
}