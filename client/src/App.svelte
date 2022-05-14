<script>
  import { Router, Link, Route } from "svelte-navigator";
  import FrontPage from "./components/pages/frontPage.svelte";
  import SignupPage from "./components/pages/SignupPage.svelte";
  import LoginPage from "./components/pages/LoginPage.svelte";
  import ArmoryPage from "./components/pages/ArmoryPage.svelte";
  import LogoutPage from "./components/pages/LogoutPage.svelte";

  async function logout() {
    const res = await fetch(`/api/logout`);

    responseMessage = await res.text();

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1500);
  }
</script>

<main>
  <Router>
    <nav class="Nav-style">
      <ul class="ul-style">
        <li class="li-style">
          <img class="imglogo" src="/images/navlogo.png" alt="..." />
        </li>

        <li class="li-style">
			<Link to="/"><button class="button">Home</button></Link>
        </li>

		<li class="li-style">
			<Link to="/Armory"><button class="button" to="/Armory">DI-Armory</button></Link>
		</li>

        <li class="li-style">
          <Link to="/Login"><button class="button" >Login</button></Link>
        </li>

        <li class="li-style">
			<Link to="/Signup"><button class="button" to="/Signup">Signup</button></Link>
        </li>


		<!-- SKAL KUN VISES NÅR DU ER LOGGET IND -->

        <!-- <li class="li-style" on:click={logout}>
          <button class="logoutbutton" to="/">Logout</button>
        </li> -->
      </ul>
    </nav>

    <Route path="/" component={FrontPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/armory" component={ArmoryPage} />
    <Route path="/logout" component={LogoutPage} />
  </Router>
</main>

<style>
  main {
    text-align: center;
    /* padding: 1em; */
    /* max-width: 240px; */
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
	/* height: 100px; */
  }

  .li-style {
    padding: 0 20px;
    color: white;
    font-size: 48px;
    font-weight: 600;
	
	/* height: 100px; */
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
