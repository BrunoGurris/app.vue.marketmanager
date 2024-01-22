<template>
  <div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Estabelecimento</th>
            <th scope="col">Data da Compra</th>
            <th scope="col">Preço</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coupon, n) in coupons" :key="n">
            <td>{{ coupon.company }}</td>
            <td>{{ formatDate(coupon.date) }}</td>
            <td>{{ formatCurrency(coupon.value) }}</td>
          </tr>
        </tbody>
      </table>

      <div v-if="coupons.length == 0" class="text-center">
        Não há registros de compras desse código
      </div>
    </div>
  </div>
</template>
  
<script>
import { formatCurrencyUtils, formatDateUtils} from '@/services/utils';

export default {
  name: 'TableCouponsConsult',

  props: ['coupons'],

  methods: {
    formatDate(date) {
      return formatDateUtils(date)
    },

    formatCurrency(value) {
      return formatCurrencyUtils(value)
    }
  }
}
</script>
  
<style lang="scss" scoped></style>