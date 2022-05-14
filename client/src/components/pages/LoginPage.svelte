<script>
  import { navigate } from "svelte-navigator";
  import { toast } from "@zerodevx/svelte-toast";
  import { createEventDispatcher } from "svelte";
  import {fly, fade} from "svelte/transition";

  //################################### LOGIN

  let newUser = {};
  let errorMessage = "";
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
          navigate("/", { replace: true });
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
    responseMessage = await res.text();
    if (res.status === 200) {
      navigate("/frontPage", { replace: true });
    } else {
      toast.push("User doesnt exist", {
        theme: {
          "--toastBackground": "#F56565",
          "--toastBarBackground": "#C53030",
        },
      });
    }
  }


  const dispatch = createEventDispatcher();

  function close() {
    dispatch('closeIt');
  }
</script>

<div class="background" transition:fade on:click={close}/>
<div class="login-box" transition:fly={{y: -500}}>
    <form>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>Email</label>
      <input
        type="text"
        placeholder="Email"
        bind:value={newUser.username}
      />
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>Password</label>
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
      <button
        type="button"
        on:click={() => signupUser()}>Register</button
      >
      
    </form>
</div>

<style>
  .background {
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
  }

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
