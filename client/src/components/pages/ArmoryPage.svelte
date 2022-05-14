<script>
    import { onMount } from "svelte";

let classes = [];

onMount(async () => {
        const res = await fetch("/api/classes");
        classes = await res.json();
        
    })

</script>



<body class="fpbody">
  <div class="">
    <div class="fpdiv1">
        <p
          style="color: #fff; font-size: 48px; max-width: 1000px; text-align: center; margin: 0;"
        >
          Welcome to your personal Armory Profile
        </p>
      <div
        class="fpdiv2"
        style="display:flex; flex-direction: column; justify-content: center;align-items: center;flex: 1;"
      >
        

        <div class="" style="text-align: center; margin-top: 12px;">
          <button
            style="padding: 12px 24px;width: 50%;background-color: transparent;color: white;border: 1px solid white;/* text-align: center; */"
            href="/Login"
            >Save Changes
          </button>

          <div class="pos">
            {#each classes as classes}
        
        
                <div class="card">
                    <div class="container">
                        <img src={classes.imagePath} alt={classes.class}>
                        <h3>{classes.class}</h3>
                        
                    </div>
                </div>
        
        
                {:else}
                    <p>Loading.....</p>
            {/each}
        </div>


          <p
            style="text-transform: uppercase; font-size: 24px; color: #aaaaaa; margin: 0; text-align: center; margin: 24px 0 0 0"
          >
            MMO ACTION RPG • FREE TO PLAY
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
