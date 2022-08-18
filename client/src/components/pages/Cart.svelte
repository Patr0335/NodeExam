<script>
  import { cart } from "../store/writeableStore";
  import { navigate } from "svelte-navigator";

  $: totalPrice = $cart.reduce((total, next) => {
    console.log($cart);
    return total + next.quantity * next.price;
  }, 0);


  async function navigateCheckout() {
    navigate(`/Shop`, { replace: true });
  }

</script>

<div class="card">
  <div class="card-body">
    <h5 class="card-title">Your Cart</h5>
    {#if $cart.length == 0}
      <p>Your Cart is Empty</p>
    {/if}
  </div>
  <ul class="list-group list-group-flush">
    {#each $cart as item}
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
    {item.name}
      <span class="badge badge-primary badge-pill">{item.quantity}</span>
    </li>
    {/each}
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
    Price <b>${totalPrice}</b>
    </li>
  </ul>

  <div class="card-body">
    <div on:click={navigateCheckout} href="#" class="btn btn-primary btn-block">Checkout</div>
  </div>
</div>
