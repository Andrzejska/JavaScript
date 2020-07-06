var worker = new Worker("calculate.js");

function doPointlessComputationsInWorker() {

    function handleWorkerCompletion(message) {
        if (message.data.command == "done") {
            pointlessComputationsButton.disabled = false;
            console.log(message.data.primes);
            worker.removeEventListener("message", handleWorkerCompletion);
        }
    }

    worker.addEventListener("message", handleWorkerCompletion, false);

    worker.postMessage({
        "multiplier": multiplier,
        "iterations": iterations
    });
}