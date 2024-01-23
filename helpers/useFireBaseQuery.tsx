import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "../types/QueryKeys";

type QueryKeysType = {
  deck?: { deck: string };
  user?: { user: string };
  list?: { list: string };
};

export function useFirebaseQuery<T>(keys: [keyof QueryKeys, ...QueryKeysType], queryFn) {
  const result = useQuery({
    queryKey: keys,
    staleTime: 5,
    queryFn: async () => {
      const querySnapshot = await queryFn();
      return querySnapshot.docs.map(doc => doc.data() as T);
    },
  });
  const { data } = result;
  return { data: data as T[], ...result };
}
