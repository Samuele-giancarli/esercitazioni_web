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
            
            let newRow = $("<div class='row'></div>");
            for (let i = 0; i<colNumber; i++){
                let col = $("<div class='col'><input type='number' value='" + 1 + "' class='form-control'></div>");
                newRow.append(col)
            }

            let modificaRiga = $("<button>Modifica Riga</button>")
            newRow.append(modificaRiga)

            modificaRiga.click(function(){
                let valuesArray = new Array()
                newRow.find("input[type='number']").each(function () {
                    valuesArray.push($(this).val());
                });

                let sum = 0;
                valuesArray.forEach(el => {
                    sum+= parseInt(el, 10) /*sarebbe più corretta metterla direttamente dentro al push
                                            così  valuesArray.push(parseInt($(this).val(), 10));
                                            però serve giusto come dimostrazione di conversione
                                            da elemento array a numero*/
                });

                alert(sum)
            })

            $(".col-12 button").next("div").empty().append(newRow)
            /*anche next() può filtrare il successivo elemento di un determinato tipo, come "div" appunto */
        } else {
            alert("riga inesistente");
        }       
    })
})