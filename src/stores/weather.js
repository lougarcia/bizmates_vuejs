import { ref, computed, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { API_URL } from '@/lib/constants';
import { useToast } from '@/components/ui/toast/use-toast';

export const useWeatherStore = defineStore('weatherStore', () => {

  const forecasts = ref(null);
  const isLoading = shallowRef(false);
  const { toast } = useToast()

  const daily = computed(() => {
    console.log(forecasts.value);
    const filteredList = [];
    const seenDates = new Set(); // Keep track of dates we have already seen

    forecasts.value.list.forEach(weather => {
        const date = weather.dt_txt.split(' ')[0]; // Extract "yyyy-MM-dd" part

        if (!seenDates.has(date)) {
        // If we haven't seen this date yet, add the weather object to filtered list
        filteredList.push(weather);
        seenDates.add(date); // Mark this date as seen
        }
    });

    return filteredList;
  })

  async function fetchForecasts(city_name, country_code) {
    isLoading.value = true;
    forecasts.value = [];

    try {
      const response = await fetch(`${API_URL}/forecasts?city_name=${city_name}&country_code=${country_code}`);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      forecasts.value = await response.json();

    } catch (error) {
      toast({
        title: 'There was an error fetching the list of weather forecast.',
        description: error,
        variant: "destructive"
      });
    } finally {
      isLoading.value = false;
    }
  }

  return { forecasts, isLoading, fetchForecasts, daily };
})
