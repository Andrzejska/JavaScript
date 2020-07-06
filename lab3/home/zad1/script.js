function Ustaw() {
    document.getElementsByTagName('footer')[0].style.cssText = ` 
    grid-area: footer;
    background-color: #EFF;
    border: 1px solid #A8A8A8;
    box-shadow: 2px 2px 2px black;
    margin: 10px;`
    document.getElementsByTagName('nav')[0].style.cssText = ` 
    grid-area: nav;
    margin-left: 25px;
    margin-right: 25px;
    background-color: #EFF;
    border: 1px solid #A8A8A8;
    box-shadow: 2px 2px 2px black;
    margin: 10px;
    width: 33%;
    height: 35%;
    `
    document.getElementsByTagName('header')[0].style.cssText = `
    grid-area: header;
    background-color: #EFF;
    border: 1px solid #A8A8A8;
    box-shadow: 2px 2px 2px black;
    margin: 10px;`
    document.getElementsByTagName('aside')[0].style.cssText = `
    grid-area: aside;
    background-color: #EFF;
    border: 1px solid #A8A8A8;
    box-shadow: 2px 2px 2px black;
    width: 80%;
    height: 100%;
    margin-left: 20%;`
    document.getElementsByTagName('main')[0].style.cssText = ` grid-area: main;
    background-color: #EFF;
    border: 1px solid #A8A8A8;
    box-shadow: 2px 2px 2px black;
    margin: 10px;
    width: 33%;`
    document.getElementsByClassName('grid-container')[0].style.cssText = `
    display: grid;
    grid-template-areas:
        'header header header header'
        'nav aside aside aside'
        'main main main main'
        'footer footer footer footer';
    background-color: white;
    `
}



function Skasuj() {
    document.getElementsByTagName('footer')[0].style.cssText = ``
    document.getElementsByTagName('header')[0].style.cssText = ``
    document.getElementsByTagName('main')[0].style.cssText = ``
    document.getElementsByTagName('aside')[0].style.cssText = ``
    document.getElementsByTagName('nav')[0].style.cssText = ``
    document.getElementsByClassName('grid-container')[0].style.cssText = ``
}