<script>
  import { navigate } from "svelte-navigator";
  import { toast } from "@zerodevx/svelte-toast";
  import { user } from "../store/writeableStore";
  import { onMount } from "svelte";
  import { validate_each_argument, xlink_attr } from "svelte/internal";

  let classSelect = {};
  let classCreate = {};
  let classArr = [];

  onMount(async () => {
    classArr = await fetch("/api/classes");
  });

  function selectedClass(classId) {
    classCreate = classId;
  }

  async function createProfile() {
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
        Create your own Character!
      </p>
      <div
        class="fpdiv2"
        style="display:flex; flex-direction: column; justify-content: center;align-items: center;flex: 1;"
      >
        <!-- svelte-ignore a11y-missing-attribute -->
        <img
          style="max-height: 300px;"
          src="https://blz-contentstack-images.akamaized.net/v3/assets/blt77f4425de611b362/blt7dd71188aff1b9cb/6131015b8ae2653b28a72a8c/di-logo-960.png"
        />
        <div>
          <form>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label style="color: #fff; font-size: 15px; max-width: 1000px;"
              >Class</label
            >
            <select
              name="class"
              value=""
              on:change={(x) => selectedClass(x.target.value)}
            >
              {#each classArr as classes (classes)}
                <option value={classes.id} > {classes.name} </option>
              {/each}
            </select>

            <!-- svelte-ignore a11y-label-has-associated-control -->
            
          </form>
        </div>

        <div class="" style="text-align: center; margin-top: 12px;">
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


 
