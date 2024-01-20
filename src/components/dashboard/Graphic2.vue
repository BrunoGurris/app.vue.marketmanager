<template>
  <div>
    <div class="text-center text-lg-start">
      <h5 class="fw-bold m-0">Lojas</h5>
      <div>Gráfico por lojas</div>
    </div>
    <Chart type="bar" :data="chartData" :options="options" style="width: 100%; height: 400px" class="mt-3" />
  </div>
</template>

<script>
export default {
  name: 'Graphic2',

  data() {
    return {
      chartData: {
        labels: ['Loja1', 'Loja2', 'Loja3', 'Loja4', 'Loja5', 'Loja6', 'Loja7', 'Loja8', 'Loja9', 'Loja10'],
        datasets: [
          {
            type: 'bar',
            label: 'Lucro',
            data: [21, 84, 24, 75, 90, 17, 30, 60, 12, 36],
            backgroundColor: '#30bb80'
          },
          {
            type: 'bar',
            label: 'Despesas',
            data: [41, 52, 60, 81, 56, 24, 10, 40, 32, 70],
            backgroundColor: '#EF4444'
          },
          {
            type: 'bar',
            label: 'Cupons',
            data: [20, 41, 70, 51, 36, 80, 30, 40, 32, 70],
            backgroundColor: '#F59E0B'
          },
          {
            type: 'bar',
            label: 'Faturamento',
            data: [10, 28, 40, 30, 20, 20, 10, 40, 32, 70],
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
          },
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