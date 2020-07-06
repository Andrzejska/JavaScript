var Numbers = [0];
var myStrings = " How are you doing today";
var Strings = myStrings.split(" ");
var i = 0;
var Colors = ['#C0392B', '#AF7AC5', '#5DADE2', '#73C6B6', '#82E0AA', '#F7DC6F', '#E59866', '#B2BABB', '#34495E']

function addNumber() {
    number = document.forms['enter-number']['inputN'].value
    if (number <= 0) {
        window.alert('Sorry but your number is wrong');
        return;
    }
    Numbers.push(number);
    Visualize(Numbers);
}



function Visualize(array) {
    var canvas = document.getElementById('library')
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var sum = 0;

    if (typeof (array[0]) === 'number') {
        for (i = 0; i < array.length; i++) {
            sum += parseInt(array[i]);
        }
    }

    if (typeof (array[0]) === 'string') {
        for (i = 0; i < array.length; i++) {
            sum = sum + array[i].length;
        }
        console.log("hello")
    }
    console.log(typeof (array[0]));
    var previous = 0;
    for (i = 0; i < array.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = Colors[i % Colors.length];
        ctx.moveTo(100, 100);
        var compare = 0;
        if (typeof (array[0]) === 'number') {
            console.log("hello");
            compare = parseInt(array[i]);
        }
        if (typeof (array[0]) === 'string') compare = array[i].length;
        ctx.arc(100, 100, 50, previous, (previous + ((Math.PI * 2) * (compare / sum))));
        ctx.lineTo(100, 100);
        previous = (previous + ((Math.PI * 2) * (compare / sum)));
        console.log(compare / sum);
        ctx.stroke();
        ctx.fill();
    }

    var Text = "";
    for (i = 1; i < array.length; i++) {
        if (typeof (array[0]) === 'number') compare = parseInt(array[i]);
        if (typeof (array[0]) === 'string') compare = array[i].length;
        Text += "<div id=\"hello\">" + "-- " + array[i] + " --> " + Math.round((compare / sum) * 100 * 100) / 100 + " percent of All Elements" + "<div style=\"width:10px;height:15px;border:1px solid #000;float:left;background:" + Colors[i] +
            "\"></div>" + "</br>" + "</div>";
    }
    Text += "</br>" + "Sum of all elements --> " + sum;
    document.getElementById('demo').innerHTML = Text;
}
Visualize(Strings);