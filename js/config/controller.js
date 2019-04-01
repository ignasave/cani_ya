var config = {
    days : [
        domingo = [
            {
                newsPaper : 'CAPITAL',
                envy : 0,
                price : 30,
                earnings : 0.5
            },
            {
                newsPaper : 'CLARIN',
                envy : 7.50,
                price : 90,
                earnings : 0.3
            },
            {
                newsPaper : 'OLE',
                envy : 5,
                price : 45,
                earnings : 0.3
            },
            {
                newsPaper : 'PERFIL',
                envy : 6,
                price : 100,
                earnings : 0.6
            },
            {
                newsPaper : 'CRONISTA',
                envy : 4,
                price : 53,
                earnings : 0.5
            }
            ],
        lunes = [
            {
                newsPaper : 'CAPITAL',
                envy : 0,
                price : 30,
                earnings : 0.5
            },
            {
                newsPaper : 'CLARIN',
                envy : 7.50,
                price : 77,
                earnings : 0.3
            },
            {
                newsPaper : 'OLE',
                envy : 5,
                price : 35,
                earnings : 0.3
            },
            {
                newsPaper : 'PERFIL',
                envy : 6,
                price : 67,
                earnings : 0.6
            },
            {
                newsPaper : 'CRONISTA',
                envy : 4,
                price : 5,
                earnings : 0.5
            }

        ],
        martes = [
            {
                newsPaper : 'CAPITAL',
                envy : 0,
                price : 30,
                earnings : 0.5
            },
            {
                newsPaper : 'CLARIN',
                envy : 7.50,
                price : 77,
                earnings : 0.3
            },
            {
                newsPaper : 'OLE',
                envy : 5,
                price : 35,
                earnings : 0.3
            },
            {
                newsPaper : 'PERFIL',
                envy : 6,
                price : 67,
                earnings : 0.6
            },
            {
                newsPaper : 'CRONISTA',
                envy : 4,
                price : 5,
                earnings : 0.5
            }
        ],
        miercoles = [
            {
                newsPaper : 'CAPITAL',
                envy : 0,
                price : 30,
                earnings : 0.5
            },
            {
                newsPaper : 'CLARIN',
                envy : 7.50,
                price : 77,
                earnings : 0.3
            },
            {
                newsPaper : 'OLE',
                envy : 5,
                price : 95,
                earnings : 0.3
            },
            {
                newsPaper : 'PERFIL',
                envy : 6,
                price : 37,
                earnings : 0.6
            },
            {
                newsPaper : 'CRONISTA',
                envy : 4,
                price : 5,
                earnings : 0.5
            }
        ],
        jueves = [
            {
                newsPaper : 'CAPITAL',
                envy : 0,
                price : 30,
                earnings : 0.5
            },
            {
                newsPaper : 'CLARIN',
                envy : 7.50,
                price : 77,
                earnings : 0.3
            },
            {
                newsPaper : 'OLE',
                envy : 5,
                price : 35,
                earnings : 0.3
            },
            {
                newsPaper : 'PERFIL',
                envy : 6,
                price : 67,
                earnings : 0.6
            },
            {
                newsPaper : 'CRONISTA',
                envy : 4,
                price : 5,
                earnings : 0.5
            }
        ],
        viernes = [
            {
                newsPaper : 'CAPITAL',
                envy : 0,
                price : 30,
                earnings : 0.5
            },
            {
                newsPaper : 'CLARIN',
                envy : 7.50,
                price : 77,
                earnings : 0.3
            },
            {
                newsPaper : 'OLE',
                envy : 5,
                price : 35,
                earnings : 0.3
            },
            {
                newsPaper : 'PERFIL',
                envy : 6,
                price : 67,
                earnings : 0.6
            },
            {
                newsPaper : 'CRONISTA',
                envy : 4,
                price : 5,
                earnings : 0.5
            }
        ],
        sabado = [
            {
                newsPaper : 'CAPITAL',
                envy : 0,
                price : 30,
                earnings : 0.5
            },
            {
                newsPaper : 'CLARIN',
                envy : 7.50,
                price : 77,
                earnings : 0.3
            },
            {
                newsPaper : 'OLE',
                envy : 5,
                price : 35,
                earnings : 0.3
            },
            {
                newsPaper : 'PERFIL',
                envy : 6,
                price : 67,
                earnings : 0.6
            },
            {
                newsPaper : 'CRONISTA',
                envy : 4,
                price : 5,
                earnings : 0.5
            }
        ]
    ]
}

class newsPaper{
    constructor(){

    }

}

window.onload = function() {
    mostrarDiarios(config.days[0], 0);
};

function changedata(day){
    mostrarDiarios(config.days[day], day)
}


