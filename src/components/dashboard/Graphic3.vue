<template>
  <div class="d-flex justify-content-center align-items-center">
    <div>
      <Chart type="doughnut" :data="chartData" :options="options" style="width: 100%; height: 400px" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Graphic3',

  data() {
    return {
      chartData: {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: [540, 325, 702],
            backgroundColor: ['#BD2758', '#BD2710', '#BD2320'],
            hoverBackgroundColor: ['#BD9654', '#BD70A1', '#BD6425']
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