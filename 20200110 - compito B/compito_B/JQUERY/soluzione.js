$(document).ready(function(){
    $(".col-12 button").click(function(){
        var index = $("label input").val();
        if(index <= $(".container-fluid .row").length)
        {
            var selectedRow = $(".container-fluid .row").eq(index);
            /*Dopo aver selezionato tutti gli elementi che corrispondono al selettore,
            il metodo .eq(index) viene utilizzato per ridurre la selezione all'elemento
            situato all'indice specificato. L'indice è fornito da una variabile chiamata index. */

            /*praticamente il selettore seleziona tutti gli elementi dando loro un indice da 0 a N.
            (in questo caso 0 non viene usato perchè è la riga dell'input) e tramite .eq si può andare a ripescare
            l'elemento desiderato tramite indice */
        
            selectedRow.find("div").css("background-color", "orange");
        } else {
            alert("riga inesistente");
        }       
    })
})