const apiUrl = 'http://localhost:8081/api';


const maxRequestNumber = Math.floor(Math.random() * (3) + 1);
const $countBar = $('.count-bar');
$countBar.css('width', '0px')
const progressWidth = parseInt($('.progress').css('width').slice(0, -2));
const inc = progressWidth / maxRequestNumber;

console.log("Progress width is " + $('.progress').css('width'))
const $searchInput = $('#search');
$searchInput.on('submit', async (e) => {
    e.preventDefault();
    $('#result').html('');
    const identifier = $("#search input[name='identifier']").val();

    const response = await fetch(`${apiUrl}/${encodeURIComponent(identifier)}`);
    const data = await response.json();
    const curProgress = parseInt($countBar.css('width').slice(0, -2));
    $countBar.css('width', `${curProgress + inc}px`);

    if ($('.progress').css('width') === `${curProgress + inc}px`) {
        $searchInput.off('submit');
        $searchInput.hide();
    }


    for (let [key, value] of Object.entries(data)) {
        $('#result').append(
            `<tr>
        <td>${key}</td>
        <td>${value}</td>
        </tr>`
        );
    }
});