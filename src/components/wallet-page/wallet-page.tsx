import React, { useEffect } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { FormContainer } from "../form/form.container";

require("@solana/wallet-adapter-react-ui/styles.css");

export const WalletPage = () => {
  const wallet = useWallet();
  return (
    <div className="flex justify-center items-center relative">
      {!wallet.connected ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-8xl text-center mb-6 text-gray-500">
            Hi! You can use your Phantom wallet here.
          </h1>

          <WalletMultiButton className="wallet-btn-connect">
            <span className="uppercase">connect wallet</span>
          </WalletMultiButton>
        </div>
      ) : (
        <div className="grid grid-cols-2 auto-rows-min gap-3 h-full w-full">
          <h1 className="text-2xl mb-6 text-gray-500 col-start-1 col-end-3">
            Now that your Phantom wallet is connected you can create a stream
          </h1>
          <div className="flex flex-col items-end">
            <WalletMultiButton className="wallet-btn-connect">
              <span className="uppercase">connect wallet</span>
            </WalletMultiButton>
            <div className="mt-2">
              <WalletDisconnectButton>
                <span className="uppercase">disconnect wallet</span>
              </WalletDisconnectButton>
            </div>
          </div>
          <div className="row-start-2 row-end-4 w-full">
            <FormContainer wallet={wallet} />
          </div>
        </div>
      )}
    </div>
  );
};
