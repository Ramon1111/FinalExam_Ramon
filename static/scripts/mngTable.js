$(document).ready(function() {

    $('.sidenav').sidenav();

    //set initial state.

    $('.checkBoxes').change(function() {

        wts=[$('.checkBoxes')[0].checked,$('.checkBoxes')[1].checked,$('.checkBoxes')[2].checked];
        $('#mainTable tbody').children().remove();

        if($('.checkBoxes')[0].checked){
            info1=withAjax('https://api.itbook.store/1.0/search/information');
            iterate(info1);
        }

        //for the second checkbox
        if($('.checkBoxes')[1].checked){
            info2=withAjax('https://api.itbook.store/1.0/search/algorithm');
            iterate(info2);
        }

        //for the second checkbox
        if($('.checkBoxes')[2].checked){
            info3=withAjax('https://api.itbook.store/1.0/search/data');
            iterate(info3);
        }

    });

    function withAjax(url){
        var bookInfo = $.ajax({
             url: url,
             dataType:"json",
             async: false
            }).responseText;
        return JSON.parse(bookInfo);
    }

    function iterate(info) {
        for (i = 0; i < info.books.length; i++)
            toAppend(info);
    }

    //For range prices page
    var slider = document.getElementById('sliderRange');
    noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        step: 1,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
         'min': 0,
         'max': 110
        },
        format: wNumb({
         decimals: 0
        }),
        tooltips: [
            wNumb({decimals: 2}), // tooltip with custom formatting
            wNumb({decimals: 2}) // tooltip with custom formatting
        ],
    });

    slider.noUiSlider.on('change', function () {

        var forSlider1=withAjax('https://api.itbook.store/1.0/search/information');
        var forSlider2=withAjax('https://api.itbook.store/1.0/search/algorithm');
        var forSlider3=withAjax('https://api.itbook.store/1.0/search/data');

        $('#mainTable tbody').children().remove();

        forSliderAjax(forSlider1)
        forSliderAjax(forSlider2)
        forSliderAjax(forSlider3)

        console.log(slider.noUiSlider.get()[0]);
    });

    function forSliderAjax(forSlider){

        var min = slider.noUiSlider.get()[0];
        var max = slider.noUiSlider.get()[1];

        for (i = 0; i < forSlider.books.length; i++) {
            let price = parseInt(forSlider.books[i]['price'].substring(1));
            if (price >= min && price <= max)
                toAppend(forSlider);
        }
    }

    function toAppend(jsonObj){
        let title=jsonObj.books[i]['title'];
        let isbn=jsonObj.books[i]['isbn13'];
        let price2=jsonObj.books[i]['price'];
        let image=jsonObj.books[i]['image'];
        let url=jsonObj.books[i]['url']
        let a = '<tr><td>'+title+'</td><td>'+isbn+'</td><td>'+price2+'</td><td><img style="max-width: 3rem" alt="image '+title+'"src="'+image+'"/></td><td><a href="'+url+'" target="_blank">'+url+'</a></td></tr>';
        $('#mainTable').append(a);
    }
});