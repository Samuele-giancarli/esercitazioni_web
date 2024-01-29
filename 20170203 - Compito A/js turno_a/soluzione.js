$(document).ready(function(){
    // Nascondi gli elenchi che non sono di primo livello
    $('ul ul').hide();

    // Gestisci il click sulle voci di menu
    $('li').click(function(e){
        e.stopPropagation(); // Impedisci la propagazione del click ai livelli superiori

        var $submenu = $(this).find('> ul');

        if($submenu.length > 0) {
            // Mostra o nascondi il menu secondario con effetto di scorrimento
            $submenu.slideToggle();

            // Aggiorna l'ultima voce selezionata
            var lastSelected = getHierarchyText($(this));
            $('main p span').text(lastSelected);
        } else {
            // Se la voce non contiene un ulteriore elenco, aggiorna l'ultima voce selezionata
            var lastSelected = getHierarchyText($(this));
            $('main p span').text(lastSelected);
        }
    });

    // Funzione per ottenere il testo della gerarchia della voce cliccata
    function getHierarchyText($element) {
        var hierarchyText = [];
        $element.parents('li').each(function(){
            var text = $(this).children('a').text();
            hierarchyText.push(text);
        });
        hierarchyText.reverse();
        return hierarchyText.join(' - ');
    }
});
