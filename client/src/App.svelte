<script>
  import { Router, Link, Route } from "svelte-navigator";
  import PrivateRoute from "./components/pages/PrivateRoute.svelte";
  import AdminRoute from "./components/pages/AdminRoute.svelte";
  import FrontPage from "./components/pages/FrontPage.svelte";
  import LoginPage from "./components/pages/LoginPage.svelte";
  import AdminPage from "./components/pages/AdminPage.svelte";
  import ArmoryPage from "./components/pages/ArmoryPage.svelte";
  import ProfilePage from "./components/pages/ProfilePage.svelte";
  import PublicProfile from "./components/pages/PublicProfile.svelte";
  import ProductPage from "./components/pages/ProductPage.svelte";
  import CreateYourProfile from "./components/pages/CreateYourProfile.svelte";
  import ShoppingCart from "./components/pages/ShoppingCart.svelte";
  import { user } from "./components/store/writeableStore";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { navigate } from "svelte-navigator";

  const options = {
    theme: {
      "--toastBackground": "#48BB78",
      "--toastBarBackground": "#2F855A",
      reversed: true,
      intro: { y: 192 },
    },
  };

  async function logout() {
    await fetch(`/api/logout`);
    navigate("/", { replace: true });
    $user = null;
  }

</script>

<main>
  <Router primary={false}>
    <nav class="Nav-style">
      <ul class="ul-style">
        <li class="li-style">
          <img class="imglogo" src="/images/navlogo.png" alt="..." />
        </li>

        <li class="li-style">
          <Link to="/"><button class="button" to="/">Home</button></Link>
        </li>

        <li class="li-style">
          <Link to="/armory"
            ><button class="button" to="/armory">DI-Armory</button></Link
          >
        </li>

        <li class="li-style">
          <Link to="/products"
            ><button class="button" to="/products">DI-Merchandise</button></Link
          >
        </li>

        <li class="li-style">
          <Link to="/profile"
            ><button class="button" to="/profile">Profile</button></Link
          >
        </li>

        <!-- Optional chaining -->
        {#if $user?.isAdmin}
          <li class="li-style">
            <Link to="/admin"
              ><button class="button" to="/admin">Admin Page</button></Link
            >
          </li>
        {/if}

        {#if $user}
          <li class="li-style">
            <button class="button" on:click={logout}>Logout</button>
          </li>
        {/if}
      </ul>
    </nav>
    <Route path="/login" component={LoginPage} />
    <Route path="/" component={FrontPage} />
    <SvelteToast {options} />
    <Route path="/armory" component={ArmoryPage} />
    <Route path="/armory/:characterId" component={PublicProfile} />
    <Route path="/products" component={ProductPage} />
    <Route path="/Shop" component={ShoppingCart} />
    <Route path="/characters" component={CreateYourProfile} />

    <PrivateRoute path="/profile">
      <ProfilePage />
    </PrivateRoute>

    <PrivateRoute path="/admin">
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    </PrivateRoute>
  </Router>
</main>

<style>
  main {
    text-align: center;
    margin: 0;
  }

  .Nav-style {
    align-self: end;
    background-color: black;
  }

  .ul-style {
    display: flex;
    list-style: none;
    margin: 0;
    background-color: black;
  }

  .li-style {
    padding: 0 20px;
    color: white;
    font-size: 48px;
    font-weight: 600;
    cursor: default;
  }

  .button {
    background-color: Transparent;
    color: white;
    border: none;
    text-transform: uppercase !important;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 0.95rem;
    color: #fff;
    letter-spacing: 0.0625em;
    transition-duration: 0.4s;
  }

  .button:hover {
    background: #000;
    color: rgb(158, 36, 36);
    cursor: pointer;
  }

  .imglogo {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: -6px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
