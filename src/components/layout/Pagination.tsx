import React, { useContext } from "react";
import { Link, HStack } from "native-base";

import { TranslationContext } from "../../contexts/TranslationContext";
import { Text } from "./Text";
import { PaginationStyle } from "../../styles/layout/PaginationStyle";

export const Pagination = ({
  page,
  allowNext,
  setPage,
  fetchNextPage,
}: {
  page: number;
  allowNext: boolean;
  setPage: (n: number) => void;
  fetchNextPage: () => void;
}) => {
  const { t } = useContext(TranslationContext);
  return (
    <HStack style={PaginationStyle.container} space={4}>
      {page > 1 ? (
        <>
          <Link onPress={() => setPage(page - 1)}>
            <Text style={PaginationStyle.link}>{t("PAGINATION.PREVIOUS")}</Text>
          </Link>
          {page - 2 > 0 ? (
            <Link onPress={() => setPage(page - 2)}>
              <Text style={PaginationStyle.link}>{page - 2}</Text>
            </Link>
          ) : null}
          <Link onPress={() => setPage(page - 1)}>
            <Text style={PaginationStyle.link}>{page - 1}</Text>
          </Link>
        </>
      ) : null}
      <Text style={PaginationStyle.active}>{page}</Text>
      {allowNext ? (
        <Link
          onPress={() => {
            setPage(page + 1);
            fetchNextPage();
          }}>
          <Text style={PaginationStyle.link}>{t("PAGINATION.NEXT")}</Text>
        </Link>
      ) : null}
    </HStack>
  );
};
