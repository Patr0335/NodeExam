<script>
  import { io } from "socket.io-client";

  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import { user } from "../store/writeableStore"; // subscribable variable

  let character = {};
  let items = [];
  let availableItems = [];
  let slots = [];

  onMount(async () => {
    character = await getCharacter();
    slots = await getSlots();
    if (!character || !character.id) {
      navigate(`/characters`, { replace: true });
    }
    character.items.sort((a, b) => a.slotId - b.slotId); // arrow function that compares
    items = await getItems();
    items.sort();
    availableItems = [...items]; // create new instance of an Array and assign it to availableItems.
  });

  async function getSlots() {
    const res = await fetch("/api/slots");
    return res.json();
  }

  async function getCharacter() {
    const res = await fetch(`/api/characters/${$user.id}`); // ${String interpolation} - $user=autosubscription
    return res.json();
  }

  async function getItems() {
    const res = await fetch("/api/items");
    return res.json();
  }

  function getImagePath(slotId) {
    // const currentItem = character.items.find((x) => x.slotId === slotId);
    // return currentItem && currentItem.imagePath
    //   ? `./images/${currentItem.imagePath}`
    //   : "./images/question_mark_white.png";
    return `/images/${
      character.items.find((x) => x.slotId === slotId).imagePath
    }`;
  }

  function getItemBySlotId(slotId) {
    return character.items.find((x) => x.slotId === slotId).itemId;
  }

  function selectedItem(itemId, slotId, index) {
    fetch(`/api/characters/${$user.id}`, {
      headers: {
        "content-type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        itemId,
        slotId,
      }),
    })
      .then((x) => x.json()) // promise chaining. unwrap response.json, returns new promise
      .then((x) => {
        // .then on the new promise which gives me response in json.
        // x er svar fra promise og y er find loopet/den værdi jeg iteraer over i looped.
        const selectedItem = items.find((k) => k.id === +x.itemId);
        const itemIndex = character.items.findIndex((o) => o.slotId === slotId);
        character.items[itemIndex] = selectedItem; // no {} = returns immidiately
        slots = [...slots];
        character = {
          ...character,
          items: [...character.items],
        };
      });
  }

  function hasImagePath(slotId) {
    return character.items.find((x) => x.slotId === slotId);
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
            {#if character && character.class}
              <div class="class-image-container">
                <div class="class-img">
                  <h3 class="char-name">{character.name}</h3>
                  <img
                    src={`./images/${character.class.imagePath}`}
                    alt={character.class}
                  />
                </div>
              </div>
            {/if}
            <div class="character-sheet-container">
              {#if character}
                {#each slots as slot, i}
                  <div class="item-container">
                    <div class="c-box">
                      <img
                        class={hasImagePath(slot.id)
                          ? "char-item"
                          : "question-mark-image"}
                        src={getImagePath(slot.id)}
                        alt="Easteregg Crof"
                      />
                      <select
                        name="items"
                        value={getItemBySlotId(slot.id)}
                        on:change={(y) =>
                          selectedItem(y.target.value, slot.id, i)}
                      >
                        <option value="">Select Item</option>
                        {#each availableItems as availableItem (availableItem)}
                          {#if availableItem.slotId === i + 1}
                            <option value={availableItem.id}
                              >{availableItem.name}
                            </option>
                          {/if}
                        {/each}
                      </select>
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
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
