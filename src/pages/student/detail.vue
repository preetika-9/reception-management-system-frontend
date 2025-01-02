<template>
  <Container>
    <div class="flex tw-gap-3 tw-items-center tw-justify-between">
      <div class="flex tw-gap-3 tw-items-center">
        <q-btn
          @click="goBack()"
          color="grey-3"
          unelevated
          class="text-black"
          round
          icon="mdi-arrow-left"
        >
          <q-tooltip> Go Back </q-tooltip>
        </q-btn>
        <h6 class="tw-text-2xl">{{ title }}</h6>
      </div>
      <div class="flex tw-gap-3">
        <q-btn
          v-if="detail?.edit_button"
          @click="edit()"
          round
          icon="eva-edit-outline"
          color="primary"
        >
          <q-tooltip> Edit </q-tooltip>
        </q-btn>
        <q-btn
          v-if="detail?.delete_button"
          @click="remove()"
          round
          icon="eva-trash-outline"
          color="negative"
        >
          <q-tooltip> Delete </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div
      class="tw-grid xl:tw-grid-cols-5 lg:tw-grid-cols-4 md:tw-grid-cols-3 tw-gap-4 tw-mt-4"
    >
      <LabelValueCard label="name" :value="detail.name"></LabelValueCard>
      <LabelValueCard label="address" :value="detail.address"></LabelValueCard>
      <LabelValueCard label="mobile" :value="detail.mobile"></LabelValueCard>
      <LabelValueCard label="email" :value="detail.email"></LabelValueCard>
    </div>

    <div class="tw-mt-4">
      <q-tabs v-model="tab" align="left">
        <q-tab
          v-for="t in tabs"
          :key="t.value"
          :label="t.label"
          :name="t.value"
        ></q-tab>
      </q-tabs>

      <q-tab-panels animated v-model="tab">
        <q-tab-panel name="tab1">
          <h6>Tab 1 list</h6>
        </q-tab-panel>
        <!-- <q-tab-panel name="tab2">
          <h6>Tab 2 list</h6>
        </q-tab-panel> -->
      </q-tab-panels>
    </div>
  </Container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";

import { api } from "boot/axios";

import Container from "quasar-crud-yaj/src/templates/Container.vue";
import LabelValueCard from "quasar-crud-yaj/src/templates/LabelValueCard.vue";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();

const routePath = "student";
const apiUrlPath = "student";
const title = "Student";

const detail = ref({});
const tab = ref("tab1");

const tabs = [
  {
    label: "Tab 1",
    value: "tab1",
  },
  {
    label: "Tab 2",
    value: "tab2",
  },
];

const getDetail = () => {
  api.get(`/${apiUrlPath}/${route.params.id}`).then((res) => {
    detail.value = res.data.data;
  });
};

const remove = () => {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    api
      .post(`/${apiUrlPath}/delete`, {
        delete_rows: [route.params.id],
      })
      .then((res) => {
        router.push(`/${routePath}`);
      });
  });
};

const edit = () => {
  router.push(`/${routePath}/${route.params.id}/edit`);
};

const goBack = () => {
  router.push(`/${routePath}`);
};

onMounted(() => {
  getDetail();
});
</script>
