$('.continer').hide();
let JSONsorted = [];
let nowClust = 0;


$('#csvFileInput').change(function(e) {
    var file = e.target.files[0];

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            var jsonData = results.data;
            const groupedData = jsonData.reduce((acc, obj) => {
                if (obj.claster_id !== null) {
                    const key = obj.claster_id;
                    if (!acc[key]) {
                        acc[key] = { claster_id: key, text: [] };
                    }
                    acc[key].text.push(obj.text);
                }
                return acc;
            }, {});
            const result = Object.values(groupedData);
            JSONsorted = result;
            $('.upload').slideUp(300);
            $('.continer').slideDown(300);
            renderClust();
        }
    });
});


function renderClust() {
    $('h3 span').text(nowClust);
    $('tbody').html('');
    let textArr = JSONsorted[nowClust]['text'];
    for (var i = textArr.length - 1; i >= 0; i--) {
        $('tbody').append('<tr><td>' + textArr[i] + '</td></tr>');
    }
}


function goToNextClust() {
    nowClust++;
    renderClust();
}



$('.skip').click(function() {
   goToNextClust()
})




function deb(argument) {
    console.log(argument);
}


$('.upload').click(function() {
    $('input').trigger('click');
})
