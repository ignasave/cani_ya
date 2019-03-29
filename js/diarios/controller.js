var daysD = [];
var newsPapers = [
    'CAPITAL',
    'CLARIN',
    'OLE',
    'PERFIL',
    'CRONISTA',
    'NACION',
    'ATLANTICO',
    'CRONICA',
    'AMBITO',
    'PAGINA 12',
    'EL DIA',
    'POPULAR',
    'EL PLATA',
    'DE TODO',
];

document.getElementById('newDateForm').addEventListener('submit',
    (event)=>{
        event.preventDefault();
        const newDate = document.getElementById('newDate').value;
        let thereIsNoEqualDays = daysD.filter(day => day.date == newDate);
        if (thereIsNoEqualDays.length == 0) {
            const newDay = new Day(newDate);
            newDay.setNewspapers(newDay.date);
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

function getDayBeforeDefaultParams(id, newsPaper){
    dayBefore =  daysD[indiceFecha(id) + 1];
    if(dayBefore){
        dayBeforeNewsPaper = dayBefore.sells.filter( sell => sell.newsPaper == newsPaper);
        const envy = dayBeforeNewsPaper[0].envy;
        const price = dayBeforeNewsPaper[0].price;
        return [envy,price];
    }
    else {
        return null;
    }
}

function editDia(dia, data){
    daysD[indiceFecha(dia)].sells.forEach(sell =>{
        data.forEach(datum => {
            if(sell.newsPaper == datum.newsPaper){
                sell.quantity = datum.value;
            }
        })
    });
    mostrarDiaExtendido(daysD[indiceFecha(dia)]);
}
class Day{
    constructor(date, sells = []){
        this.date = date,
        this.sells = sells,
        this.total
    }

    calcularTotal(){
        let venta = 0,
            ganancia = 0,
            total = 0;
        this.sells.forEach( sell => {
            venta += sell.quantity;
            total += sell.total;
            ganancia += sell.earnings;
        });
        return [venta,total,ganancia];
    }

    setNewspapers(id){
        newsPapers.forEach(newsPaper => {
            const params = getDayBeforeDefaultParams(id, newsPaper);
            let newItem;
            if(params){
                newItem = new Sell(newsPaper, 0, params[0], params[1], 0, 0);
            }else{
                newItem = new Sell(newsPaper);
            }
            this.sells.push(newItem);
        })
    }
}



class Sell{
    constructor(newsPaper, quantity = 0,envy = 0, price = 0, total = 0, earnings = 0 ){
        this.newsPaper = newsPaper,
        this.quantity = quantity,
        this.price = price,
        this.total = total,
        this.envy = envy,
        this.earnings = earnings
    }
    devolverVenta(){
        return {
            newsPaper: this.newsPaper,
            quantity: this.quantity,
            price: this.price,
            total: this.total,
            earnings: this.earnings,
            envy: this.envy,
        }
    }
}
