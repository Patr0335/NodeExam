<script>
  import { onMount } from "svelte";

  let classes = [];
  let characters = [];
  let items = [];

  onMount(async () => {
    classes = await getClasses();
    characters = await getChars();
    items = await getItems();
  });

  async function getClasses() {
    const res = await fetch("/api/classes");
    return res.json();
  }

  async function getItems() {
    const res = await fetch("/api/items");
    return res.json();
  }

  async function getChars() {
    const res = await fetch("/api/characters");
    return res.json();
  }
</script>

<body class="fpbody">
  <div class="">
    <div class="fpdiv1">
      <p
        style="color: #fff; font-size: 48px; max-width: 1000px; text-align: center; margin: 0;"
      >
        Welcome to the Diablo Immortal Armory!
      </p>
      <p
        style="color: #fff; font-size: 32px; max-width: 1000px; text-align: center; margin: 10;"
      >
        Search for a character name
      </p>
      <div class="search-wrapper">
        <!-- <label for="search">Search Characters</label> -->
        <input type="search" id="search" placeholder="Character Name" />
      </div>
      <div
        class="fpdiv2"
        style="display:flex; flex-direction: column; justify-content: center;align-items: center;flex: 1;"
      >
        <div class="" style="text-align: center; margin-top: 12px;">
          <div class="pos">
            {#each characters as character}
              {#each classes as c}
                {#if character.class == c.id}
                  <div class="card">
                    <div class="class-img">
                      <img src={c.imagePath} alt={c.class} />
                      <h3>{character.name}</h3>
                    </div>
                  </div>
                {/if}
              {/each}
              {#each items as item}
                <div class="card">
                  <div class="c-box c-left">
                    <!-- <label for="items">Choose more items</label> -->
                    <img src={item.imagePath} alt={item.name} />
                  </div>
                </div>
              {/each}
            {/each}
          </div>
          <!-- <button
            style="padding: 12px 24px;width: 50%;background-color: transparent;color: white;border: 1px solid white;/* text-align: center; */"
            href="/Login"
            >Save Changes
          </button> -->

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
