<template>
  <div>
    <Chart type="line" :data="chartData" :options="options" style="width: 100%; height: 300px" />
  </div>
</template>

<script>
export default {
  name: 'Graphic1',

  data() {
    return {
      chartData: {
        labels: ['Out/2022', 'Nov/2022', 'Dez/2022', 'Jan/2023', 'Feb/2023'],
        datasets: [
          {
            label: 'Cupons',
            data: [65, 59, 80, 101, 56],
            fill: false,
            borderColor: '#7D27BD',
            tension: 0.4
          },
          {
            label: 'Despesas',
            data: [50, 40, 30, 45, 65],
            fill: false,
            borderColor: '#BD2727',
            tension: 0.4
          },
          {
            label: 'Faturamento',
            data: [55, 10, 70, 120, 45],
            fill: false,
            borderColor: '#2740BD',
            tension: 0.4
          },
          {
            label: 'Lucro',
            data: [28, 48, 40, 19, 86],
            fill: false,
            borderColor: '#3EBD27',
            tension: 0.4,
            backgroundColor: 'rgba(62,189,39,0.2)'
          }
        ],
      },

      options: {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                }
                return label;
              }
            }
          },
          legend: {
            labels: {
              color: '#505050'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#505050'
            },
            grid: {
              color: '#F0F0F0'
            }
          },
          y: {
            ticks: {
              callback: function (value) {
                return 'R$ ' + value;
              },
              color: '#505050'
            },
            grid: {
              color: '#F0F0F0'
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>