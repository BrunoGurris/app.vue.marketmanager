<template>
  <div>
    <div class="text-center text-lg-start">
      <h5 class="fw-bold m-0">Despesas</h5>
      <div>Gráfico de todas despesas</div>
    </div>
    <div class="d-flex justify-content-center">
      <div>
        <Chart type="doughnut" :data="chartData" :options="options" style="height: 400px" class="mt-3" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Graphic3',

  data() {
    return {
      chartData: {
        labels: ['Atrasadas', 'Pagas', 'Aguardando'],
        datasets: [
          {
            data: [540, 325, 702],
            backgroundColor: ['#EF4444', '#30bb80', '#117cdf'],
            hoverBackgroundColor: ['#dc2626', '#059669', '#045db1']
          }
        ]
      },

      options: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: '#495057'
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>