import React from "react";

type SignatureProps = {
  signature: string;
  setIsOpen: (param: boolean) => void;
};

export const Signature = (props: SignatureProps) => {
  const { signature, setIsOpen } = props;
  return (
    <div className="absolute bottom-0 right-0 rounded-full bg-violet-300 py-3 px-4 text-violet-50 w-max uppercase">
      Success! Transaction #{signature}
      <button
        className="ml-4"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        x
      </button>
    </div>
  );
};
