<script lang="ts">
import { db, Proposal } from "../db";
import { peer } from '../peer'

async function addProposal() {
  const proposal: Proposal = {
    from: '0x123',
    to: '0x456',
    title: 'Proposal Title',
    body: 'Proposal Body',
  }

  try {
    await db.proposals.add(proposal)
  } catch (error) {
    console.error('Failed to add proposal:', error)
  }

  peer.listAllPeers((peers: string[]) => {
    peers.forEach((peerId: string) => {
      const connection = peer.connect(peerId)
      connection.on('open', () => {
        connection.send(proposal)
      })
    })
  })
}
</script>

<button on:click={addProposal}>
  Add Proposal
</button>
