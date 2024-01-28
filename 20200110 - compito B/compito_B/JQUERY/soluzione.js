$(document).ready(function(){
    $(".col-12 button").click(function(){
        var index = $("label input").val();
        var selectedRow = $(".container-fluid .row").eq(index);
        selectedRow.find("div").css("background-color", "orange");
    })
})