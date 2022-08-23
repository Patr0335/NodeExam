<script>
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import { io } from "socket.io-client";

  let character = {};
  const params = useParams();
  let slots = [];

  const socket = io("ws://localhost:9000");

  socket.on("character", (x) => {
    character = x;
    slots = [...slots];
  });

  onMount(async () => {
    character = await getChar($params.characterId);
    slots = await getSlots();
  });

  async function getChar(characterId) {
    const res = await fetch(`/api/characters/${characterId}`);
    return res.json();
  }
  async function getSlots() {
    const res = await fetch(`/api/slots`);
    return res.json();
  }

  function getImagePath(slotId) {
    const currentItem = character.items.find((x) => x.slotId === slotId);
    return currentItem && currentItem.imagePath
      ? `/images/${currentItem.imagePath}`
      : "/images/question_mark_white.png";
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
              <div class="card">
                <div class="class-img">
                  <h3 class="char-name">{character.name}</h3>
                  <img
                    src={`../images/${character.class.imagePath}`}
                    alt={character.class}
                  />
                </div>
              </div>
            {/if}
            <div class="character-sheet-container">
              {#if character}
                {#each slots as slot}
                  <div class="item-container">
                    <div class="c-box c-left">
                      <img
                        class={hasImagePath(slot.id)
                          ? "slot-image"
                          : "question-mark-image"}
                        src={`${getImagePath(slot.id)}`}
                        alt={slot.name}
                      />
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
