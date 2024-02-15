<template>
  <div>
    <TopBar :navItems="navItems"></TopBar>
    <Menu :menuItems="menuItems"></Menu>
  </div>

</template>

<script setup>
import { ref } from "vue";

import Menu  from "./navigation/Menu.vue";
import TopBar  from "./navigation/TopBar.vue";
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