function rgb2hex(orig){
    let rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
}

$(document).ready(function(){
    let provvisoria = $('main')

    fetch('sw_a.json').then(response => response.json())
    .then(InformationArray => {
        InformationArray.data
        .forEach(character => {
            provvisoria.append('<label>${character.id}</label>');
        })
    })
})