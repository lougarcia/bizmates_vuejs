<script setup>
import { RouterLink } from 'vue-router';
import { GearIcon } from '@radix-icons/vue';
import { HomeIcon } from '@radix-icons/vue';
import { SunIcon } from '@radix-icons/vue';
import { MoonIcon } from '@radix-icons/vue';
import { useColorMode } from '@vueuse/core';

const mode = useColorMode()
</script>

<template>
  <div class="flex justify-between items-center p-2 bg-slate-100/90 dark:bg-black/70 shadow-[0_0_5px_2px_rgba(0,0,0,0.2)]">
    <button class="flex flex-col items-center" @click="mode = mode == 'light' ? 'dark' : 'light'">
      <SunIcon v-if="mode == 'dark'" class="w-6 h-6 cursor-pointer" />
      <MoonIcon v-if="mode == 'light'" class="w-6 h-6 cursor-pointer" />
      <span class="text-xs">Mode</span>
    </button>
    <RouterLink to="/" class="flex flex-col items-center">
      <HomeIcon class="w-6 h-6" />
      <span class="text-xs">Home</span>
    </RouterLink>
    <button class="flex flex-col items-center">
      <GearIcon class="w-6 h-6" />
      <span class="text-xs">Settings</span>
    </button>
  </div>
</template>