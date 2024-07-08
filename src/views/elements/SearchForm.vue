<script setup>
import { ref, shallowRef } from 'vue';
import { DoubleArrowDownIcon } from '@radix-icons/vue';
import { DoubleArrowUpIcon } from '@radix-icons/vue';
import { SewingPinFilledIcon } from '@radix-icons/vue';
import {
  PhHamburger,
  PhCheers,
  PhBinoculars,
  PhBookOpenText,
  PhCoffee,
  PhDiscoBall,
  PhChargingStation,
  PhLetterCircleH
} from '@phosphor-icons/vue';
import { Toggle } from '@/components/ui/toggle';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast/use-toast';
import { API_URL } from '@/lib/constants';
import { usePlaceStore } from '@/stores/place';
import { useWeatherStore } from '@/stores/weather';

const keyword = ref('');
const formData = ref({
  name: null,
  country_code: null
});
const cities = ref([]);
const isOpen = shallowRef(false);
const isSearching = shallowRef(false);
const isLoading = shallowRef(false);
const { toast } = useToast()
const placeStore = usePlaceStore();
const weatherStore = useWeatherStore();

async function handleSubmit() {
  await Promise.all([
    placeStore.fetchPlaces(formData.value.name, formData.value.country_code),
    weatherStore.fetchForecasts(formData.value.name, formData.value.country_code)
  ]);
}

function handleSelectCity(selected) {
  formData.value = selected;
  keyword.value = selected.name;
  isSearching.value = false;
  cities.value = [];

  handleSubmit();
}

async function handleInput(e) {
  const keyword = e.target.value;

  if(keyword && keyword.length >= 3)  {
    isLoading.value = true;
    cities.value = [];

    try {
      const response = await fetch(API_URL + '/cities?keyword=' + keyword);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      cities.value = json.data;

    } catch (error) {
      toast({
        title: 'There was an error',
        description: error,
        variant: "destructive"
      });
    } finally {
      isLoading.value = false;
    }
  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit" class="p-2">
    <div class="relative w-full max-w-sm items-center flex gap-1.5">
      <Popover v-model:open="isSearching">
        <PopoverTrigger as-child>
          <Button variant="outline" class="w-full justify-start" @click="$router.push('/search')">
            <SewingPinFilledIcon class="w-4 h-4 me-2" />
            {{ keyword ? keyword : "Search locations..." }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-80 p-0" align="start">
          <Command>
            <CommandInput placeholder="City name" @input="handleInput" />
            <div v-if="isLoading" class="p-1 grid gap-1">
              <Skeleton v-for="n of 5" :key="n" class="h-8 w-full" />
            </div>
            <CommandList>
              <CommandEmpty v-if="!isLoading">
                No results found
              </CommandEmpty>
              <CommandGroup v-if="cities.length">
                <CommandItem
                  v-for="city of cities"
                  :key="city.name"
                  :value="city.name"
                  @select="handleSelectCity(city)"
                >
                  {{ city.name }}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover v-model:open="isOpen">
        <PopoverTrigger>
            <Toggle aria-label="Toggle filters" class="border">
            <DoubleArrowDownIcon v-if="!isOpen" class="w-4 h-4" />
            <DoubleArrowUpIcon v-else class="w-4 h-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent class="py-2 w-[100svw] rounded-none border-0 shadow px-2 md:px-4 lg:px-8">
          <div class="border shadow rounded p-4 flex gap-4 flex-wrap">
            <button title="Food" aria-label="Food"><PhHamburger :size="40" /></button>
            <button title="Bar" aria-label="Bar"><PhCheers :size="40" /></button>
            <button title="Sights" aria-label="Sights"><PhBinoculars :size="40" /></button>
            <button title="Libraries" aria-label="Libraries"><PhBookOpenText :size="40" /></button>
            <button title="Coffee Shop" aria-label="Coffee Shop"><PhCoffee :size="40" /></button>
            <button title="Disco" aria-label="Disco"><PhDiscoBall :size="40" /></button>
            <button title="Refill Station" aria-label="Refill Station"><PhChargingStation :size="40" /></button>
            <button title="Hospital" aria-label="Hospital"><PhLetterCircleH :size="40" /></button>
          </div>
        </PopoverContent>
      </Popover>
    </div>

  </form>
</template>