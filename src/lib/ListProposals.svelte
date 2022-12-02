<script lang='ts'>
  import { liveQuery } from 'dexie';
  import { db } from '../db';

  let proposals = liveQuery(
    () => db.proposals.toArray()
  );
</script>

<ul>
  {#if $proposals}
    {#each $proposals as proposal (proposal.id)}
      <li>{proposal.id}: {proposal.title}</li>
    {/each}
  {/if}
</ul>