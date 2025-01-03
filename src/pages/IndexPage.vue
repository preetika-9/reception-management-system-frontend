<template>
  <q-page>
  <div style="padding: 20px; padding-top: 50px">
    <div class="flex justify-between" >
      <div style="border: 1px solid black; padding: 10px; border-radius: 5px; width: 400px; height: 50px;" class="flex justify-between items-center cursor-pointer" @click="$router.push('/course')">
        <span>Courses</span>
        <span>{{ countList.courses }}</span>
      </div>

      <div style="border: 1px solid black; padding: 10px; border-radius: 5px; width: 400px; height: 50px;" class="flex justify-between items-center cursor-pointer" @click="$router.push('/category')">
        <span>Course Categories</span>
        <span>{{ countList.categories }}</span>
      </div>

      <div style="border: 1px solid black; padding: 10px; border-radius: 5px; width: 400px; height: 50px;" class="flex justify-between items-center cursor-pointer" @click="$router.push('/student')">
       <span>Students</span>
       <span>{{ countList.students }} </span>
      </div>

   </div>
  </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios'

const countList = ref('');

onMounted(() => {
  fetchCount()
})

const fetchCount = () => {

  api
    .get(process.env.VITE_API_URL + 'counts')
    .then((res) => {
      console.log(res.data, 'response')
      countList.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {})
}
</script>
