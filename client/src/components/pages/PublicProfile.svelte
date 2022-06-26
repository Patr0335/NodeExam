<style lang="css">
  @import '../../public/PublicProfile.css';
</style>

<script>
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import { io } from "socket.io-client";

  let character = {};
  const params = useParams();

  const socket = io("ws://localhost:9000");

  socket.on("character", (x) => {
    character = x;
  });

  onMount(async () => {
    socket.connect()
    console.log($params)
    character = await getChar($params.characterId);
  });

  async function getChar(characterId) {
    const res = await fetch(`/api/characters/${characterId}`);
    return res.json();
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
                  <img src={`../images/${character.class.imagePath}`} alt={character.class} />
                  <h3>{character.name}</h3>
                </div>
              </div>
            {/if}
            {#if character && character.items && character.items.length > 0}
              {#each character?.items as item}
                <div class="card">
                  <div class="c-box c-left">
                    <img src={`../images/${item.imagePath}`} alt={item.name} />
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
