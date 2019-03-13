const newDateForm = document.getElementById('newDateForm');
const newDate = document.getElementById('newDate');

newDateForm.addEventListener('submit', event =>{
    event.preventDefault();
    const diaNuevo = new Day(newDate.value);
    Interfaz.mostrarFormulario
});

class Day{
    /*constructor(date){
        date;
        this.sells = [];
        item = {
            name: '',
            quantity: 0,
            price: 0,
            total: 0,
            earnings: 0
        }
    }

    addItem(item){
        this.sells.push(item);
    }*/

}



