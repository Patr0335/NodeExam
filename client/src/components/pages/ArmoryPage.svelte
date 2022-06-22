<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";

  let characters = [];
  let items = [];

  onMount(async () => {
    characters = await getChars();
    // items = await getItems();
  });

  // async function getItems() {
  //   const res = await fetch("/api/items");
  //   return res.json();
  // }

  async function getChars() {
    const res = await fetch("/api/characters");
    return res.json();
  }

  async function navigateDetail(characterId) {
    navigate(`/armory/${characterId}`, { replace: true });
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
        <button>Find Character</button>
      </div>
      <p
        style="color: #fff; font-size: 32px; max-width: 1000px; text-align: center; margin: 10;"
      >
        List of all characters
      </p>
      <div
        class="fpdiv2"
        style="display:flex; flex-direction: column; justify-content: center;align-items: center;"
      >
        <div class="" style="text-align: center; margin-top: 12px;">
          <div class="pos">
            {#if characters && characters.length > 0}
              {#each characters as character}
                <div class="card" on:click={navigateDetail(character.id)}>
                  <div class="class-img">
                    <h3>{character.name}</h3>
                  </div>
                </div>
              {/each}
            {/if}
            <!-- {#if characters && characters.items && characters.items.length > 0}
              {#each characters?.items as item}
                <div class="card">
                  <div class="c-box c-left">
                    
                    <img src={item.imagePath} alt={item.name} />
                  </div>
                </div>
              {/each}
            {/if} -->
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

<style lang="css">
  .pos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    
    gap: 16px;
  }

  .card {
    background-color: white;
    cursor: pointer;
  }
</style>
