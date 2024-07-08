import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { API_URL } from '@/lib/constants';
import { useToast } from '@/components/ui/toast/use-toast';

export const usePlaceStore = defineStore('placeStore', () => {

  const places = ref([]);
  const isLoading = shallowRef(false);
  const { toast } = useToast()

  async function fetchPlaces(city_name, country_code) {
    isLoading.value = true;
    places.value = [];

    try {
      const response = await fetch(`${API_URL}/places?city_name=${city_name}&country_code=${country_code}`);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      places.value = json.results;

    } catch (error) {
      toast({
        title: 'There was an error fetching the list of places.',
        description: error,
        variant: "destructive"
      });
    } finally {
      isLoading.value = false;
    }
  }

  return { places, isLoading, fetchPlaces };
})
