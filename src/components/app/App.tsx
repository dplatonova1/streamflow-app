import React, { useMemo } from "react";
import "./App.css";
import {
  clusterApiUrl,
  Connection,
  GetProgramAccountsFilter,
} from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletPage } from "../wallet-page/wallet-page";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallet = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallet}>
        <div className="bg-slate-100 w-full h-screen flex justify-center items-center font-mono">
          <WalletModalProvider>
            <WalletPage />
          </WalletModalProvider>
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
