import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createStreamParams } from "../../utils/const";

type Inputs = {
  recipient: string;
  tokenID: string;
  name: string;
  period: number;
  cancelableBySender: string;
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log({
      ...createStreamParams,
      recipient: data.recipient,
      name: data.name,
      tokenID: data.tokenID,
      period: data.period,
      cancelableBySender: data.cancelableBySender === "true" ? true : false,
    });
  return (
    <form
      className="grid grid-cols-1 gap-6 w-1/3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl text-gray-600">Create a stream</h2>
      <label className="block">
        <span className="text-gray-500">Recipient address</span>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
          placeholder="Recipient address"
          defaultValue=""
          {...register("recipient", { required: true })}
        />
      </label>

      <label className="block">
        <span className="text-gray-500">Token ID</span>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
          placeholder="Token mint address"
          defaultValue=""
          {...register("tokenID", { required: true })}
        />
      </label>
      <label className="block">
        <span className="text-gray-500">Name</span>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
          placeholder="The stream name or subject"
          defaultValue=""
          {...register("name", { required: true })}
        />
      </label>
      <label className="block">
        <span className="text-gray-500">Time step in seconds</span>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
          placeholder="Time step in seconds"
          defaultValue=""
          {...register("period", { required: true })}
        />
      </label>
      <fieldset className="flex flex-col">
        <span className="text-gray-500">Stream cancelable by sender</span>
        <div className="flex mt-1 justify-start items-center">
          <input
            id="cancelable-by-sender-true"
            type="radio"
            className="mt-1 mr-2 border-gray-300 shadow-sm checked:text-violet-300 focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
            placeholder=""
            value="true"
            {...register("cancelableBySender")}
          />
          <label htmlFor="cancelable-by-sender-true" className="block mr-3">
            True
          </label>
          <input
            id="cancelable-by-sender-false"
            type="radio"
            className="mt-1 mr-2 border-gray-300 shadow-sm checked:text-violet-300 focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
            placeholder=""
            value="false"
            {...register("cancelableBySender")}
          />
          <label htmlFor="cancelable-by-sender-true" className="block">
            False
          </label>
        </div>
      </fieldset>
      <button
        type="submit"
        className="rounded-full bg-violet-900 py-3 px-4 text-violet-50 w-1/3 uppercase"
      >
        Submit
      </button>
    </form>
  );
};
