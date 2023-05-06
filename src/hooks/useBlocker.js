import { useEffect } from "react";
import history from "../util/history";

const useBlocker = (blocker, when = true) => {
  useEffect(() => {
    if (!when) return;
    const unblock = history.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [blocker, when]);
};

export default useBlocker;
