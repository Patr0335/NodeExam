<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../store/writeableStore";
  </script>
  
  {#if $user?.isAdmin}
    <slot />
    {:else}
    Page is restricted.
  {/if}