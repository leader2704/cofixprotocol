# cofixprotocol

This Subgraph is deployed to exposes a GraphQL endpoint to query the events and entities within the CoFix ecosytem based on their [Smart Contract](https://etherscan.io/address/0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1). 

### There are entities that can be queried right now which are
* Transfer
* Minters


### Example Queries will be displayed like this
```
{
  transferreds(first: 5) {
    id
    value
    from
    to
  }
  minters(first: 5) {
    id
    address
    count
    added
  }
}
```
Find out more [here](https://thegraph.com/explorer/subgraph/leader2704/cofix-protocol)

Join [The Graph Discord](https://discord.com/invite/vtvv7FP) to receive support from the most amazing community in crypto.
