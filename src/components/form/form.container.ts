import React, { createElement, useState, useCallback, useEffect } from "react";
import { Form } from "./form";
import {
  WalletContextState,
  useConnection,
} from "@solana/wallet-adapter-react";
import { WALLET_TO_QUERY, createStreamParams } from "../../utils/const";
import { Inputs } from "../../utils/types";
import { Types, GenericStreamClient } from "@streamflow/stream";
import { WalletError } from "@solana/wallet-adapter-base";
import {
  Connection,
  GetProgramAccountsFilter,
  PublicKey,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

type FormContainerProps = {
  wallet: WalletContextState;
};

export const FormContainer = (props: FormContainerProps) => {
  const { wallet } = props;
  const { connection } = useConnection();
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);
  const [activeToken, setActiveToken] = useState<string>("solana");
  const [success, setSuccess] = useState(false);

  const walletConnectionErr = (error = WalletError) => {
    console.log("Wallet Connection Error:", error);
  };

  // Parameters
  const solanaParams = {
    sender: wallet, // SignerWalletAdapter or Keypair of Sender account
  };

  const ethereumParams = {
    sender: wallet,
  };

  const polygonParams = {
    sender: wallet,
  };

  // Clients

  const client = new GenericStreamClient<Types.IChain.Solana>({
    chain: Types.IChain.Solana, // Blockchain
    clusterUrl: "https://api.devnet.solana.com", // RPC cluster URL
    cluster: Types.ICluster.Devnet, // (optional) (default: Mainnet)
    // ...rest chain specific params e.g. commitment for Solana
  });

  const getTokenAccounts = async (
    wallet: string,
    solanaConnection: Connection
  ) => {
    const filters: GetProgramAccountsFilter[] = [
      {
        dataSize: 165, //size of account (bytes)
      },
      {
        memcmp: {
          offset: 32, //location of our query in the account (bytes)
          bytes: wallet, //our search criteria, a base58 encoded string
        },
      },
    ];
    const accounts = await solanaConnection.getParsedProgramAccounts(
      new PublicKey(TOKEN_PROGRAM_ID),
      { filters: filters }
    );

    accounts.forEach((account, i) => {
      //Parse the account data
      const parsedAccountInfo: any = account.account.data;
      const mintAddress: string = parsedAccountInfo["parsed"]["info"]["mint"];
      const tokenBalance: number =
        parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
      //Log results
      console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
      console.log(`--Token Mint: ${mintAddress}`);
      console.log(`--Token Balance: ${tokenBalance}`);
    });
    return [];
  };

  const getAvailableTokens = useCallback(async () => {
    const tokensList = await getTokenAccounts(WALLET_TO_QUERY, connection);
    const tokenNamesList =
      tokensList.length !== 0 ? tokensList : ["solana", "ethereum", "polygon"];
    setAvailableTokens(tokenNamesList);
  }, []);

  const onTokenChange = useCallback(
    (token: string) => setActiveToken(token),
    [activeToken]
  );

  const onSubmit = useCallback(async (data: Inputs) => {
    const sendingParams = {
      ...createStreamParams,
      recipient: data.recipient,
      name: data.name,
      tokenId: data.tokenID,
      period: data.period,
      cancelableBySender: data.cancelableBySender === "true" ? true : false,
    };
    switch (activeToken) {
      case "solana":
        try {
          const { ixs, txId, metadataId } = await client.create(
            sendingParams,
            solanaParams
          ); // second argument differ depending on a chain
          setSuccess(true);
        } catch (exception: any) {
          // handle exception
          walletConnectionErr(exception);
        }

        break;
      case "polygon":
        console.log("polygon");
        //   try {
        //     const { ixs, txId, metadataId } = await polygonClient.create(
        //       createStreamParams
        //     );
        //   } catch (exception: any) {
        //     walletConnectionErr(exception);
        //   }
        break;
      case "ethereum":
        console.log("ethereum");
        // try {
        //   const { ixs, txId, metadataId } = await ethereumClient.create(
        //     createStreamParams
        //   );
        // } catch (exception: any) {
        //   walletConnectionErr(exception);
        // }
        break;
    }
  }, []);

  useEffect(() => {
    getAvailableTokens();
  }, [wallet]);

  return createElement(Form, {
    tokens: availableTokens,
    onSubmit,
    onTokenChange,
    success,
    setSuccess,
  });
};
