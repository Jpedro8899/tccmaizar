document.addEventListener('DOMContentLoaded', function() {
    // Tente com diferentes delimitadores, ajuste conforme necessário
    d3.dsv(";", 'AirQualityUCI.csv').then(function(data) {
        // Limitar a 100 registros
        const limitedData = data.slice(0, 100);

        const columns = Object.keys(limitedData[0]);
        console.log("Cabeçalhos do CSV:", columns);

        // Processar e mostrar os dados na tabela
        var tableBody = document.querySelector('#airQualityTable tbody');
        limitedData.forEach(function(row) {
            var tr = document.createElement('tr');
            columns.forEach(function(column) {
                tr.innerHTML += `<td>${row[column]}</td>`;
            });
            tableBody.appendChild(tr);
        });

        // Inicializar o gráfico com o gás CO
        updateChart(limitedData, 'CO(GT)');

        // Atualizar o gráfico ao selecionar um novo gás
        document.getElementById('gasSelector').addEventListener('change', function() {
            const selectedColumn = this.value === "CO" ? 'CO(GT)' : this.value === "C6H6" ? 'C6H6(GT)' : this.value === "NOx" ? 'NOx(GT)' : 'NO2(GT)';
            updateChart(limitedData, selectedColumn);
        });
    });

    function updateChart(data, gas) {
        var labels = data.map(row => `${row.Date} ${row.Time}`);
        var values = data.map(row => row[gas]);

        var ctx = document.getElementById('airQualityChart').getContext('2d');
        if (window.airQualityChart) {
            window.airQualityChart.destroy();
        }
        window.airQualityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: gas,
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Data e Hora'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Concentração'
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});
