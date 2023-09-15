import { BN } from "bn.js";
import { Types, getBN } from "@streamflow/stream";

export const WALLET_TO_QUERY = "3abDDLkALHzvnKPq7nRmoHBh3rbA1rXTKhcok9iyg2uu";
export const WALLET = "96B2xz4sfTnYiY2TaWfBTcWntYVF8jqBtj58S7F5DD52";

export const createStreamParams: Types.ICreateStreamData = {
  recipient: "", // Recipient address.
  tokenId: WALLET_TO_QUERY, // Token mint address.
  start: 1643363040, // Timestamp (in seconds) when the stream/token vesting starts.
  amount: getBN(100, 9), // depositing 100 tokens with 9 decimals mint.
  period: 1, // Time step (period) in seconds per which the unlocking occurs.
  cliff: 1643363160, // Vesting contract "cliff" timestamp in seconds.
  cliffAmount: new BN(10), // Amount unlocked at the "cliff" timestamp.
  amountPerPeriod: getBN(5, 9), // Release rate: how many tokens are unlocked per each period.
  name: "", // The stream name or subject.
  canTopup: false, // setting to FALSE will effectively create a vesting contract.
  cancelableBySender: true, // Whether or not sender can cancel the stream.
  cancelableByRecipient: false, // Whether or not recipient can cancel the stream.
  transferableBySender: true, // Whether or not sender can transfer the stream.
  transferableByRecipient: false, // Whether or not recipient can transfer the stream.
  automaticWithdrawal: true, // Whether or not a 3rd party (e.g. cron job, "cranker") can initiate a token withdraw/transfer.
  withdrawalFrequency: 10, // Relevant when automatic withdrawal is enabled. If greater than 0 our withdrawor will take care of withdrawals. If equal to 0 our withdrawor will skip, but everyone else can initiate withdrawals.
  partner: undefined, //  (optional) Partner's wallet address (string | null).
};
