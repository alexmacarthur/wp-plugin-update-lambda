import { readdirSync } from "fs";
import { join } from "path";
import compareVersions from "compare-versions";

interface Plugin {
  version: string;
  filePath: string;
}

export function getLatestVersion(plugin: string): Plugin {
  const versions = readdirSync(join(process.cwd(), "plugins", plugin as string))
    .filter((directoryName) => /\d\.\d\.\d/.test(directoryName))
    .sort(compareVersions)
    .reverse();
  const version = versions[0];

  const file = readdirSync(
    join(process.cwd(), `plugins`, plugin as string, version as string)
  ).filter((f) => /.zip$/.test(f))[0];

  return {
    version,
    filePath: `https://wp-plugin-update.vercel.app/plugins/${plugin}/${version}/${file}`,
  };
}
