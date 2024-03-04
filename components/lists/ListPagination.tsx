import { Animated, View } from "react-native";
import React from "react";

import { ListPaginationStyle } from "../../styles/lists/ListPaginationStyle";
import { List } from "../../types";
import { screenWidth as width } from "../../styles/dimensions";

export const ListPagination = ({ data, scrollX }: { data: List[]; scrollX: Animated.Value }) => {
  return (
    <View style={ListPaginationStyle.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });
        return <Animated.View key={idx.toString()} style={[ListPaginationStyle.dot, { width: dotWidth }]} />;
      })}
    </View>
  );
};
