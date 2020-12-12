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
import { Transferred, Minter } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let transfer = new Transferred(event.transaction.hash.toHex())
  transfer.value =  event.params.value
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.value = event.transaction.value
  transfer.timestamp = event.block.timestamp
  transfer.transactionHash = event.transaction.hash
  transfer.save()
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
