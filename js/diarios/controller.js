var daysD = [];

/*var config = {
	newsPapers: [
		{
			newsPaper: 'CAPITAL',
			envy: 0,
			price: 30,
			earnings: 0.5
		},
		{
			newsPaper: 'CLARIN',
			envy: 7.5,
			price: 77,
			earnings: 0.3
		},
		{
			newsPaper: 'OLE',
			envy: 5,
			price: 35,
			earnings: 0.3
		},
		{
			newsPaper: 'PERFIL',
			envy: 6,
			price: 67,
			earnings: 0.6
		},
		{
			newsPaper: 'CRONISTA',
			envy: 4,
			price: 5,
			earnings: 0.5
		}
	]
};*/

var pConfg, nCofig;

processGetAlldays();

document.getElementById('newDateForm').addEventListener('submit', event => {
	event.preventDefault();
	const newDate = document.getElementById('newDate').value;
	let thereIsNoEqualDays = daysD.filter(day => day.date == newDate);
	if (thereIsNoEqualDays.length == 0) {
		const newDay = new Day(newDate);
		let formatedDate = formatDate(newDate, true);
		const body = {
			date: newDate
		};
		processPostNewDay(formatedDate.completeDay.toLowerCase(), body);
		daysD.push(newDay);
		mostrarDiasEnLista(daysD);
	} else {
		console.error('the day is alredy instanciated');
	}
});

function indiceFecha(id) {
	var idFecha = daysD.findIndex(element => {
		return element.date == id;
	});
	return idFecha;
}

function editDia(dia, data) {
	/*daysD[indiceFecha(dia)].sells.forEach(sell => {
		data.forEach(datum => {
			if (sell.newsPaper == datum.newsPaper) {
				console.log(datum)
				sell.quantity = datum.value;
			}
		});
	});*/
	let nuevoDia = daysD[indiceFecha(dia)];
	nuevoDia.calcularVentas();
	daysD[indiceFecha(dia)] = nuevoDia;
	mostrarDiaExtendido(daysD[indiceFecha(dia)]);
}

function deleteday(day) {
	daysD.splice(daysD[indiceFecha(day)], 1);
	document.getElementById('tableSection').innerHTML = '';
	mostrarDiasEnLista(daysD);
}

class Day {
	constructor(date, sells = []) {
		(this.date = date), (this.sells = sells), this.total;
	}

	calcularTotal() {
		let venta = 0,
			ganancia = 0,
			total = 0;
		this.sells.forEach(sell => {
			venta += sell.quantity;
			total += sell.total;
			ganancia += sell.totalEarnings;
		});
		return [venta, total, ganancia];
	}

	calcularVentas() {
		this.sells.forEach(sell => {
			sell.total = Number(sell.quantity * sell.price);
			sell.totalEarnings = Number(sell.earnings * sell.total);
			sell.totalEarnings = Number(sell.totalEarnings.toFixed(2));
		});
	}

	async setNewspapers(day) {
		await processConfig(day.toLowerCase());
		nCofig.forEach(newsPaper => {
			const newItem = new Sell(
				newsPaper.newsPaper,
				0,
				newsPaper.envy,
				newsPaper.price,
				0,
				newsPaper.earnings,
				0
			);
			this.sells.push(newItem);
		});
	}
}
class Sell {
	constructor(
		newsPaper,
		quantity = 0,
		envy = 0,
		price = 0,
		total = 0,
		earnings = 0,
		totalEarnings = 0
	) {
		(this.newsPaper = newsPaper),
			(this.quantity = quantity),
			(this.price = price),
			(this.total = total),
			(this.envy = envy),
			(this.earnings = earnings),
			(this.totalEarnings = totalEarnings);
	}
	devolverVenta() {
		return {
			newsPaper: this.newsPaper,
			quantity: this.quantity,
			price: this.price,
			total: this.total,
			earnings: this.earnings,
			totalEarnings: this.totalEarnings,
			envy: this.envy
		};
	}
}
