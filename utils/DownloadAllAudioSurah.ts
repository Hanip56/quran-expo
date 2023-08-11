import { Ayah } from "@/types/global";
import * as FileSystem from "expo-file-system";
type CancelablePromise<T> = Promise<T> & { cancel: () => void };
type DownloadArg = {
  ayahList: Ayah[];
  ayah: Ayah;
};

function createCancelablePromise<T>(
  taskFunction: (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void,
    controller: AbortController
  ) => void
): CancelablePromise<T> {
  const controller = new AbortController();
  const signal = controller.signal;

  const cancelablePromise = new Promise<T>((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error("Promise was cancelled."));
      return;
    }

    taskFunction(resolve, reject, controller);
  }) as CancelablePromise<T>;

  cancelablePromise.cancel = () => {
    controller.abort();
  };

  return cancelablePromise;
}

const cancelablePromiseAll = createCancelablePromise<void>(
  (resolve, reject, controller) => {
    Promise.all(
      ayahList.map((ayah) =>
        downloadResumable(ayah.ayahId, ayah.id + 1).downloadAsync()
      )
    )
      .then(resolve)
      .catch(reject);

    controller.signal.addEventListener("abort", () => {
      reject(new Error("Download failed"));
    });
  }
);
