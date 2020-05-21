import { NowRequest, NowResponse } from "@now/node";

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { plugin },
  } = req;

  let pluginConfig;

  try {
    pluginConfig = await import(`../_plugins/${plugin}.json`);
  } catch (e) {
    console.error(e.message);

    return res.json({
      success: false,
      message: `A "${plugin}" plugin config file couldn't be found.`,
    });
  }

  return res.json(pluginConfig.default);
};
