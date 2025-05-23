import { z } from "zod";
import { isAddress, isHex } from "viem";
import type { Address, Hex } from "viem";

export const hexSchema = z.string().refine(
  (val): val is Hex => isHex(val),
  "Invalid hex string"
);

export const addressSchema = z.string().refine(
  (val): val is Address => isAddress(val),
  "Invalid Ethereum address"
);

export const validateAddress = (value: Address, paramName: string = "value"): Address => {
  if (!isAddress(value)) {
    throw new Error(`Invalid ${paramName}: ${value}`);
  }
  return value;
};

export const validateBytes32 = (value: Hex): Hex => {
  if (!isHex(value) || value.length !== 66) {
    throw new Error(`Invalid: must be a 0x-prefixed hex string of 64 characters`);
  }
  return value;
}; 

export function validateNetwork(value: string): string {
  if (!value || typeof value !== "string") {
    throw new Error("Network identifier must be a non-empty string");
  }
  return value;
}

export const validateBigIntString = (value: string, paramName: string = "value"): string => {
  try {
    BigInt(value);
    return value;
  } catch {
    throw new Error(`Invalid ${paramName}: must be a valid number string`);
  }
}; 