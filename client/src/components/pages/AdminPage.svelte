<script>
  import { onMount } from "svelte";

  $: users = []; // The site re-renders when reactive reassignes. What I do on line 21.

  onMount(async () => {
    users = await getUsers();
    console.log(users)
  });

  async function getUsers() {
    const res = await fetch("/api/users");
    return res.json();
  }

  async function deleteUser(id) {
    console.log(id)
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    users = users.filter(user => user.id != id)
  }

  async function updateUser(id) {
    const res = await fetch(`/api/users/${id}`, {
      method: "UPDATE",
    });
    return res.json();
  }
</script>

<body>
  <div class="">
    <div class="">
      <p
        style="color: #fff; font-size: 48px; max-width: 1000px; text-align: center; margin: 0;"
      >
        Welcome to the admin page! Manage users here:
      </p>
      <div class="search-table-layout">
        <div class="searchbar-container">
          <input type="text" placeholder="Search" class="search-bar" />
        </div>
        <div class="table-container">
          <table id="table_id" class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Admin User</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {#each users as user}
                <tr>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>
                    <div class="button-container">
                      <button on:click={updateUser(user.id)}>Edit</button>
                      <button on:click={deleteUser(user.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</body>
