$('.continer, .results').hide();
let JSONsorted = [];
var nowClust = 0;

var ResultCopy = 0;

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
        $('ul.createInt').append('<li>' + createIntent[i] + ' <button clID = "' + createIntent[i] + '">Просмотреть</button></li>')
    }
    for (var i = addNewIntent.length - 1; i >= 0; i--) {
        $('ul.editInt').append('<li>' + addNewIntent[i] + ' <button clID = "' + addNewIntent[i] + '">Просмотреть</button></li>')
    }
    $('.rend_lst tbody').html(' ');
}


function goToNextClust() {
    nowClust++;
    renderClust();
    console.log("nowClust = " + nowClust)
}


$('.skip').click(function() {
 goToNextClust()
})


$(document).keydown(function(event) {
  if (event.which === 39) {
     goToNextClust()
 }
});



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

$('.jumpClust').click(function() {
    nowClust = $('.inputJumpClust').val() - 1
    goToNextClust();
})


$("body").on("click", ".results ul button", function () {
    getResultCopy($(this).attr('clID'))
})


function getResultCopy(idsRes) {
    ResultCopy = idsRes;
    $('.rend_lst tbody').html(' ');
    let textArr = JSONsorted[idsRes]['text'];
    for (var i = textArr.length - 1; i >= 0; i--) {
        $('.rend_lst tbody').append('<tr><td>' + textArr[i] + '</td></tr>');
    }
}

$('.copyClastCP').click(function() {
    copyClastCP();
})



$('button[clid]').click(function() {

})


$("body").on("click", ".results ul button", function () {
    $('.results ul button').each(function() {
        $(this).removeClass('activeBTN');
    })
    $(this).addClass('activeBTN');
})


function copyClastCP() {
    const textBeforeResult = 'Кластер #' + ResultCopy;
    const tableText = $('.rend_lst tbody tr').map(function() {
        return $(this).find('td').text();
    }).get().join('\n'); 
    const finalText = `${textBeforeResult}\n\n${tableText}`;
    const $temp = $('<textarea>').val(finalText).appendTo('body').select();
    document.execCommand('copy');
    $temp.remove();
    notification("Скопированно")
}


function notification(notyText) {
    $('.noty').text(notyText).addClass('active')
    setTimeout(function() {
        $('.noty').removeClass('active');
    }, 1000);
}