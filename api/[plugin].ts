import { VercelRequest, VercelResponse } from "@vercel/node";
import compareVersions from "compare-versions";
import { readdirSync } from "fs";
import { join } from "path";

export default (req: VercelRequest, res: VercelResponse) => {
  const {
    query: { plugin },
  } = req;

  try {
    const versions = readdirSync(join(process.cwd(), "plugins", plugin as string))
      .filter(directoryName => /\d\.\d\.\d/.test(directoryName))
      .sort(compareVersions)
      .reverse();

    const version = versions[0];

    // We're assuming there is only ONE plugin file.
    const fileToDownload = readdirSync(join(process.cwd(), `plugins`, plugin as string, version as string));

    return res.json({
      version,
      package: `https://wp-plugin-update.vercel.app/plugins/${plugin}/${version}/${fileToDownload}`,
    });
  } catch (e) {
    return res.status(404).json({
      message: `Sorry, couldn't find a config file for '${plugin}'.`,
    });
  }
};
