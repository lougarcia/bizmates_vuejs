<script setup>
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SunIcon } from '@radix-icons/vue';
import { MoonIcon } from '@radix-icons/vue';
import { PhWind, PhThermometer } from '@phosphor-icons/vue';
import { usePlaceStore } from '@/stores/place';
import { useWeatherStore } from '@/stores/weather';
import { Badge } from '@/components/ui/badge';
import { toKm, toTime, toWeekdayDateTime, toWeekdayTime, mpsToKph, kelvinToCelcius } from '@/lib/utils';
import { OWM_ICON_URL } from '@/lib/constants';
import PlaceCardSkeleton from '@/views/elements/PlaceCardSkeleton.vue';

const placeStore = usePlaceStore();
const weatherStore = useWeatherStore();
</script>

<template>
  <main class="flex flex-col md:flex-row gap-2">
    <ScrollArea class="h-[70%] md:h-full md:w-[60%] lg:w-[70%] xl:w-[80%]">
      <div class="flex flex-col md:flex-row md:flex-wrap">
        <PlaceCardSkeleton v-if="placeStore.isLoading" />
        <div v-for="place of placeStore.places" :key="place.fsq_id" class="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2">
          <Card class="h-full bg-slate-200/90 dark:bg-slate-900/90">
            <CardHeader class="p-4">
              <CardTitle class="text-lg">{{ place.name }}</CardTitle>
              <CardDescription>{{ toKm(place.distance) }} away</CardDescription>
            </CardHeader>
            <CardContent class="p-4">
              <p><span class="text-black/60 dark:text-white/60 block text-sm">Address</span>{{ place.location.formatted_address }}</p>
            </CardContent>
            <CardFooter class="p-4 flex gap-1 flex-wrap">
              <Badge variant="secondary" v-for="category of place.categories" :key="category.id">
                {{ category.name }}
              </Badge>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ScrollArea>
    <ScrollArea class="h-[30%] md:h-full md:w-[40%] lg:w-[30%] xl:w-[20%]">
      <div v-if="weatherStore.forecasts?.city && weatherStore.forecasts?.list" class="px-2 pt-4 pb-2">
        <div class="flex flex-col gap-2">
          <div v-for="(daily, index) of weatherStore.daily" :key="daily.dt" class="grow">
            <div>
              <div v-if="index === 0" class="flex justify-between items-center">
                <h3 class="text-2xl">{{ weatherStore.forecasts.city.name }} <sup class="text-sm">{{ weatherStore.forecasts.city.country }}</sup></h3>
                <div class="text-sm flex gap-2">
                  <span><SunIcon class="w-4 h-4 inline me-1 mt-[-2px]" />{{ toTime(weatherStore.forecasts.city.sunrise) }}</span>
                  <span><MoonIcon class="w-4 h-4 inline me-1 mt-[-2px]" />{{ toTime(weatherStore.forecasts.city.sunset) }}</span>
                </div>
              </div>
              <div class="flex items-center" :class="{'border rounded p-2 ' : index !== 0, 'my-3': index === 0}">
                <div class="flex justify-center" :class="index === 0 ? 'basis-2/5' : 'basis-1/4'">
                  <img v-if="index === 0" :src="`${OWM_ICON_URL}/${daily.weather[0].icon}@2x.png`" />
                  <img v-else :src="`${OWM_ICON_URL}/${daily.weather[0].icon}.png`" />
                </div>
                <div :class="index === 0 ? 'basis-3/5 text-center' : 'basis-3/4'">
                  <div class="text-xs text-black/70 dark:text-white/80" v-if="index === 0">{{ toWeekdayDateTime(daily.dt) }}</div>
                  <div class="text-xs text-black/70 dark:text-white/80" v-else>{{ toWeekdayTime(daily.dt) }}</div>
                  <div class="capitalize" :class="{'text-xl': index === 0}">{{ daily.weather[0].description }}</div>
                  <template v-if="index !== 0">
                    <div class="text-sm mt-2">
                      <PhWind :size="20" class="inline" aria-label="Wind speed" /> {{ mpsToKph(daily.wind.speed) }}
                      - {{ mpsToKph(daily.wind.gust) }}
                    </div>
                    <div class="text-sm mt-1">
                      <PhThermometer :size="20" class="inline" aria-label="Temperature" /> {{ daily.main.temp }} &deg;K
                      &bull; {{ kelvinToCelcius(daily.main.temp) }} &deg;C
                    </div>
                  </template>
                </div>
              </div>
              <div v-if="index === 0">
                <div class="text-sm mb-2 mx-4">
                  <PhWind :size="20" class="inline" /> {{ mpsToKph(daily.wind.speed) }}
                  - {{ mpsToKph(daily.wind.gust) }}
                </div>
                <div class="text-sm mb-2 mx-4">
                  <PhThermometer :size="20" class="inline" /> {{ daily.main.temp }} &deg;K
                  &bull; {{ kelvinToCelcius(daily.main.temp) }} &deg;C
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  </main>
</template>
