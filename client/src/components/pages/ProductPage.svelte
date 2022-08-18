<script>
  import { onMount } from "svelte";
  import Cart from "./Cart.svelte";
  import Product from "./Product.svelte";


  let products = [];

  onMount(async () => {
    products = await getMerch();
  });

  async function getMerch() {
    const res = await fetch("/api/products");
    return res.json();
  }

</script>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
  integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
  crossorigin="anonymous"
/>

<body class="fpbody">
  <div class="fpdiv1">
    <div
      class="fpdiv2"
      style="display:flex; flex-direction: column; justify-content: center;align-items: center;flex: 1;"
    >
      <!-- svelte-ignore a11y-missing-attribute -->
      <img
        style="max-height: 300px;"
        src="https://blz-contentstack-images.akamaized.net/v3/assets/blt77f4425de611b362/blt7dd71188aff1b9cb/6131015b8ae2653b28a72a8c/di-logo-960.png"
      />

      <p
        style="color: #fff; font-size: 48px; max-width: 1000px; text-align: center; margin: 0;"
      >
        Welcome to the Diablo Immortal Merchandise!
      </p>
    </div>
    <div class="home container">
      <div class="row">
        <div class="col-md-9 pt-5">
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3"
          >
            {#each products as product}
            
            <Product {product}/>
                    
            {/each}
          </div>
        </div>
        <div class="col-md-3 pt-5">
          <Cart />
        </div>
      </div>
    </div>
  </div>
</body>
