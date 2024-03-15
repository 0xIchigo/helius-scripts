import { Helius } from "helius-sdk";

const main = async () => {
    const helius = new Helius("");
    const res = await helius.rpc.getAsset({
        id: ""
    });
}