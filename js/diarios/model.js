const postNewDay = async (cDay, body) => {
    try {
        return await axios.post(`https://cani-ya.herokuapp.com/sells/newspapers/${cDay}`, body)
    }
    catch (error) {
        console.error(error)
    }
}

const processPostNewDay = async(cDay, body) => {
    let response = await postNewDay(cDay,body)
    const iPDay = response.data.sell.date;
    const iDay = daysD.findIndex(dia => {
        return dia.date === iPDay
    });
    response.data.sell.sells.forEach(sell => {
        daysD[iDay].sells.push(sell);
    });
    daysD[iDay].id = response.data.sell._id;
}
