<template>
  <div>
    <Chart type="bar" :data="chartData" :options="options" style="width: 100%; height: 400px" />
  </div>
</template>

<script>
export default {
  name: 'Graphic2',

  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: '#BD2727',
            data: [21, 84, 24, 75, 37, 65, 34],
            borderColor: 'white',
            borderWidth: 2
          },
          {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: '#2740BD',
            data: [41, 52, 24, 74, 23, 21, 32]
          }
        ],
      },

      options: {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: '#495057'
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