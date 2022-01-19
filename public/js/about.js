window.addEventListener("load" ,function() {
    const bodyHorarioTransmision = document.querySelector("#bodyHorarioTransmision");
    const bodyHorarioTransmisionPe = document.querySelector("#bodyHorarioTransmision-pe");
    const horarios = [
        {dia: 'Lunes', inicio: '7:00 a.m.', fin: '8:00 p.m'},
        {dia: 'Martes', inicio: '7:00 a.m.', fin: '8:00 p.m'},
        {dia: 'Miercoles', inicio: '7:00 a.m.', fin: '8:00 p.m'},
        {dia: 'Jueves', inicio: '7:00 a.m.', fin: '8:00 p.m'},
        {dia: 'Viernes', inicio: '7:00 a.m.', fin: '8:00 p.m'},
        {dia: 'Sabado', inicio: '7:00 a.m.', fin: '8:00 p.m'},
        {dia: 'Domingo', inicio: '7:00 a.m.', fin: '2:00 p.m'}
    ];
    
    const programasEspeciales = [
        {
            hora: '8.00 a.m.',
            lunes: 'Es tiempo de volver a casa',
            martes: 'Voz a la conciencia',
            miercoles: 'Voz del que clama en el desierto',
            jueves: 'El Shaddai',
            viernes: 'El Shaddai',
            sabado: 'Sembrando la buena semilla',
            domingo: 'Niños joyas de Cristo'
        },
        {
            hora: '10.00 a.m.',
            lunes: 'Cristo dulce Nombre sin igual',
            martes: 'Restaurando familias',
            miercoles: 'Ministerio evangelistico las Buenas Nuevas',
            jueves: 'Cristo es la respuesta',
            viernes: 'Volviendo a las sendas antiguas',
            sabado: 'Extendiendo el Reino',
            domingo: ''
        },
        {
            hora: '12.00 p.m.',
            lunes: '',
            martes: '',
            miercoles: '',
            jueves: '',
            viernes: '',
            sabado: 'Preparandonos para su cosecha',
            domingo: ''
        },
        {
            hora: '2.00 p.m.',
            lunes: 'Voz de alerta',
            martes: 'Voz de alerta Pastor Eulalio Dominguez',
            miercoles: 'Voz de alerta',
            jueves: 'Voz de alerta Pastor Eulalio Dominguez',
            viernes: 'Voz de alerta',
            sabado: '',
            domingo: ''
        },
        {
            hora: '5.00 p.m.',
            lunes: 'Siguiendo los pasos del maestro',
            martes: '',
            miercoles: '',
            jueves: '',
            viernes: 'Jesucristo pronto viene',
            sabado: '',
            domingo: ''
        }
    ];


    horarios.forEach((horario) => {
        const fila = document.createElement('tr');
        fila.classList.add("fila-header-body");
        fila.innerHTML = `
            <td class='celda-horario-body'>${horario.dia}</td>
            <td class='celda-horario-body'>${horario.inicio}</td>
            <td class='celda-horario-body'>${horario.fin}</td>
        `;
        bodyHorarioTransmision.appendChild(fila);
    });

    programasEspeciales.forEach((programacion) => {
        const fila = document.createElement('tr');
        fila.classList.add("fila-header-body");
        const columnas = Object.keys(programacion).reduce((acumulador, columna) => {
            acumulador += (programacion[`${columna}`] === '') ?
                `<td class='celda-horario-body-pe'>${programacion[`${columna}`]}</td>` :
                `<td class='celda-horario-body-pe bg-white-75'>${programacion[`${columna}`]}</td>`;
                return acumulador;
        }, '');
        fila.innerHTML = columnas;
        bodyHorarioTransmisionPe.appendChild(fila);
    });

});
