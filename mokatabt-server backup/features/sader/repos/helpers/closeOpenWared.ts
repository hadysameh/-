import { Wared } from "../../../wared";

async function closeOpenedWared(
  waredsInfo: { value: string; label: string }[],
  saderId: string
) {
  if (typeof waredsInfo !== "object") {
    waredsInfo = JSON.parse(waredsInfo);
  }
  // console.log({waredsInfo})
  for (const key in waredsInfo) {
    const waredInfo = waredsInfo[key];

    await Wared.update(
      { known: 1, closedSader_id: saderId },
      { where: { id: waredInfo.value } }
    );
  }
}

export default closeOpenedWared