    const getNewsPapers = async () => {
        try {
            return await axios.get('https://cani-ya.herokuapp.com/newspapers')
        }
        catch (error) {
            console.error(error)
        }
    }
    
    const processNewsPapers = async () => {
        const preConfig = await getNewsPapers()
        const data = preConfig.data.newsPapers;
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
        mostrarDiarios(pConfig.days[0], 0);
    }
    
    

function getNewsPapersByDay(day){
    axios.get(`https://cani-ya.herokuapp.com/newspapers/${day}`)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}

function createNewsPaper(body){
    axios.post(`https://cani-ya.herokuapp.com/newspapers`, body)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}

const editNewsPaperOnDay = async (id, day, body) => {
    try {
        return await axios.put(`https://cani-ya.herokuapp.com/newspapers/${id}/${day}`, body)
    }
    catch (error) {
        console.error(error)
    }
}

const processEdit = async (id, day, body) => {
    const response = await editNewsPaperOnDay(id, day, body)
    mostrarDiarios(pConfig.days[0], 0);
}