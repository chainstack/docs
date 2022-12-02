---
meta:
  - name: description
    content: eth/v1/events Beacon Chain REST API call details and examples.
  - name: keywords
    content: curl rest api beacon chain lighthouse gnosis
---

# eth/v1/events API method

Provides an endpoint to subscribe to the beacon node Server-Sent-Events stream. Consumers should use the [eventsource](https://html.spec.whatwg.org/multipage/server-sent-events.html#the-eventsource-interface) implementation to listen on those events.

Servers may send SSE comments beginning with `:` for any purpose, including to keep the event stream connection alive in the presence of proxy servers.

**Parameters:**

* `topics` — `array` — `string` — (required) the event types to subscribe to. Available values:
  * `head` — the canonical head of the chain in the view of the node that you are sending the call to.
  * `block` — the block number.
  * `attestation` — the [Attestation](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/attestations/) object.
  * `voluntary_exit` — the [VoluntaryExit](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#voluntaryexit) object.
  * `finalized_checkpoint` — the [Checkpoint](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#checkpoint) object.
  * `chain_reorg` — the chain reorgs topic.
  * `contribution_and_proof` — the [ContributionAndProof](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/validator.md#contributionandproof) object.

**Returns:**

* `data` — `object` with:
  * `slot` — `string` — the slot number.
  * `block` — `string` — the block number.
  * `state` — `string` — the current state.
  * `epoch_transition` — `boolean` — shows if it was an epoch transition.
  * `previous_duty_dependent_root` — `string` — the previous duty dependent root hash.
  * `current_duty_dependent_root` — `string` — the current duty dependent root hash.
  * `execution_optimistic` — `boolean` —  `true` if the response references an unverified execution payload, otherwise `false`.

**Example:**

``` sh
curl -H "accept: text/event-stream" -X GET "https://beacon-nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d/eth/v1/events?topics=head"
```
