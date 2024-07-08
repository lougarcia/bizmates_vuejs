<script setup>
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SewingPinFilledIcon } from '@radix-icons/vue';

</script>

<template>
  <main class="flex justify-center items-center">
    <Card class="m-4">
      <CardHeader>
        <CardTitle class="text-center">Japan Tour App</CardTitle>
      </CardHeader>
      <CardContent class="text-center text-black/70 dark:text-white/80">
        <p>Your one stop shop for weather and places information</p>
      </CardContent>
      <CardFooter class="grid justify-center items-center text-center">
        <SewingPinFilledIcon class="w-8 h-8 ml-auto mr-auto mb-6" />
        <Button class="bg-green-500">Start Searching!</Button>
      </CardFooter>
    </Card>
  </main>
</template>
