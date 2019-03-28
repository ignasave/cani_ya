daysD = [];

document.getElementById('newDateForm').addEventListener('submit',
    (event)=>{
        event.preventDefault();
        const newDate = document.getElementById('newDate').value;
        let thereIsNoEqualDays = daysD.filter(day => day.date == newDate);
        if (thereIsNoEqualDays.length == 0) {
            const newDay = new Day(newDate);
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

class Day{
    constructor(date){
        this.date = date,
        this.sells = []
        this.total
    }


}

class Sell{
    constructor(newsPaper, quantity, price, total){
        this.newsPaper = newsPaper,
        this.quantity = quantity,
        this.price = price,
        this.total = total
    }
    devolverVenta(){
        return {
            newsPaper: this.newsPaper,
            quantity: this.quantity,
            price: this.price,
            total: this.total,
        }
    }
}

let venta = new Sell('CLARIN', 1, 1, 1);