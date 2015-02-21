$(document).ready(function () {
    // Näyttää käsikursosin artikkelin päällä
    $('article').css('cursor', 'pointer');

    // Ohjaa oikeaan osoitteeseen artikkelia klikatessa lukemalla data-news_id attribuutin
    $('article').click(function () {
        var id = $(this).data('news_id');
        $(location).attr('href', 'index.php?news_id=' + id);
    });
});