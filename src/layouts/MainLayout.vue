<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Reception Management System
        </q-toolbar-title>

        <!-- <div class="cursor-pointer">{{  }}</div> -->

        <q-btn-dropdown color="black" :label="profileData?.user?.name" >
          <q-list>
            <q-item clickable v-close-popup @click="logout()" class="cursor-pointer">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>

            <!-- <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Videos</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Articles</q-item-label>
              </q-item-section>
            </q-item> -->
          </q-list>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Reception Management System
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { api } from 'src/boot/axios'
import { useRoute, useRouter } from 'vue-router'

const linksList = [
  {
    title: 'Courses',
    // caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
    route: 'Course',
  },
  {
    title: 'Course Category',
    // caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
    route: 'Category',
  },
  {
    title: 'Students',
    // caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
    route: 'Student',
  },
  {
    title: 'Permission',
    // caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
    route: 'Permission',
  },
  {
    title: 'Roles',
    // caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
    route: 'Role',
  },
  // {
  //   title: 'Facebook',
  //   caption: '@QuasarFramework',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev'
  // },
  // {
  //   title: 'Quasar Awesome',
  //   caption: 'Community Quasar projects',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev'
  // }
]

const $router  = useRouter();

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(() => {
  profile()
})

const profileData = ref('');

const profile = () => {

  api
    .get(process.env.VITE_API_URL + 'profile',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then((res) => {
      profileData.value = res.data;
    console.log(res,'response')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {})
}

const logout = () => {
  api
    .post(`${process.env.VITE_API_URL}logout`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      // Clear the token from local storage
      localStorage.removeItem('token');

      // Redirect to the login page
      $router.push('/login');
    })
    .catch((err) => {
      console.error('Logout failed:', err);
    });
};
</script>
