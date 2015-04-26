#KaupunkiUutiset
<b>Hamk 2015 - Web-kehitys projekti</b>

<i>Jouni Hyttinen ja Teemu Hellas</i>

Kuvitteellinen nettiuutissivusto

<b>Web-palvelin:</b><br>
GearHost<br>
http://kaupunkiuutiset.gear.host

<b>Kehitysalusta:</b><br>
WebMatrix 3

<b>Versionhallintaohjelmisto:</b><br>
GitHub

<b>Käytetyt tekniikat:</b><br>
Paint Shop Pro X6 - sivuston hahmottelu<br>
HTML5 - sivuston runko<br>
CSS 3.0 - tyylit<br>
jQuery - Client-puolen koodi<br>
AJAX - Client-Server keskustelu keskenään<br>
PHP - Serveri-puolen koodi<br>
MySQL - tietokanta

<b>Testatut toimivaksi selaimilla:</b><br>
Google Chrome Mobile<br>
Google Chrome - v40<br>
Internet Explorer - 11<br>
Mozilla Firefox - v36

<b>Ominaisuudet:</b><br>
Käyttäjien rekisteröiminen ja kirjautuminen<br>
Admin oikeuksilla mahdollisuus lähettää järjestelmään uusia uutisia<br>
(saa kun käyttäjä rekisteröi käyttämällä salasanaa "hamk2015")<br>
Uutisten hakeminen tietokannasta ja järjestely uusimpien / luetuimpien / aihealueen mukaan<br>
Kommenttien kirjoittaminen uutisiin mikäli on kirjautuneena sisään<br>
Responsiivinen design toteutettu aina 250px leveyteen asti<br>
Lisätty mahdollisuus unohtuneen salasanan lähettämiseen käyttäjän sähköpostiin<br>
(mikäli sellainen on määritelty rekisteröityessä)<br>
Mahdollista muokata omia profiilin tietoja rekisteröitymisen jälkeen<br>
Mahdollista muokata myös uutista jälkikäteen<br> 
(pitää avata muokattava uutinen auki, jonka jälkeen profiili-ikkunaan tulee näkyviin uutisen muokkausnappi mikäli käyttäjä on Admin)

<b>Mitä olisi vielä ollut mukava toteuttaa:</b><br>
Käyttäjän syötteiden sanitointi ja validointi on hieman alkeellista, jQueryn puolella lähinnä tarkastellaan syötteiden pituutta ja php:n puolella poistetaan muutamia merkkejä jotka aiheuttavat ongelmia MySQL-tietokantaan lähetettäessä. Paljon muuta olisi sillä saralla voinut toteuttaa jos olisi viitsimistä ja aikaa ollut. Lisäksi kaikki MySQL-kutsut on toteutettu mysqli:n proseduraalisilla käskyillä, tietoturvan kannalta olisi ollut järkevämpää käyttää olio-ohjelmoinnin mukaisia käskyjä jotka on huomattavasti hankalempia mahdollisten hakkereiden hyväksikäyttää.

<b>PS.</b> kaikkiiin ominaisuuksiin pääsee käsiksi siis klikkaamalla oikealla yläkulmassa näkyvää profiilin nimeä. Tästä aukeaa profiili-ikkuna jossa on painikkeet muihin toimintoihin kuten profiilin muokkaukseen, uusien uutisten lähetykseen (jos käyttäjä on admin) ja uutisen muokkaukseen (jos käyttäjä on admin ja haluttu muokattava uutinen on avattuna kokonaan). Tämä lisä selvennyksenä sen takia että ei jää epäselväksi kuinka sivustoa käytetään.
