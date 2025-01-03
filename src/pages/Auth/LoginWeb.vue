<template>
  <h1 class="p-10">Login</h1>

  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="login" @reset="onReset" class="q-gutter-md">
      <q-input
        ref="username"
        v-model="form.mobile_number"
        :rules="[
          (val) => !!val || 'Mobile number is required',
          (val) => val.length === 10 || 'Mobile number must be 10 characters',
        ]"
        label="Enter your mobile number"
        maxlength="10"
        minlength="10"
        outlined
        type="text"
      />

      <q-input
        type="password"
        v-model="form.password"
        label="Your password"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type password']"
        outlined
      />

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const $router = useRouter()

const form = ref({
  mobile_number: '',
  password: '',
})

const login = () => {
  console.log(form.value)
  api
    .post(process.env.VITE_API_URL + 'login', form.value)
    .then((res) => {
      console.log(res.data.access_token, 'response')
      const token = res?.data?.access_token;
      localStorage.setItem('token', token);
     if(token){
      console.log(token,'token')
      $router.push('/');
     }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {})
}
</script>
