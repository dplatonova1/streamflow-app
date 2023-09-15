import React, { ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../../utils/types";
import { Signature } from "../signature/signature";

type FormProps = {
  tokens: string[];
  onSubmit: (data: Inputs) => void;
  onTokenChange: (token: string) => void;
  success: boolean;
  setSuccess: (success: boolean) => void;
};

export const Form = (props: FormProps) => {
  const { tokens, onSubmit, onTokenChange, success, setSuccess } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitClick: SubmitHandler<Inputs> = (data) => {
    onSubmit(data);
  };

  const handleTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    onTokenChange(e.target.value);
  };

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmitClick)}
      >
        <h2 className="text-2xl text-gray-600">Create a stream</h2>
        <fieldset className="flex flex-col">
          <span className="text-gray-500">Choose a token</span>
          <div className="flex mt-1 justify-start items-center">
            {tokens.map((token) => {
              return (
                <>
                  <input
                    id={token}
                    type="radio"
                    className="mt-1 mr-2 border-gray-300 shadow-sm checked:text-violet-300 focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
                    placeholder=""
                    value={token}
                    {...register("token")}
                    onChange={handleTokenChange}
                  />
                  <label htmlFor={token} className="block mr-3">
                    {token.charAt(0).toUpperCase().concat(token.slice(1))}
                  </label>
                </>
              );
            })}
          </div>
        </fieldset>
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
          className="rounded-full bg-violet-300 py-3 px-4 text-violet-50 w-1/3 uppercase"
        >
          Submit
        </button>
      </form>
      {success && (
        <Signature
          setIsOpen={setSuccess}
          signature={"jhgfdddddddddddsfggbfz"}
        />
      )}
    </div>
  );
};
