function decrementStart() {
    var number = document.getElementsByTagName('form')[0].querySelector("input[name='numberValue']").value;
    var spans = document.getElementsByTagName('span');
    var i = 0;
    var tmp = number;
    window.setInterval(function () {
        if (tmp > 0) {
            var newSpan = document.createElement("span");
            var newContent = document.createTextNode(`${tmp--}`);
            newSpan.appendChild(newContent);
            document.body.insertBefore(newSpan, spans[i])
            document.body.removeChild(spans[(i + 1)]);
            spans = document.getElementsByTagName('span');
            console.log(spans[i % spans.length]);
            i = (i + 1) % spans.length;
        } else {}
    }, 1000)
}

const template = document.createElement('template');


class Input extends HTMLElement {
    constructor() {

        super();
        this._shadowRoot = this.attachShadow({
            'mode': 'open'
        });
        var newSpan = document.createElement("span");
        var newContent = document.createTextNode(0);
        this._shadowRoot.appendChild(newContent);

    }

    decrement(number) {
        this._shadowRoot.textContent = ""
        var newSpan = document.createElement("span");
        var newContent = document.createTextNode(number--);
        this._shadowRoot.appendChild(newContent);
    }

}

window.customElements.define("my-span", Input);

function decrementStartComponent() {
    var number = document.getElementsByTagName('form')[1].querySelector("input[name='numberValueComp']").value;
    var spans = document.getElementsByTagName('my-span');
    var i = 0;
    window.setInterval(function () {
        if (number > 0) {
            spans[i].decrement(number--);
            i = (i + 1) % spans.length;
        }

    }, 1000)
};