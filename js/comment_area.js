$(document).ready(function () {
    // Uuden kommentin lähetys painikkeen logiikka
    $("#post_comment_button").click(function () {
        var comment_text = $("#post_comment_text").val();
        var news_id = $.getUrlVar('news_id');

        if (comment_text.length > 9 && comment_text.length < 256) {
            $.ajax({
                type: "post",
                url: "../php/scripts/post_comment.php",
                data: "text=" + comment_text + "&news_id=" + news_id,
                success: function (data) {
                    $("#info_window_message").html(data);
                    $("#info_window").dialog("open");
                }
            });
        } else {
            $("#info_window_message").html("Kommentin minimipituus on 10 merkkiä<br>ja maksimipituus 255 merkkiä");
            $("#info_window").dialog("open");
        }
    });
});