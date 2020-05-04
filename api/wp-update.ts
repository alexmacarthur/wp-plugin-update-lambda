import pluginConfig from "./_packages/wp-typeit.json";
import { NowRequest, NowResponse } from '@now/node';

export default (req: NowRequest, res: NowResponse) => {

  res.json(pluginConfig);
  // res.json({ name: 'Alex', email: 'alex@macarthur.me' })
}
