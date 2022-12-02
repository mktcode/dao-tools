<script lang="ts">
import { writable } from 'svelte/store';
import AddProposal from './lib/AddProposal.svelte'
import ListProposals from './lib/ListProposals.svelte'
import { peer } from './peer'
import { db } from './db'

let myPeerId: string
peer.on('open', (peerId: string) => {
  myPeerId = peerId
})

const quota = writable(0);
navigator.storage.estimate().then((estimate) => {
  $quota = estimate.quota - estimate.usage
})

peer.on('connection', (connection: any) => {
  connection.on('data', async (proposal: any) => {
    await db.proposals.add(proposal)
    navigator.storage.estimate().then((estimate) => {
      $quota = estimate.quota - estimate.usage
    })
  })
})
</script>

<main>
  <h1>Hello Peer {myPeerId}!</h1>
  <h2>Your storage quota: {$quota}</h2>

  <AddProposal />
  <ListProposals />
</main>
