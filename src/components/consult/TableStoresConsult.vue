<template>
  <div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Loja</th>
            <th scope="col">Quant.</th>
            <th scope="col">Preço</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(store, n) in stores" :key="n">
            <td>{{ store.name }}</td>
            <td>{{ store.amount === null ? '-' : store.amount }}</td>
            <td>{{ store.price === null ? '-' : formatCurrency(store.price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { formatCurrencyUtils } from '@/services/utils';

export default {
  name: 'TableStoresConsult',

  props: ['stores'],

  methods: {
    formatCurrency(value) {
      return formatCurrencyUtils(value)
    }
  }
}
</script>

<style lang="scss" scoped></style>