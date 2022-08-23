<script>
  import { onMount } from "svelte";
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input,
  } from "sveltestrap";

  $: users = []; // The site re-renders when reactive reassignes.

  let open = false;
  let editUser = {};

  onMount(async () => {
    users = await getUsers();
  });

  async function getUsers() {
    const res = await fetch("/api/users");
    return res.json();
  }

  async function deleteUser(id) {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    users = users.filter((user) => user.id != id);
  }

  // update user and get return answer. finding the correct user to overwrite with findIndex.
  async function updateUser(username, id) {
    const res = await fetch(`/api/users/${id}`, {
      headers: {
        "content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        username,
      }),
    });
    const response = res.json();
    const userIndex = users.findIndex((x) => x.id === response.id);
    users[userIndex] = response;
    users = [...users];

    open = false;
  }
  function toggle(user) {
    open = !open;
    editUser = user;
  }
</script>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
/>

<body>
  <div class="">
    <div class="">
      <p
        style="color: #fff; font-size: 48px; max-width: 1000px; text-align: center; margin: 0;"
      >
        Welcome to the admin page! Manage users here:
      </p>
      <div class="search-table-layout">
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
              {#each users as user (user.id)}
                <tr>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>
                    <div class="button-container">
                      <button on:click={() => toggle(user)}>Edit</button>
                      <Modal isOpen={open} {toggle}>
                        <ModalHeader {toggle}>Edit Email</ModalHeader>
                        <ModalBody>
                          <Input
                            bind:value={editUser.username}
                            placeholder=""
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="primary"
                            on:click={updateUser(
                              editUser.username,
                              editUser.id
                            )}>Save</Button
                          >
                          <Button color="secondary" on:click={toggle}
                            >Cancel</Button
                          >
                        </ModalFooter>
                      </Modal>
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
