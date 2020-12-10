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
import { Transferred } from "../generated/schema"

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
