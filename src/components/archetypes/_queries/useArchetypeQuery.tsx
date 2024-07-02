import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LIMITLESS_API_KEY } from "@env";
import { useMemo } from "react";

import { Archetype } from "../../../types";
import { glcArchetypes } from "../../../helpers/archetypes";

const fetchArchetypes = (): Promise<Archetype[]> => {
  return axios
    .get("https://play.limitlesstcg.com/api/games/PTCG/decks", {
      headers: {
        "X-Access-Key": LIMITLESS_API_KEY,
      },
    })
    .then(response => response.data);
};
export const useArchetypeQuery = () => {
  const {
    data: archetypes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["archetypes"],
    queryFn: fetchArchetypes,
  });
  const glcTypes = useMemo(() => glcArchetypes(), []);
  const totalTypes = archetypes && archetypes?.concat(glcTypes);
  return isLoading ? {} : { archetypes: totalTypes, isLoading: isLoading, isError: isError, error: error };
};
