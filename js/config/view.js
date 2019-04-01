function mostrarDiarios(datos, dia){
    const table = document.getElementById('containerDiariosConfig');
    table.innerHTML = '';
    datos.forEach( newsPaper => {
        table.innerHTML += `
        <tr id="${newsPaper.newsPaper}">
            <th scope="row">${newsPaper.newsPaper}</th>
            <td>${newsPaper.envy}</td>
            <td>${newsPaper.price}</td>
            <td>${newsPaper.earnings}</td>
            <td >
            <button class="btn-info btn rounded-circle" onclick="editView('${dia}','${newsPaper.newsPaper}')">
                <i class="fas fa-pen"></i>
            </button>
          </td>
          <td>
            <button class="btn-danger btn rounded-circle" onclick="">
                <i class="fas fa-times"></i>
            </button>
        </tr>
        `;
    })
}

function editView(dia, newsPaperName){
    const indexOfNewsPaperInDay = config.days[dia].findIndex(day => {
        return day.newsPaper === newsPaperName;
    });
    const DiarioChoosen = config.days[dia][indexOfNewsPaperInDay];
    const element = document.getElementById(newsPaperName);
    element.innerHTML = `
        <th scope="row">
            <input type="text" class="form-control pill" value="${DiarioChoosen.newsPaper}">
        </th>
        <td>
            <input type="number" class="form-control pill" value="${DiarioChoosen.envy}">       
        </td>
        <td>
            <input type="number" class="form-control pill" value="${DiarioChoosen.price}">
        </td>
        <td>
            <input type="number" class="form-control pill" value="${DiarioChoosen.earnings}">       
        </td>
        <td >
        <button class="btn-success btn rounded-circle" onclick="confirmEditView('${dia}','${newsPaper.newsPaper}')">
            <i class="fas fa-check"></i>
        </button>
        </td>
        <td>
        <button class="btn-danger btn rounded-circle" onclick="">
            <i class="fas fa-times"></i>
        </button>
    `;

}

function confirmEditView(dia, newsPaperName){
    
}