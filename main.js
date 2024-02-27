$('.continer, .results').hide();
let JSONsorted = [];
let nowClust = 0;

let createIntent = [];
let addNewIntent = [];


$('#csvFileInput').change(function(e) {
    var file = e.target.files[0];

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            var jsonData = results.data;
            // console.log(jsonData);
            const groupedData = jsonData.reduce((acc, obj) => {
                if (obj.cluster_ids !== null) {
                    const key = obj.cluster_ids;
                    if (!acc[key]) {
                        acc[key] = { cluster_ids: key, text: [] };
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
    $('h3 span.nowClust').text(nowClust);
    $('.allCls').text(JSONsorted.length - 1)
    $('tbody').html('');
    let textArr = JSONsorted[nowClust]['text'];
    for (var i = textArr.length - 1; i >= 0; i--) {
        $('tbody').append('<tr><td>' + textArr[i] + '</td></tr>');
    }
    if (JSONsorted.length - 1 == nowClust) {
        goToResult();
    }
}



function goToResult() {
    $('.continer').slideUp(300);
    $('.results').slideDown(300);

    for (var i = createIntent.length - 1; i >= 0; i--) {
        $('ul.createInt').append('<li>' + createIntent[i] + '</li>')
    }
    for (var i = addNewIntent.length - 1; i >= 0; i--) {
        $('ul.editInt').append('<li>' + addNewIntent[i] + '</li>')
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


function createIntentFun() {
    createIntent.push(nowClust);
}
function addNewIntentFun() {
   addNewIntent.push(nowClust);
}



$('.new').click(function() {
    createIntentFun();
    goToNextClust();
})
$('.update').click(function() {
    addNewIntentFun();
    goToNextClust();
})

$('.endNow').click(function() {
    goToResult();
})