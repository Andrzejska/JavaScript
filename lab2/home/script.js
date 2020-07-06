//(tekst pojawiasie w prompt box/required),(default tekst/optional)    
var geter = window.prompt("Tekst1", "Tekst2");
console.log(geter);
console.log(typeof geter);
//Wprowadzeniu wartości będącej liczbą i naciśnięciu klawisza 'Enter' lub przycisku 'OK' 1 string
//Wprowadzeniu wartości będącej napisem i naciśnięciu klawisza 'Enter' lub przycisku 'OK'asdf string
//Niewprowadzeniu wartości i naciśnięciu powyższego klawisza / przycisku tekst1 string
//Wprowadzeniu wartości i naciśnięciu przycisku 'Anuluj' null object
function myFunction() {
    var x = document.getElementById("myForm").elements[0].value;
    document.getElementById("enter").innerHTML = x;
    console.log(x);
    console.log(typeof (x));
}
//Wprowadzeniu wartości będącej liczbą i naciśnięciu powyższego przycisku 1 string
//Wprowadzeniu wartości będącej napisem i naciśnięciu w/w przycisku asdf string
//Niewprowadzeniu wartości i naciśnięciu przycisku "Wypisz" "" string