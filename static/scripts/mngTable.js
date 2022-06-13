$(document).ready(function() {
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
        for (i = 0; i < info.books.length; i++) {
           let title=info.books[i]['title'];
           let isbn=info.books[i]['isbn13'];
           let price=info.books[i]['price'];
           let image=info.books[i]['image'];
           let url=info.books[i]['url']
           let a = '<tr><td>'+title+'</td><td>'+isbn+'</td><td>'+price+'</td><td><img style="max-width: 3rem" alt="image '+title+'"src="'+image+'"/></td><td><a>'+url+'</a></td></tr>';
           $('#mainTable').append(a);
        }
    }
});