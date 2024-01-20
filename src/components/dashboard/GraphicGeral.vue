<template>
  <div>
    <div class="text-center text-lg-start">
      <h5 class="fw-bold m-0">Resumo</h5>
      <div>Gráfico geral de todas as lojas</div>
    </div>
    <Chart type="line" :data="chartData" :options="options" style="width: 100%; height: 400px" class="mt-3" />
  </div>
</template>

<script>
export default {
  name: 'GraphicGeral',

  data() {
    return {
      chartData: {
        labels: ['Out/2022', 'Nov/2022', 'Dez/2022', 'Jan/2023', 'Feb/2023'],
        datasets: [
          {
            label: 'Lucro',
            data: [28, 48, 40, 19, 86],
            fill: false,
            borderDash: [5, 5],
            borderColor: '#30bb80',
            tension: 0.4,
            backgroundColor: '#30bb80'
          },
          {
            label: 'Despesas',
            data: [50, 40, 30, 45, 65],
            fill: false,
            borderColor: '#EF4444',
            tension: 0.4,
            backgroundColor: '#EF4444'
          },
          {
            label: 'Cupons',
            data: [65, 59, 80, 101, 56],
            fill: false,
            borderColor: '#F59E0B',
            tension: 0.4,
            backgroundColor: '#F59E0B'
          },
          {
            label: 'Faturamento',
            data: [55, 10, 70, 120, 45],
            fill: false,
            borderColor: '#117cdf',
            tension: 0.4,
            backgroundColor: '#117cdf'
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

<style lang="scss" scoped>
.chart-title {
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
}
</style>