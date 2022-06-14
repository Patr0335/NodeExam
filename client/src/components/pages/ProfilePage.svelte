<script>
  import { onMount } from "svelte";
  import { user } from "../store/writeableStore";

  let classes = []; // global variable
  let characters = [];
  let items = [];
  let availableItems = [];
  let selecteds = [];

  console.log("geh");
  onMount(async () => {
    console.log("heh");
    classes = await getClasses();
    characters = await getChars();
    items = await getItems();
    availableItems = [...items];
    availableItems.forEach((x, i) => {
      selecteds.push(i + 1);
    });
  });

  async function getClasses() {
    const res = await fetch("/api/classes");
    return res.json();
  }

  async function getChars() {
    const res = await fetch(`/api/characters/${$user.id}`);
    return res.json();
  }

  async function getItems() {
    const res = await fetch("/api/items");
    return res.json();
  }

  // function getItems() {
  //   const result = db.execute("SELECT * FROM items");
  //   return result;
  // }

  function selectedItem(itemId, index) {
    console.log(itemId);
    console.log(index);
    console.log(availableItems);
    console.log(items);
    // items.findIndex(x => x.id === itemId)
    const some = availableItems.find((x) => {
      console.log("----------------", x.id, itemId);
      return +x.id === +itemId;
    });
    console.log(some);
    items[index] = some;
    console.log(items);

    // db.execute(
    //   `UPDATE Characters SET ${itemId} = ${elem.value} WHERE id == ${charId}`
    // );
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
              {#each items as item, i}
                <div class="card">
                  <div class="c-box c-left">
                    <!-- <label for="items">Choose more items</label> -->
                    <select
                      name="items"
                      id="selectedValue"
                      bind:value={selecteds[i]}
                      on:change={(y) => selectedItem(y.target.value, i)}
                    >
                      {#each availableItems as availableItem (availableItem.id)}
                        <option value={availableItem.id}
                          >{availableItem.name}
                        </option>
                      {/each}
                    </select>
                    <img src={item.imagePath} alt={item.name} />
                  </div>
                </div>
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
