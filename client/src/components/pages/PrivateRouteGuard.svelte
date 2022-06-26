<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../store/writeableStore";
  
    const navigate = useNavigate();
    const location = useLocation();
    $: if (!$user) {
      navigate("/login", {
        state: { from: $location.pathname },
        replace: true,
      });
    }
  </script>
  
  {#if $user?.id}
    <slot />
  {/if}