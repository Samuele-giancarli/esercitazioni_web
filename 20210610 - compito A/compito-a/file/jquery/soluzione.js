$(document).ready(function() {
    $("div button").click(function() {
        // Fetch dei dati
        fetch('data.json')
            .then(response => response.json())
            .then(informationArray => {
                let mainTag = $('main');

                informationArray.data.forEach(pokemon => {
                    // Creazione del div per ogni elemento
                    let div = $('<div>');

                    // Creazione dell'elenco non ordinato
                    let ul = $('<ul>');
                    ul.append(`<li>ID: ${pokemon.id}</li>`);
                    ul.append(`<li>Nome: ${pokemon.name}</li>`);
                    ul.append(`<li>Tipo: ${pokemon.type.join(', ')}</li>`);

                    // Creazione dei bottoni Up e Down
                    let buttonUp = $('<button>').text('Up');
                    let buttonDown = $('<button>').text('Down');

                    // Aggiunta di eventi click per i bottoni
                    buttonUp.click(function() {
                        div.insertBefore(div.prev());
                    });

                    buttonDown.click(function() {
                        div.insertAfter(div.next());
                    });

                    // Aggiunta dell'elenco e dei bottoni al div
                    div.append(ul, buttonUp, buttonDown);

                    // Aggiunta del div al tag main
                    mainTag.append(div);
                });
            })
            .catch(error => console.error('Errore nel recupero dei dati JSON:', error));
    })
});
