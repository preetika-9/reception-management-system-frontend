<template>
  <div class="flex q-pa-md tw-gap-3 tw-items-center tw-justify-between">
    <div class="flex tw-gap-3 tw-items-center">
      <div class="flex items-center"><q-btn @click="goBack()" color="grey-3" unelevated class="text-black" round icon="mdi-arrow-left"></q-btn></div>
      <h6 class="tw-text-2xl">Edit {{title}}</h6>
    </div>
  </div>
  <CreateForm  @saved="goBack()" :route-path="routePath" :dynamic-store-name="storeName" form-type="edit"  :api-url="apiUrlPath"></CreateForm>

</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import CreateForm from 'quasar-crud-yaj/src/templates/CreateForm.vue';
import {api} from "boot/axios";
import { useCategoryStore } from 'stores/categoryStore';
import {createDynamicStore} from "src/stores/dynamicCrudStore";
import {onMounted} from "vue";

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const routePath = 'category';
const apiUrlPath = 'category';
const title = 'Category';
const storeName = 'category';

const dynamicStore = createDynamicStore(storeName,apiUrlPath);
const dStore = dynamicStore()
const store = useCategoryStore();

onMounted(()=>{
  dStore.formData = {}
  getDetail()
})


const getDetail = () =>{
  api.get(`/${apiUrlPath}/${route.params.id}`).then((res) => {
    console.log('edit',res.data.data)
    if (res?.data?.data){
      processEdit(res?.data?.data)
    }else{
      console.log('Invalid response format')
    }
  });
}

const processEdit = (data) =>{
  dStore.formData = data;
}
const goBack = () =>{
  router.push(`/${routePath}`)
}
</script>
