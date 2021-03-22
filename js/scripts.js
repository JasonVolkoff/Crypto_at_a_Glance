$(document).ready(function () {
    var baseUrl = "https://api.coinranking.com/v2/coins";
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
                    console.log(json.data);
                    let coinsData = json.data.coins;
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
                                    data: [
                                        15339,
                                        21345,
                                        18483,
                                        24003,
                                        23489,
                                        24092,
                                        12034
                                    ],
                                    lineTension: 0,
                                    backgroundColor: 'transparent',
                                    borderColor: '#007bff',
                                    borderWidth: 4,
                                    pointBackgroundColor: '#007bff'
                                }]
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
})

