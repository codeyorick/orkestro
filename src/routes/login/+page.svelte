<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui";
</script>

<form method="POST" use:enhance class="flex flex-col items-center gap-4">
  <input type="email" name="email" class="input" placeholder="Email">
  <input type="password" name="password" class="input" placeholder="Wachtwoord">
  <Button type="submit">Login</Button>
</form>