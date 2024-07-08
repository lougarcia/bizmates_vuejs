<script setup>
import { RouterView } from 'vue-router'
import { GearIcon } from '@radix-icons/vue';
import { SunIcon } from '@radix-icons/vue';
import { MoonIcon } from '@radix-icons/vue';
import { HomeIcon } from '@radix-icons/vue';
import SearchForm from '@/views/elements/SearchForm.vue'
import FooterNavigation from '@/views/elements/FooterNavigation.vue'
import Toaster from '@/components/ui/toast/Toaster.vue';
import { useColorMode } from '@vueuse/core';

const mode = useColorMode()
</script>

<template>
  <header class="flex justify-between items-stretch md:mx-4">
    <div class="grow md:basis-3/4 flex items-center">
      <RouterLink to="/" class="flex flex-col items-center sr-only md:not-sr-only">
        <HomeIcon class="w-6 h-6" />
        <span class="sr-only">Home</span>
      </RouterLink>
      <SearchForm class="grow" />
    </div>
    <nav class="sr-only basis-1/4 flex justify-end items-center gap-4 me-4 md:not-sr-only">
      <button class="flex flex-col items-center not-sr-only" @click="mode = mode == 'light' ? 'dark' : 'light'">
        <SunIcon v-if="mode == 'dark'" class="w-6 h-6 cursor-pointer" />
        <MoonIcon v-if="mode == 'light'" class="w-6 h-6 cursor-pointer" />
        <span class="sr-only">Mode</span>
      </button>
      <button class="flex flex-col items-center" aria-label="Settings">
        <GearIcon class="w-6 h-6" />
        <span class="sr-only">Settings</span>
      </button>
    </nav>
  </header>
  <RouterView />
  <footer>
    <FooterNavigation class="md:sr-only" />
  </footer>
  <Toaster />
</template>
