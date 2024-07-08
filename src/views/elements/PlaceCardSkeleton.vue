<script setup>
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
</script>

<template>
  <div v-for="n of 4" :key="n" class="md:basis-1/2 lg:basis-1/4 p-2">
    <Card class="h-full bg-slate-200/90 dark:bg-slate-900/90">
      <CardHeader class="p-4">
        <CardTitle class="text-lg"><Skeleton class="h-8 w-full" /></CardTitle>
        <CardDescription><Skeleton class="h-5 w-full w-[6rem]" /></CardDescription>
      </CardHeader>
      <CardContent class="px-4 py-2">
        <p><Skeleton class="h-6 w-full mb-2" /><Skeleton class="h-6 w-full" /></p>
      </CardContent>
      <CardFooter class="px-4 py-2 flex gap-1 flex-wrap">
        <Skeleton class="h-4 w-[2rem]" /> <Skeleton class="h-4 w-[2rem]" />
      </CardFooter>
    </Card>
  </div>
</template>