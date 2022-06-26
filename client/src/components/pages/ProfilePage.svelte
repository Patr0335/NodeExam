<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import { user } from "../store/writeableStore"; // subscribable variable

  let character = {};
  let items = [];
  let availableItems = [];

  onMount(async () => {
    character = await getChar();
    character.items.sort((a, b) => a.slotId - b.slotId);
    items = await getItems();
    availableItems = [...items]; // create new instance of an Array and assign it to availableItems.
  });

  async function getChar() {
    const res = await fetch(`/api/characters/${$user.id}`); // ${String interpolation} - $user=autosubscription
    return res.json();
  }

  async function getItems() {
    const res = await fetch("/api/items");
    return res.json();
  }

  function selectedItem(itemId, slotId, index) {
    fetch(`/api/characters/${$user.id}`, {
      headers: {
        "content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        itemId,
        slotId,
      }),
    })
      .then((x) => x.json()) // promise chaining. forfillment of my fetch call from line 28. unwrap response.json, returns new promise
      .then((x) => {
        // .then on the new promise which gives me response in json.

        const items = [...character.items];
        items[index].itemId = +x.itemId;
        character = { ...character, items };
      });
  }

  async function logout() {
    const res = await fetch(`/api/logout`);
    navigate("/", { replace: true });
    $user = null;
  }
</script>

<body class="fpbody">
  <div class="">
    <div class="fpdiv1">
      <button class="button" on:click={logout}>Logout</button>
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
            {#if character && character.class}
              <div class="card1">
                <div class="class-img">
                  <img
                    src={`./images/${character.class.imagePath}`}
                    alt={character.class}
                  />
                  <h3>{character.name}</h3>
                </div>
              </div>
            {/if}
            {#if character && character.items && character.items.length > 0}
              {#each character?.items as item, i}
                <div class="card1">
                  <div class="c-box c-left">
                    <!-- <label for="items">Choose more items</label> -->
                    <select
                      name="items"
                      id="selectedValue"
                      bind:value={item.id}
                      on:change={(y) =>
                        selectedItem(y.target.value, item.slotId, i)}
                    >
                      {#each availableItems as availableItem (availableItem.id)}
                        <!-- we use id for value but display availableItem.name -->
                        <option value={availableItem.id}
                          >{availableItem.name}
                        </option>
                      {/each}
                    </select>
                    <img src={`./images/${item.imagePath}`} alt={item.name} />
                  </div>
                </div>
              {/each}
            {/if}
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
