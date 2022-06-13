<script>
  import { onMount } from "svelte";
  



  let classes = [];
  let characters = [];
  let items = [];

  onMount(async () => {
    const res = await fetch("/api/classes");
    classes = await res.json();
  });

  onMount(async () => {
    const res = await fetch("/api/characters/1"); // mangler if logged in 
    characters = await res.json();
  });

  onMount(async () => {
    const res = await fetch("/api/items");
    items = await res.json();
  });

  function getItems() {
    const result = db.execute("SELECT * FROM items");
    return result;
  }

  function selectedItem(itemId, charId) {
    const elem = document.getElementById("selectedValue");

    db.execute(
      `UPDATE Characters SET ${itemId} = ${elem.value} WHERE id == ${charId}`
    );
  }
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
                {#if character.helmSlot == item.id}
                  <div class="card">
                    <div class="c-box c-left">
                      <!-- <label for="items">Choose more items</label> -->
                      <select
                        name="items"
                        id="selectedValue"
                        onchange="selectedItem({item.id}, {character.id})"
                      >
                        {#each items as item}
                          <option value={item}>{item.name}</option>
                        {/each}
                      </select>
                      <img src={item.imagePath} alt={item.name} />
                    </div>
                  </div>
                {/if}
                {#if character.shoulderSlot == item.id}
                  <div class="card">
                    <div class="c-box c-right">
                      <select
                        name="items"
                        id="selectedValue"
                        onchange="selectedItem({item.id}, {character.id})"
                      >
                        {#each items as item}
                          <option value={item}>{item.name}</option>
                        {/each}
                      </select>
                      <img src={item.imagePath} alt={item.name} />
                    </div>
                  </div>
                {/if}
                {#if character.chestSlot == item.id}
                  <div class="card">
                    <div class="c-box c-left">
                      <select
                        name="items"
                        id="selectedValue"
                        onchange="selectedItem({item.id}, {character.id})"
                      >
                        {#each items as item}
                          <option value={item}>{item.name}</option>
                        {/each}
                      </select>
                      <img src={item.imagePath} alt={item.name} />
                    </div>
                  </div>
                {/if}
                {#if character.legsSlot == item.id}
                  <div class="card">
                    <div class="c-box c-right">
                      <select
                        name="items"
                        id="selectedValue"
                        onchange="selectedItem({item.id}, {character.id})"
                      >
                        {#each items as item}
                          <option value={item}>{item.name}</option>
                        {/each}
                      </select>
                      <img src={item.imagePath} alt={item.name} />
                    </div>
                  </div>
                {/if}
                {#if character.weaponSlot == item.id}
                  <div class="card">
                    <div class="c-box c-left">
                      <select
                        name="items"
                        id="selectedValue"
                        onchange="selectedItem({item.id}, {character.id})"
                      >
                        {#each items as item}
                          <option value={item}>{item.name}</option>
                        {/each}
                      </select>
                      <img src={item.imagePath} alt={item.name} />
                    </div>
                  </div>
                {/if}
                {#if character.offhandSlot == item.id}
                  <div class="card">
                    <div class="c-box c-right">
                      <select
                        name="items"
                        id="selectedValue"
                        onchange="selectedItem({item.id}, {character.id})"
                      >
                        {#each items as item}
                          <option value={item}>{item.name}</option>
                        {/each}
                      </select>
                      <img src={item.imagePath} alt={item.name} />
                    </div>
                  </div>
                {/if}
              {/each}
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
