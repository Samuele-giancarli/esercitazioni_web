$(document).ready(function(){
    $(".col-12 button").click(function(){
        let index = $("label input").val();
        if(index <= $(".container-fluid .row").length)
        {
            let selectedRow = $(".container-fluid .row").eq(index);
            /*Dopo aver selezionato tutti gli elementi che corrispondono al selettore,
            il metodo .eq(index) viene utilizzato per ridurre la selezione all'elemento
            situato all'indice specificato. L'indice è fornito da una variabile chiamata index. */

            /*praticamente il selettore seleziona tutti gli elementi dando loro un indice da 0 a N.
            (in questo caso 0 non viene usato perchè è la riga dell'input) e tramite .eq si può andare a ripescare
            l'elemento desiderato tramite indice */
        
            //selectedRow.find("div").css("background-color", "orange");
            let columns = selectedRow.find("[class^='col-']");
            let colNumber = columns.length;
            
            alert(colNumber)

            let newRow = $("<div class='row'></div>");
            for (let i = 0; i<colNumber; i++){
                newRow.append("<input></input>");
            }

            $(".col-12 button").next("div").append(newRow)
            /*anche next() può filtrare il successivo elemento di un determinato tipo, come "div" appunto */
        } else {
            alert("riga inesistente");
        }       
    })
})