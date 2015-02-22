$(document).ready(function () {
    // Näyttää käsikursorin pääotsikon päällä
    $('h1').css('cursor', 'pointer');

    // Pääotsikkoa klikatessa ohjaa etusivulle
    $('h1').click(function () {
        $(location).attr('href', 'index.php');
    });

    // Asettaa sivualueen korkeuden samaksi pääuutisalueen kanssa 
    $("aside").height($("#news_area").height());

    // Lukee ja palauttaa URL attribuutit
    $.extend({ getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        
        for(var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
            return vars;
        }, getUrlVar: function(name){
            return $.getUrlVars()[name];
        }
    });

    // Jos kuvan lataus epäonnistuu niin tämä yrittää ladata ne uudelleen 4 sekunnin välein enintään 10 kertaa
    var retries = 0;   
    $.imgReload = function() {
        var loaded = 1;
        $("img").each(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                var src = $(this).attr("src");
                var date = new Date();          
                $(this).attr("src", src + "?v=" + date.getTime());
                loaded =0;
            }
        });

        retries +=1;

        if(retries < 10) {
            if(loaded == 0) {
                setTimeout('$.imgReload()', 4000);
            }
        }
    }

    jQuery(document).ready(function() {
        setTimeout('$.imgReload()', 5000);
    });
});