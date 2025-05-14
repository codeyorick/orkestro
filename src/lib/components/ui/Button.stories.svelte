<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Button from "$lib/components/ui/Button.svelte";

  const { Story } = defineMeta({
    title: "UI/Button",
    component: Button
  })
</script>

<Story name="Default"/>