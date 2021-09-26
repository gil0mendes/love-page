<script lang="ts">
  import { onMount } from "svelte";

  onMount(async () => {
    // @ts-ignore
    await import("https://unpkg.com/@elementarium/lovepage-button/dist/lovepage-button.js");
  });
</script>

<love-page-button id="lovePageBtn" compact />
