<template>
  <q-page class="q-pa-md">
    <CustomTable :dynamic-store-name="storeName" :filter="filters"  :api-url="apiUrlPath" :route-path="routePath" :title="title"></CustomTable>
  </q-page>
</template>

<script setup>
import CustomTable from 'quasar-crud-yaj/src/templates/CustomTable.vue';


const routePath = 'permission';
const apiUrlPath = 'permission';
const title = 'Permission';
const storeName = 'permission';

const props = defineProps({
  filters:{
    default:{} // for default filtering. when using from another pages
  }
})

</script>

<style lang="scss">
</style>
