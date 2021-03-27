
$(document).ready(function () {
    // Define currency codes
    'use strict';
    const bitcoin = "Qwsogvtv82FCd"
    const etherium = "razxDUgYGNAdQ"
    const litecoin = "D7B1x_ks7WhV5"
    var uuid = "Qwsogvtv82FCd";
    // Define timeframe codes
    const yearly = "1y";
    const monthly = "30d";
    const weekly = "7d";
    const daily = "24h";
    var time = "24h";
    var currencyName = "Bitcoin"
    // Define empty chart globally, then call getCoinData to populate default chart (btc)
    let myChart;
    getCoinData(uuid, time);

    // Timeframe selector
    $('input:radio[name=options]').on("click", function () {
        if (time != $("input[name=options]:checked").val()) {
            time = $("input[name=options]:checked").val();
            console.log(time);
            ggGoNext();
            getCoinData(uuid, time);
        }
    })

    // Currency type selector
    $('#cryptoList').change(function () {
        var selectedValueCurrency = parseInt($(this).val());
        ggGoNext();
        //Depends on Value 0-2 respective function gets called. 
        switch (selectedValueCurrency) {
            case 0:
                console.log("radio btc success");
                $("#currency").text("Bitcoin");
                uuid = bitcoin;
                getCoinData(uuid, time);
                break;
            case 1:
                console.log("radio eth success");
                $("#currency").text("Etherium");
                uuid = etherium;
                getCoinData(uuid, time);
                break;
            case 2:
                console.log("radio ltc success");
                $("#currency").text("Litecoin");
                uuid = litecoin;
                getCoinData(uuid, time);
        }
    });

    function getCoinData(currency, timeframe) {
        console.log("getCoinData Success");
        var baseUrl = "https://api.coinranking.com/v2/coin/" + currency + "?timePeriod=" + timeframe;
        var proxyUrl = "https://cors-anywhere.herokuapp.com/";
        var apiKey = "coinrankingc0b595008db85657a50d4082f20ff1ab68d03f2b78445fb8"
        fetch(`${proxyUrl}${baseUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-My-Custom-Header': `${apiKey}`,
                'Access-Control-Allow-Origin': "*"
            }
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((json) => {
                        console.log("getCoinDataResponse Success");
                        handlerFunctionA(json.data);
                    })
                }
            })
    }
    function handlerFunctionA(data) {
        console.log(data);
        let coinsData = data.coin;
        (function () {
            // Append current price, Name, and Img
            var price = Math.round((parseFloat(coinsData.price) + Number.EPSILON) * 100) / 100;
            $("#currentPrice").text(price);
            $("img").attr("src", coinsData.iconUrl);
            // Add percent change over specified time period.
            var change = Math.round((parseFloat(coinsData.change) + Number.EPSILON) * 100) / 100;
            $("#percentChange").text(change)
            if (change > 0) { //Checks if the change is positive or negative, then assigns color to the text
                $("#percentChange").css("color", "green").prepend("+").append("%");
            }
            else {
                $("#percentChange").css("color", "red").append("%");
            }
            var description = `<p>${coinsData.description}</p>`;
            $("#infoContainer").append(description);
            // Graphs
            var ctx = document.getElementById('myChart')
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                    datasets: [{
                        data: coinsData.sparkline,
                        label: coinsData.symbol,
                        lineTension: 0,
                        backgroundColor: 'transparent',
                        borderColor: coinsData.color,
                        borderWidth: 4,
                        pointBackgroundColor: coinsData.color,
                    },
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                                callback: function (value, index, values) {
                                    return '$' + value;
                                }
                            }
                        }]
                    },
                    legend: {
                        display: true,
                    }
                }
            })
        })()
    }
    function ggGoNext() {
        if (myChart) {
            console.log("destroying old chart.");
            myChart.destroy();
            $("#currentPrice").text("");
            $("img").attr("src", "#");
            $("#percentChange").text("");
            $("#infoContainer").empty();
        }
    }
})