import { BigInt } from "@graphprotocol/graph-ts"
import {
  COFIX,
  Approval,
  DelegateChanged,
  DelegateVotesChanged,
  MinterAdded,
  MinterRemoved,
  NewGovernance,
  Transfer
} from "../generated/COFIX/COFIX"
import { Transferred, Minter, TokenHolder } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let transfer = new Transferred(event.transaction.hash.toHex())
  transfer.value =  event.params.value
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.value = event.transaction.value
  transfer.timestamp = event.block.timestamp
  transfer.transactionHash = event.transaction.hash
  transfer.save()

  let tokenholderFrom = TokenHolder.load(event.params.from.toHex())
  if (tokenholderFrom == null) {
    tokenholderFrom = new TokenHolder(event.params.from.toHex())
    tokenholderFrom.count = BigInt.fromI32(1)
  }
  tokenholderFrom.balance = tokenholderFrom.balance.minus(event.params.value)
  tokenholderFrom.transactionCount = tokenholderFrom.transactionCount.plus(BigInt.fromI32(1))
  tokenholderFrom.count = tokenholderFrom.count.plus(BigInt.fromI32(1))
  tokenholderFrom.save()

  let tokenholderTo = TokenHolder.load(event.params.to.toHex())
  if (tokenholderTo == null) {
    tokenholderTo = new TokenHolder(event.params.to.toHex())
    tokenholderTo.count = BigInt.fromI32(1)
  }

  tokenholderTo.balance = tokenholderTo.balance.plus(event.params.value)
  tokenholderTo.transactionCount = tokenholderTo.transactionCount.plus(BigInt.fromI32(1))
  tokenholderTo.count = tokenholderTo.count.plus(BigInt.fromI32(1))
  tokenholderTo.save()
}

export function handleMinterAdded(event: MinterAdded): void {
  let minter = Minter.load(event.address.toHex())
  if (minter == null) {

    minter = new Minter(event.address.toHex())
    minter.address = event.address.toHex()
    minter.count = BigInt.fromI32(1)
  }
  minter.count = minter.count.plus(BigInt.fromI32(1))
  minter.save()
}

export function handleMinterRemoved(event: MinterRemoved): void {
  let minter = Minter.load(event.address.toHex())
  if (minter == null) {

    minter = new Minter(event.address.toHex())
    minter.address = event.address.toHex()
    minter.count = BigInt.fromI32(1)
  }  
  minter.count = minter.count.plus(BigInt.fromI32(1))
  minter.save()
}
