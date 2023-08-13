<template>

  <suspense>
      <template #default>
        <slot/>

      </template>
      <template #fallback>
        <div class="w-100 text-center">
            <h3>Loading...</h3>
        </div>
      </template>
  </suspense>
</template>

<script setup>
import MainMenu from "./MainMenu.vue";
import Nav from "./Nav.vue";

</script>

<style scoped>

</style>
