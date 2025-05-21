import { isAddress, isHex } from "viem";

export const validateAddress = (value: string, paramName: string = "address") => {
  if (!isAddress(value)) {
    throw new Error(`Invalid Ethereum ${paramName}: ${value}`);
  }
  return value;
};

export const validateBytes32 = (value: string, paramName: string = "bytes32") => {
  if (!isHex(value) || value.length !== 66) {
    throw new Error(`Invalid ${paramName}: must be a 0x-prefixed hex string of 64 characters`);
  }
  return value;
};

export const validateBigIntString = (value: string, paramName: string = "value") => {
  try {
    BigInt(value);
    return value;
  } catch {
    throw new Error(`Invalid ${paramName}: must be a valid number string`);
  }
};