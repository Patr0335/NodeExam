<script>
  import Cart from "./Cart.svelte";
  import CartItem from "./CartItem.svelte";
  import { cart } from "../store/writeableStore";
</script>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
  integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
  crossorigin="anonymous"
/>

<body>
  <div class="home container">
    <div class="row">
      <div class="col-md-8 pt-5">
        {#each $cart as product}
          <CartItem {product} />
        {/each}
      </div>
      <div class="col-md-4 pt-5">
        <Cart />
      </div>
    </div>
  </div>
</body>
