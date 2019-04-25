const postNewDay = async (cDay, body) => {
	try {
		return await axios.post(`https://cani-ya.herokuapp.com/sells/newspapers/${cDay}`, body);
	} catch (error) {
		console.error(error);
	}
};

const processPostNewDay = async (cDay, body) => {
	let response = await postNewDay(cDay, body);
	const iPDay = response.data.sell.date;
	const iDay = daysD.findIndex(dia => {
		return dia.date === iPDay;
	});
	response.data.sell.sells.forEach(sell => {
		daysD[iDay].sells.push(sell);
	});
	daysD[iDay].id = response.data.sell._id;
};

const getAllDays = async () => {
	try {
		return await axios.get(`https://cani-ya.herokuapp.com/sells/newspapers`);
	} catch (error) {
		console.log(error);
	}
};

const processGetAlldays = async () => {
	let response = await getAllDays();

	response.data.sells.forEach(sell => {
		let Dia = new Day(sell.date, sell.sells);
		Dia.id = sell._id;
		daysD.push(Dia);
	});
	mostrarDiasEnLista(daysD);
};

const peticionDeActualizcion = async (id, body) => {
	try {
		return await axios.put(`https://cani-ya.herokuapp.com/sells/newspapers/${id}`,body);
	} catch (error) {
		console.log(error);
	}
}