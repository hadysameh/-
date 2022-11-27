import { Wared } from "../../../wared";

async function reopenWaredThatWasClosedByTHisSader(saderId: string) {
    await Wared.update(
      { known: 0, closedSader_id: null },
      { where: { known: 1, closedSader_id: saderId } }
    );
  }

export default reopenWaredThatWasClosedByTHisSader