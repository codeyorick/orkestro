<script lang="ts">
  import { Button } from "$lib/components/ui";
  import { goto } from "$app/navigation";

  let { data } = $props()
</script>

<p>Logged in as {data.user?.name}</p>

<Button onclick={() => goto("/logout")} class="btn-error">Logout</Button>