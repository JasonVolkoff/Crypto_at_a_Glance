$(document).ready(function () {
    var uuid = "Qwsogvtv82FCd";
    const yearly = "1y";
    const monthly = "30d";
    const weekly = "7d";
    const daily = "24h";
    var baseUrl = "https://api.coinranking.com/v2/coin/" + uuid + "?timePeriod=" + daily;
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    var apiKey = "coinrankingc0b595008db85657a50d4082f20ff1ab68d03f2b78445fb8"


    handlerFunctionA();

    $('#cryptoList').change(function () {
        var selectedValue = parseInt($(this).val());
        //Depend on Value i.e. 0 or 1 respective function gets called. 
        switch (selectedValue) {
            case 0:
                handlerFunctionA();
                break;
            case 1:
                handlerFunctionB();
                break;
            case 2:
                handlerFunctionC();
            //etc... 
            default:
                alert("catch default");
                break;
        }
    });
    function handlerFunctionA() {
        alert("do some stuff");
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
                        console.log(json.data);
                        let coinsData = json.data.coin;
                        (function () {
                            'use strict'
                            feather.replace()

                            // Graphs
                            var ctx = document.getElementById('myChart')
                            // eslint-disable-next-line no-unused-vars
                            var myChart = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: [
                                        'Sunday',
                                        'Monday',
                                        'Tuesday',
                                        'Wednesday',
                                        'Thursday',
                                        'Friday',
                                        'Saturday'
                                    ],
                                    datasets: [{
                                        data: coinsData.sparkline,
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
                                                beginAtZero: false
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: false
                                    }
                                }
                            })
                        })()
                    })
                }
            })
    }
    function handlerFunctionB() {
        alert("Do some other stuff");
    }
    function handlerFunctionC() {
        alert("Do a third... stuff?");
    }




})