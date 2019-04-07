//CONTROLADOR/////////////////////////////////////////
const days = [];
//CLASE DIA
class Day {
	constructor(date) {
		this.date = date;
		this.sells = [];
		this.total = {
			show: false,
			quantity: 0,
			total: 0,
			earnings: 0
		};
	}
	addItem(item) {
		this.sells.push(item);
	}
	calcularTotal() {
		this.reiniciarTotal();
		if (this.sells.length > 0) {
			this.total.show = true;
			this.sells.forEach(sell => {
				this.total.quantity += sell.quantity;
				this.total.total += sell.total;
				this.total.earnings += sell.earnings;
			});
		} else {
			this.total.show = false;
		}
	}
	reiniciarTotal() {
		this.total.quantity = 0;
		this.total.total = 0;
		this.total.earnings = 0;
	}
}

function enviarNuevoItem(id) {
	const botonEdit = document
		.getElementById(id)
		.getElementsByClassName('btn-info btn rounded-circle')[0];
	const nombre = document.getElementById('nombre').value.toUpperCase();
	const cantidad = Number(document.getElementById('cantidad').value);
	const precio = Number(document.getElementById('precio').value);
	const diaRepetido = days[indiceFecha(id)].sells.filter(sell => sell.name == nombre);
	if (verificarNoComienzaEnNum(nombre)) {
		if (diaRepetido.length == 0) {
			const nuevoItem = {
				name: nombre,
				quantity: cantidad,
				price: precio,
				total: cantidad * precio,
				earnings: (cantidad * precio * 25) / 100
			};
			days[indiceFecha(id)].addItem(nuevoItem);
			showDays(days);
			botonEdit.click();
		} else {
			limpiarNuevoItem();
		}
	} else {
		limpiarNuevoItem();
	}
}

newDateForm.addEventListener('submit', event => {
	event.preventDefault();
	let thereIsNoEqualDays = days.filter(day => day.date == newDate.value);
	if (thereIsNoEqualDays.length == 0) {
		const newDay = new Day(newDate.value);
		days.push(newDay);
		showDays(days);
		containerCN(1, 3, 1, newDate.value).click();
	} else {
		console.error('the day is alredy instanciated');
	}
});

function deleteDay(id) {
	let index = days.findIndex(day => {
		return day.date == id;
	});
	days.splice(index, 1);
}

function indiceFecha(id) {
	var idFecha = days.findIndex(element => {
		return element.date == id;
	});
	return idFecha;
}
function confirmEdit(dia, id, nombre, cantidad, precio) {
	const sell = days[indiceFecha(dia)].sells[id];
	sell.name = nombre;
	sell.quantity = cantidad;
	sell.price = precio;
	sell.total = cantidad * precio;
	sell.earnings = (cantidad * precio * 25) / 100;
	showDays(days);
	edit(dia);
}

function eliminarSell(id, dia) {
	const index = days[indiceFecha(dia)].sells.findIndex(sell => {
		return sell.name == id;
	});
	days[indiceFecha(dia)].sells.splice(index, 1);
}
