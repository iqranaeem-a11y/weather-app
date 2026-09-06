import { useQuery } from "@tanstack/react-query";
import { searchCities } from "../services/weatherApi";
import type { CitySearchResult } from "../types/weather";

export const useCitySearch = (query: string) => {
  return useQuery<CitySearchResult[]>({
    queryKey: ["citySearch", query],
    queryFn: () => searchCities(query),
    enabled: query.length > 2, // 2 se zyada letters type hon tabhi search chale
    staleTime: 1000 * 60, // 1 minute cache
  });
};