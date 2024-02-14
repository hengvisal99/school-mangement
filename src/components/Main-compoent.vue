<template>
  <div>
    <div>
      <Menu :menuItems="menuItems" :navItems="navItems"></Menu>
      <div class="p-4 sm:ml-64">
        <div class="p-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Menu  from "./Menu.vue";
const navItems = ref([
  // { label: "Dashboard", link: "#" },
  // { label: "Settings", link: "#" },
  // { label: "Earnings", link: "#" },
  { label: "Sign out", code: "SO" },
]);

const menuItems = ref([
  {
    label: "Dashboard",
    icon: ["fa-solid", "fa-list"],
    link: "/dashboard",
  },
  {
    label: "Department",
    icon: ["fa-solid", "fa-calendar-minus"],
    submenu: [
      {
        label: "Department List",
        link: "/department/list",
      },
      {
        label: "Department Add",
        link: "/department/add",
      },
    ],
  },
  {
    label: "Teacher",
    icon: ["fa-solid", "fa-person-chalkboard"],
    submenu: [
      {
        label: "Teacher List",
        link: "/teacher/list",
      },
      {
        label: "Teacher Add",
        link: "/teacher/add",
      },
    ],
  },
  {
    label: "Role Management",
    icon: ['fas', 'gear'],
    submenu: [
      {
        label: "Roles",
        link: "/role-management/roles",
      },
      {
        label: "Permissions",
        link: "/role-management/permissions",
      },
    ],
  },
  {
    label: "School",
    icon: ["fa-solid", "fa-school"],
    link: "/school",
  },
  {
    label: "Course",
    icon: ["fa-solid", "fa-graduation-cap"],
    link: "/course",
  },
]);

</script>

<style lang="css" scoped>


</style>