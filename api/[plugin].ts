import { VercelRequest, VercelResponse } from "@vercel/node";
import compareVersions from "compare-versions";
import { readdirSync } from "fs";
import { join } from "path";

export default (req: VercelRequest, res: VercelResponse) => {
  const {
    query: { plugin },
  } = req;

  try {
    const zips = readdirSync(join(process.cwd(), "plugins", plugin as string))
      .filter((fileName) => fileName.endsWith(".zip"))
      .map((fileName) => fileName.match(/(.+)\.zip$/)[1])
      .sort(compareVersions)
      .reverse();

    const version = zips[0];

    return res.json({
      version,
      package: `https://wp-plugin-update.vercel.app/plugins/${plugin}/${version}.zip`,
    });
  } catch (e) {
    return res.status(404).json({
      message: `Sorry, couldn't find a config file for '${plugin}'.`,
    });
  }
};
