import { z } from "zod";
import { isAddress, isHex } from "viem";

export const AddressSchema = z.string().refine(isAddress, { message: "Invalid Ethereum address" });
export const HexStringSchema = z.string().refine(isHex, { message: "Invalid hex string" });
export const HexStringArraySchema = z.array(HexStringSchema);
export const Bytes32Schema = HexStringSchema.refine(str => str.length === 66, { message: "bytes32 must be a 0x-prefixed hex string of 64 characters." });
export const BigIntStringSchema = z.string().regex(/^\d+$/, "Invalid bigint string (must be all digits).");

export const PrepareMulticallParamsSchema = z.object({
  encodedCalls: HexStringArraySchema,
});

export const PrepareDelegateAllParamsSchema = z.object({
  delegateeAddress: AddressSchema,
  rights: Bytes32Schema,
  enable: z.boolean(),
});

export const PrepareDelegateContractParamsSchema = z.object({
  delegateeAddress: AddressSchema,
  contractToDelegate: AddressSchema,
  rights: Bytes32Schema,
  enable: z.boolean(),
});

export const PrepareDelegateERC721ParamsSchema = z.object({
  delegateeAddress: AddressSchema,
  contractToDelegate: AddressSchema,
  tokenId: BigIntStringSchema,
  rights: Bytes32Schema,
  enable: z.boolean(),
});

export const PrepareDelegateERC20ParamsSchema = z.object({
  delegateeAddress: AddressSchema,
  contractToDelegate: AddressSchema,
  rights: Bytes32Schema,
  amount: BigIntStringSchema,
});

export const PrepareDelegateERC1155ParamsSchema = z.object({
  delegateeAddress: AddressSchema,
  contractToDelegate: AddressSchema,
  tokenId: BigIntStringSchema,
  rights: Bytes32Schema,
  amount: BigIntStringSchema,
});
