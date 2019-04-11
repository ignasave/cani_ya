const getConfig = async (day) => {
    try {
        return await axios.get(`https://cani-ya.herokuapp.com/newspapers/${day}`)
    }
    catch (error) {
        console.error(error)
    }
}

const processConfig = async (cDay) => {
    const preConfig = await getConfig(cDay);
    pConfg = preConfig.data.newsPapers
    nCofig = pConfg.map( newsPaper => {
        return ({
            id : newsPaper._id,
            newsPaper : newsPaper.newsPaper,
            envy : newsPaper[cDay].envy,
            price : newsPaper[cDay].price,
            earnings : newsPaper[cDay].earnings
        })
    })
}