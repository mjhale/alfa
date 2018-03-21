import { exists } from "@foreman/fs";
import { staged, add } from "@foreman/git";
import { notify } from "@foreman/notify";
import * as prettier from "./tasks/prettier";

async function lint() {
  const files = await staged();

  for (const file of files) {
    if (await exists(file)) {
      notify({ message: "Linting", value: file, desktop: false });

      if (await prettier.transform(file)) {
        await add(file);
      }
    }
  }
}

lint();
