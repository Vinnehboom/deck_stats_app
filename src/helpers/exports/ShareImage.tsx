import { captureRef } from "react-native-view-shot";
import Share from "react-native-share";

export const ShareImage = async (ref: React.MutableRefObject<undefined>) => {
  try {
    const uri = await captureRef(ref, {
      format: "jpg",
      quality: 0.8,
      snapshotContentContainer: true,
    });

    await Share.open({ url: uri });
  } catch (error) {
    console.log("MATCH_EXPORT.SHARE_ERROR", error);
  }
};
