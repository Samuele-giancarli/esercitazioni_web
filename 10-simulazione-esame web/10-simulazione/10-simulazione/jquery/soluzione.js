const parola = "appello";
let codificata = "a--+--o";

$(document).ready( /* è la funzione ready a fare funzionare
                      il codice javascript ad ogni
                      caricamento della pagina */
  function(){
    $("span.vinto, span.perso").hide();
    /* utilizzando $(document).ready(){
      il codice viene eseguito anche appena caricato
      e senza aver dato nessun tipo di input
    */
    $("span#parola").html(codificata)
    /* # è per gli id mentre il . per le classi */

    let errori = 0;

    /* ora dentro questa logica posso inserire
       la funzione click del pulsante
    */
   $("button").click(
    function(){
      const lettera = $("input").val();
      /* in questo caso tramite .val sto prendendo
         il valore inserito nell'input text
      */

      /* indexOf ritorna l'indice di partenza di una sottostringa
      in una stringa. se il secondo valore non è specificato
      l'indice di partenza per la ricerca è lo zero
      
      trova unicamente la prima occorrenza

      in caso la sottostringa non venisse trovata ritornerà -1*/  
      if(parola.indexOf(lettera) == -1)
      {
        errori++;
        /* per essere sicuri che
        l'immagine modificata sia quella corretta posso inserire
        più informazioni come per esempio dove l'oggetto
        è inserito $("main div img")
        
        in questo caso nonostante sia corretto non è strettamente
        necessario in quanto c'è una sola immagine*/
        $("img").attr("src", "img/" + errori + ".jpg");
        if(errori == 10){
          $("span.perso").show()
        }
      } else {
        /* in questo caso la sottostringa è stata trovata */
        for (i = 0; i<parola.length -1; i++) {
          if(parola[i]==lettera){
            codificata = replaceAt(codificata, i, lettera);
            $("span#parola").html(codificata);
          }
        }

        if(codificata == parola){
          $("span.vinto").show();
        }
      }
      
      /*   $("button").text(lettera);
        con questa stringa per il debug ho fatto
        in modo che vedessi il valore inserito
        cambiando il testo del pulsante
      */
    }
   )
  }
)

function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}

