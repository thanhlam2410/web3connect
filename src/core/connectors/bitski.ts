// tslint:disable-next-line
import { Bitski } from "bitski";

export interface IBitskiConnectorOptions {
  id: string;
  callbackUrl: string;
}

const ConnectToBitski = async (opts: IBitskiConnectorOptions) => {
  if (opts && opts.id && opts.callbackUrl) {
    try {
      const id = opts.id;
      const callbackUrl = opts.callbackUrl;
      // tslint:disable-next-line
      const bitski = new Bitski(id, callbackUrl);
      const provider = bitski.getProvider();
      const isLoggedIn = await bitski.signIn();
      if (isLoggedIn) {
        return provider;
      } else {
        throw new Error("Failed to login to Fortmatic");
      }
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("Missing Fortmatic key");
  }
};

export default ConnectToBitski;
