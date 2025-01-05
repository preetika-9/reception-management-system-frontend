<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden" style="width: 500px">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Welcome!</h1>
        <p class="text-sm text-gray-500 text-center mb-8">Login to access your account</p>

        <div class="q-pa-md">
          <q-form @submit="login" @reset="onReset" class="q-gutter-md">
            <q-input
              ref="username"
              v-model="form.mobile_number"
              :rules="[
                (val) => !!val || 'Mobile number is required',
                (val) => val.length === 10 || 'Mobile number must be 10 characters',
              ]"
              label="Mobile Number"
              maxlength="10"
              minlength="10"
              outlined
              type="text"
              dense
              class="rounded-lg"
               @input="onMobileInput"
            />

            <q-input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              label="Password"
              lazy-rules
              :rules="[(val) => (val !== null && val !== '') || 'Please type password']"
              outlined
              dense
              class="rounded-lg"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer text-gray-500"
                  @click="toggleShowPassword"
                />
              </template>
            </q-input>

            <div class="flex justify-between items-center mt-4">
              <q-btn label="Login" type="submit" color="primary" class="w-full rounded-lg" />
            </div>
          </q-form>
        </div>
      </div>

      <!-- <div class="bg-gray-200 p-4 text-center">
        <p class="text-sm text-gray-600">Don't have an account? <a href="/register" class="text-primary font-semibold">Sign Up</a></p>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()
const showPassword = ref(false)

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
      const token = res?.data?.access_token
      localStorage.setItem('token', token)
      if (token) {
        console.log(token, 'token')
        $router.push('/')
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {})
}

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const onMobileInput = (e) => {
  form.value.mobile_number = e.target.value.replace(/\D/g, '').slice(0, 10)
}

</script>

<style scoped>
/* Add any additional styles here */
.text-primary {
  color: #3b82f6; /* Tailwind blue-500 */
}
.text-primary:hover {
  color: #2563eb; /* Tailwind blue-600 */
}
.bg-primary {
  background-color: #3b82f6; /* Tailwind blue-500 */
}
.bg-primary:hover {
  background-color: #2563eb; /* Tailwind blue-600 */
}
</style>

