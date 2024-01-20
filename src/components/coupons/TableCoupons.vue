<template>
  <div>
    <DataTable ref="dt" :value="coupons" :paginator="true" :rows="100" :loading="loading" :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} cupons"
      :globalFilterFields="['key', 'number', 'company', 'value', 'date', 'created_at']"
      :rowClass="({ stores }) => stores.length == 0 ? 'bg-warning text-dark': null">
      <template #loading>
        <div class="text-center">Carregando os cupons...</div>
      </template>
      <template #empty v-if="loading == false">
        <div class="text-center">Nenhum registro de cupons</div>
      </template>

      <Column field="id" header="ID"></Column>
      <Column field="key" header="Chave de Acesso">
        <template #body="{ data }">
          {{ formatKey(data.key) }}
        </template>
      </Column>
      <Column field="number" header="Nº do Cupom"></Column>
      <Column field="company" header="Estabelecimento"></Column>
      <Column field="value" header="Total">
        <template #body="{ data }">
          {{ formatCurrency(data.value) }}
        </template>
      </Column>
      <Column field="date" header="Data da Compra">
        <template #body="{ data }">
          {{ formatDateTime(data.date) }}
        </template>
      </Column>
      <Column field="created_at" header="Data de Criação">
        <template #body="{ data }">
          {{ formatDate(data.created_at) }}
        </template>
      </Column>
      <Column header="Ações">
        <template #body="{ data }">
          <div class="d-flex">
            <i @click="openModalViewCoupon(data)" class="bi bi-eye-fill mx-1 button-icon-view" v-tooltip.top="{ value: 'Detalhes', showDelay: 300, hideDelay: 1 }"></i>
            <i @click="openModalEditCoupon(data)" class="bi bi-pencil-square mx-1 button-icon-edit" v-tooltip.top="{ value: 'Editar', showDelay: 300, hideDelay: 1 }"></i>
            <i @click="openModalDeleteCoupon(data)" class="bi bi-trash3-fill mx-1 button-icon-delete" v-tooltip.top="{ value: 'Excluir', showDelay: 300, hideDelay: 1 }"></i>
          </div>
        </template>
      </Column>
    </DataTable>

    <ModalViewCoupon ref="modalViewCoupon" />
    <ModalEditCoupon :coupons="coupons" ref="modalEditCoupon" />
    <ModalDeleteCoupon :coupons="coupons" ref="modalDeleteCoupon" />
  </div>
</template>

<script>
import { formatDateUtils, formatDateTimeUtils, formatKeyUtils, formatCurrencyUtils } from '../../services/utils'
import ModalViewCoupon from './ModalViewCoupon.vue'
import ModalEditCoupon from './ModalEditCoupon.vue'
import ModalDeleteCoupon from './ModalDeleteCoupon.vue'

export default {
  name: 'TableCoupons',

  props: ['coupons', 'loading', 'filters'],

  components: {
    ModalViewCoupon,
    ModalEditCoupon,
    ModalDeleteCoupon
  },

  methods: {
    openModalViewCoupon(coupon) {
      this.$refs.modalViewCoupon.openModal(coupon)
    },

    openModalEditCoupon(coupon) {
      this.$refs.modalEditCoupon.openModal(coupon)
    },

    openModalDeleteCoupon(coupon) {
      this.$refs.modalDeleteCoupon.openModal(coupon)
    },

    formatDate(date) {
      return formatDateUtils(date)
    },

    formatDateTime(date) {
      return formatDateTimeUtils(date)
    },

    formatKey(key) {
      return formatKeyUtils(key)
    },

    formatCurrency(value) {
      return formatCurrencyUtils(value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>