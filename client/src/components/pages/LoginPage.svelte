<script>
  import { navigate } from "svelte-navigator";
  import { toast } from "@zerodevx/svelte-toast";
  import { user } from "../store/writeableStore";




  //################################### LOGIN

  let newUser = {};
  let errorMessage = "";
  let responseMessage = "";
  async function signupUser() {
    if (
      newUser?.username &&
      newUser?.username.length >= 4 &&
      newUser?.password &&
      newUser?.password.length >= 4
    ) {
      const res = await fetch(`/api/signup`, {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newUser),
      });

      responseMessage = await res.text();
      if (res.status === 200) {
        errorMessage = "";
        setTimeout(() => {
          toast.push("Signup was a success. You can now login");
          navigate("/profile", { replace: true });
        }, 1500);
      }
    } else {
      errorMessage =
        "Username or Password doesn't meet its required length of 4";
      toast.push("ERROR", {
        theme: {
          "--toastBackground": "#F56565",
          "--toastBarBackground": "#C53030",
        },
      });
    }
  }

  async function login() {
    const res = await fetch(`/api/login`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newUser),
    });
    responseMessage = await res.json(); 
    if (res.status === 200) {
      // $user = JSON.parse(res.json);
      console.log(responseMessage)
      $user = {...responseMessage}

      navigate("/profile", { replace: true });
    } else {
      toast.push("User doesnt exist", {
        theme: {
          "--toastBackground": "#F56565",
          "--toastBarBackground": "#C53030",
        },
      });
    }
  }

</script>
<body class="fpbody">
  <div class="">
    <div class="fpdiv1">
      <p
          style="color: #fff; font-size: 48px; max-width: 1000px; text-align: center; margin: 0;"
        >
          Login/Register to see your profile 
        </p>
      <div class="fpdiv2"
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
            <label style="color: #fff; font-size: 15px; max-width: 1000px;">Email</label>
            <input type="text" placeholder="Email" bind:value={newUser.username} />
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label style="color: #fff; font-size: 15px; max-width: 1000px;">Password</label>
            <input
              type="password"
              placeholder="Password"
              bind:value={newUser.password}
            />
            <small class="signup-error-message">
              {errorMessage}
            </small>
            <button type="button" class="btn btn-black" on:click={() => login()}
              >Login</button
            >
            <button type="button" on:click={() => signupUser()}>Register</button>
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



<style>
  /* .background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }

  .login-box {
    position: fixed;
    margin: 20vh auto;
    height: 200px;
    width: 400px;
    color: white;
    z-index: 5;
    padding: 15px;
    background-color: rgb(7, 7, 7);
    border: solid 5px white;
  } */

  .btn-black {
    background-color: #000 !important;
    color: #fff;
  }

  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 8rem;
    --toastContainerLeft: calc(50vw - 8rem);
  }

  .signup-error-message {
    color: red;
    font-weight: 500;
  }
</style>
