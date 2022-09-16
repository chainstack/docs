---
meta:
  - name: description
    content: eth/v1/events Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain nimbus eth2
---

# eth/v1/events

Provides endpoint to subscribe to beacon node Server-Sent-Events stream. Consumers should use the [eventsource](https://html.spec.whatwg.org/multipage/server-sent-events.html#the-eventsource-interface) implementation to listen on those events.

Servers may send SSE comments beginning with `:` for any purpose, including to keep the event stream connection alive in the presence of proxy servers.

**Parameters:** 

* `topics` — `array` — `string` - (Required) Event types to subscribe to. Available values:
  * `head` — The canonical head of the chain in the view of the node that you sending the call to.
  * `block` — The block number.
  * `attestation` — [Attestation](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/).
  * `voluntary_exit` — The [VoluntaryExit](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#voluntaryexit) object.
  * `finalized_checkpoint` — The [Checkpoint](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#checkpoint) object.
  * `chain_reorg` — The chain reorgs topic.
  * `contribution_and_proof` — The [ContributionAndProof](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/validator.md#contributionandproof) object.

**Returns:** 

* `data` - `object`:
  * `slot` - `string`
  * `block` - `string`
  * `state` - `string`
  * `epoch_transition` - `boolean`
  * `previous_duty_dependent_root` - `string`
  * `current_duty_dependent_root` - `string`
  * `execution_optimistic` - `boolean`

**Example:**

``` sh
curl -H "accept: text/event-stream" -X GET "https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/events?topics=head"
```
