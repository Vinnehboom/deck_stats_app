import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "../types/QueryKeys";

type QueryKeysType = {
  deck?: { deck: string };
  user?: { user: string };
  list?: { list: string };
};

export function useFirebaseQuery<T>(keys: [keyof QueryKeys, ...QueryKeysType], queryFn, enabled: boolean = true) {
  const result = useQuery({
    queryKey: keys,
    staleTime: 5,
    enabled,
    queryFn: async () => {
      const querySnapshot = await queryFn();
      if (querySnapshot?.docs) {
        return querySnapshot.docs.map(doc => doc.data() as T);
      } else {
        if (querySnapshot.exists) {
          return querySnapshot.data();
        } else {
          return { data: {} };
        }
      }
    },
  });
  const { data } = result;
  if (data?.error) console.log(data.error);
  return { queryResult: data as T, ...result };
}
