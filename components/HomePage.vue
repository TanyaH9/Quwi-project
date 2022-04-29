<template>
  <div>
    <div class="navbar">
      <div>Q</div>
      <button @click="logout">LOGOUT</button>
    </div>
    <div class="wrapper">
      <div v-if="itemId !== ''" class="modal">
        <div class="projectName">
          Change the name of
          <div class="selectedProject">{{ itemName }}</div>
          .
        </div>
        <div>
          <input v-model="newName" placeholder="Change project name" />
          <button @click="submitNewName">Submit</button>
        </div>
      </div>

      <div
        @click="updateName(item)"
        v-for="item in projectsList"
        :key="item.name"
        class="project"
      >
        <div class="name">
          <img :src="`${item.logo_url}`" width="30px" height="30px" />
          <p>{{ item.name }}</p>
        </div>
        <div class="onOff">
          <p v-if="item.is_active == 1" class="active">Active</p>
          <p v-else class="inactive">Inactive</p>
        </div>
        <div>
          <div class="timeWrapper">
            <div>time this week</div>
            <div class="time">00:00:00</div>
          </div>
          <div class="timeWrapper">
            <div>this month</div>
            <div class="time">00:00:00</div>
          </div>
          <div class="timeWrapper">
            <div>total</div>
            <div class="time">00:00:00</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      projectsList: [],
      itemId: "",
      itemName: "",
      newName: "",
    };
  },

  methods: {
    logout() {
      localStorage.removeItem("accessToken");
      this.$router.push({ path: "/" });
    },

    updateName(item) {
      this.itemId = item.id;
      this.itemName = item.name;
    },

    submitNewName() {
      if (this.itemId !== "") {
        const form = new FormData();
        form.append("name", this.newName);

        const options = {
          method: "POST",
          url: "https://api.quwi.com/v2/projects-manage/update",
          params: {
            id: this.itemId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "content-type":
              "multipart/form-data; boundary=---011000010111000001101001",
          },
          data: form,
        };
        axios
          .request(options)
          .then((response) => {
            const item = this.projectsList.find(
              (item) => item.id === response.data.project.id
            );
            item.name = response.data.project.name;
            this.itemId = "";
            this.newName = "";
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
  },

  mounted() {
    if (!localStorage.getItem("accessToken")) {
      this.$router.push({ path: "/" });
    }
    const options = {
      method: "GET",
      url: "https://api.quwi.com/v2/projects-manage/index?filters[is_active]=1&sort=dta_create",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        this.projectsList = response.data.projects;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
.navbar {
  display: flex;
  justify-content: space-between;
  background: #e8e8e8;
  padding: 20px 10px;
  border-bottom: 1px solid grey;
}

.navbar div {
  font-size: 23px;
  font-weight: 900;
}

.navbar button {
  font-size: 15px;
  padding: 5px;
  border: none;
  background: none;
  cursor: pointer;
  color: grey;
  font-weight: 500;
}
.wrapper {
  height: 100vh;
}

.projectName {
  display: flex;
  gap: 5px;
}

.selectedProject {
  font-weight: 700;
}
.modal {
  width: 50%;
  border: 1px solid grey;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  font-size: 18px;
}

.modal input {
  outline: none;
  padding: 8px;
  font-size: 15px;
}

.modal button {
  outline: none;
  padding: 8px;
  font-size: 15px;
  cursor: pointer;
}

.project {
  width: 50%;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid grey;
  margin: 5px;
}

.project:hover {
  background: #e8e8e8;
}

.onOff {
  width: 30%;
}

.active {
  color: green;
  font-weight: 600;
}

.inactive {
  color: red;
  font-weight: 600;
}

.timeWrapper {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 2px;
  padding: 0;
}

.time {
  font-weight: 700;
}

.name {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 40%;
  font-size: 17px;
  font-weight: 600;
}
</style>
