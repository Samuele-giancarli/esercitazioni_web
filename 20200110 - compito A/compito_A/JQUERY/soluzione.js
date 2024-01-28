$(document).ready(
    function(){ /*ricordarsi di mettere funztion dentro al ready*/
        /*$("button").text("bubu");
        semplice test per vedere se funziona*/
        $("button").click(
            function(){ /*function va anche dentro click */
                
                let numberCols = $("input").val();
                if(numberCols <= 12){ /*devo generare una riga di massimo 12 colonne (elementi) */
                let nuovaRiga = $("<div class='row'></div>");

                    for (let i = 0; i < numberCols; i++) {
                        let col = $("<div class='col'><input type='number' value='" + 1 + "' class='form-control'></div>");
                        nuovaRiga.append(col);
                    }

                    let bottoneColonne = $("<button>Genera Colonne</button>");
                    bottoneColonne.click(function(){
                        let inputValues = $(this).prev().find('input').map(function () {
                            return parseInt($(this).val()) || 0;
                        }).get();
                    
                        let somma = inputValues.reduce(function (acc, currentValue) {
                            return acc + currentValue;
                        }, 0);

                        if(somma==12){
                            let rigaGenerata = $("<div class='row'></div>");

                            for (let i = 0; i < numberCols; i++) {
                                let colWidth = inputValues[i];
                                let col = $("<div class='col-" + colWidth + "'></div>");
                                rigaGenerata.append(col);
                            }

                            $(".container-fluid").append(rigaGenerata)
                            $(".col-12 button").next().empty() /* devo farlo qui */
                        }
                    })

                    $("button").next().empty().append(nuovaRiga);
                    $("button").next().append(bottoneColonne)
                }               
            }





            /*
                var nuovaRiga = $("<div class'row'></div>");
                    nuovaRiga.css({
                        display: 'flex',
                        flexWrap: 'nowrap',
                        overflowX: 'auto'
                    });

                    for (let i = 0; i < numberCols; i++) {
                        var inputNumber = $("<input type='number' value='" + i + "'>");
                        inputNumber.css({
                            flex: '1',
                            minWidth: '0'
                        });
                        nuovaRiga.append(inputNumber);
                    }
                    $("button").next().empty().append(nuovaRiga);
            */




            /* qua genero ogni singolo elemento della riga */

                        /*immagino che sicuramente dovrò generare un input */
                        /*let inputColumn = $("<input>").attr({
                            value:i
                        });
                        
                        let nuovaColonna = $("<div></div>").addClass("col").addClass("custom-style");

                        $(inputColumn).append(nuovaColonna);*/










            /*let numeroCols = $("input").val(); /*è val, non text
                for (let i = 0; i < numeroCols; i++) {
                    let inputColonna = $("<input>").attr({
                        type: "number",
                        placeholder: "Col" + (i+1),
                        class: "form-control"
                    })

                    $("button").next().append(inputColonna);
                }

                // Add "Genera Colonne" button
                var generateButton = $("<button>").text("Genera Colonne");
                $(".row:last-child").append(generateButton);*/

            /*
                <div class="container">
                <div class="row">
                <div class="col-md-1">
                <label for="input1">Colonna 1:</label>
                <input type="number" class="form-control" id="input1" name="input1">
                </div>
                <div class="col-md-1">
                <label for="input2">Colonna 2:</label>
                <input type="number" class="form-control" id="input2" name="input2">
                </div>
                <div class="col-md-1">
                <label for="input3">Colonna 3:</label>
                <input type="number" class="form-control" id="input3" name="input3">
                </div>
            */
        )
    }
)