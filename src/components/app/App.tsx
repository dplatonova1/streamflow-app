import React, { useMemo } from "react";
import "./App.css";
import {
  Types,
  GenericStreamClient,
  getBN,
  getNumberFromBN,
  StreamflowSolana,
} from "@streamflow/stream";
import { clusterApiUrl } from "@solana/web3.js";
import { Form } from "../form/form";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { Wallet } from "../signature/wallet";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  console.log(endpoint);
  const walletConnectionErr = (error = WalletError) => {
    console.log("Wallet Connection Error:", error);
  };

  const wallet = useMemo(() => [new PhantomWalletAdapter()], [network]);

  const solanaParams = {
    sender: wallet, // SignerWalletAdapter or Keypair of Sender account
  };

  const aptosParams = {
    senderWallet: wallet, // AptosWalletAdapter Wallet of sender
  };

  const ethereumParams = undefined;

  // try {
  //   const { ixs, tx, metadata } = await client.create(createStreamParams, solanaParams); // second argument differ depending on a chain
  // } catch (exception) {
  //   // handle exception
  // }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallet}>
        <div className="bg-slate-100 w-full h-screen flex justify-center items-center">
          <Form />
          <Wallet />
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
