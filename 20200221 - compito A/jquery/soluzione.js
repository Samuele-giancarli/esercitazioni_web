function rgb2hex(orig){
    let rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
}

$(document).ready(function(){
    $('main button').click(function(){
        $('main p').text("Caricamento dati in corso...")

        let tabella = $('main table').empty()

        let intestazioni = $('<tr></tr>');
            intestazioni.append('<th>Nome</th>');
            intestazioni.append('<th>Email</th>');
            intestazioni.append('<th>Colore Preferito</th>');
            intestazioni.append('<th>Colore Capelli</th>');
            intestazioni.append('<th>Colore Occhi</th>');
            intestazioni.append('<th>Genere</th>');
            intestazioni.append('<th>Azione</th>')
            tabella.append(intestazioni);

        fetch('sw_a.json').then(response => response.json())
        .then(InformationArray => {

            InformationArray.forEach(character => {
                let riga = $('<tr></tr>')
                let bottone = $('<button>Modifica Riga</button>')

                riga.append('<td>' + character.nome + '</td>');
                riga.append('<td>' + character.email + '</td>');
                
                //let tabellaColore = $('<td></td>').css('background-color', rgb2hex(character.colore_preferito));
                let tabellaColore = $('<td></td>').attr('style', 'background-color: ' + rgb2hex(character.colore_preferito));
                /*sono corretti entrambi allo stesso modo */
                /*continuo a non capire perchè luke e Leila non mostrino il colore */

                riga.append(tabellaColore);
                riga.append('<td>' + character.colore_capelli + '</td>');
                riga.append('<td>' + character.colore_occhi + '</td>');
                riga.append('<td>' + character.genere + '</td>');
                riga.append(bottone)
                tabella.append(riga)

                $('main p').text("Caricamento dei dati avvenuto con successo")

                bottone.click(function () {
                    if (bottone.text() === 'Modifica Riga') {
                        // Cambia il testo del bottone a "Conferma"
                        bottone.text('Conferma');

                        // Per ogni cella nella riga tranne il bottone
                        riga.find('td:not(:last-child)').each(function () {
                            // Salva il testo attuale della cella
                            let testoAttuale = $(this).text();

                            // Sostituisci il testo con un input accessibile
                            let inputType = 'text';

                            if ($(this).index() === 1) {
                                // Se è la cella dell'email, usa un input di tipo "email"
                                inputType = 'email';
                            } else if ($(this).index() === 2) {
                                // Se è la cella del colore preferito, usa un input particolare
                                // (qui assumiamo che il colore preferito sia un codice colore esadecimale)
                                inputType = 'color';
                            }

                            let input = $('<input>')
                                .attr({
                                    type: inputType,
                                    value: testoAttuale
                                });

                            $(this).empty().append(input);
                        });
                    } else if (bottone.text() === 'Conferma') {
                        // Cambia il testo del bottone a "Modifica Riga"
                        bottone.text('Modifica Riga');

                        // Per ogni cella nella riga tranne il bottone
                        riga.find('td:not(:last-child)').each(function () {
                            let inputVal = $(this).find('input').val();
                            $(this).empty().text(inputVal);
                        });

                        // Imposta il colore di sfondo della cella del colore preferito
                        let colorePreferito = riga.find('td:nth-child(3)').text();
                        riga.find('td:nth-child(3)').css('background-color', colorePreferito);
                    }
                });
            });
        })
    })
})