<script lang="ts">
    import type { Snippet } from "svelte";

  interface Props {
    /** The onclick event handler */
    onClick?: () => void;
    /** Content of the button */
    children: Snippet;
    /** Additional props*/
    [key:string]: any;
  }

  let { children, style = 'neutral', ...rest }: Props = $props()
</script>

<button aria-label="button" {...rest} class={["btn", rest.class]}>
  {@render children?.()}
</button>