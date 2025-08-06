<script lang="ts">
  import { Button } from "$lib/components/ui";

  let { data } = $props()
</script>

<p>Logged in as {data.session?.user.email}</p>

<form action="/logout" method="GET">
  <Button type="submit" class="btn-error">Logout</Button>
</form>
