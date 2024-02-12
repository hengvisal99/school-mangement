<template>
  <div>
    <div>
      <nav
        class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" class="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  class="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span
                  class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
                  >Flowbite</span
                >
              </a>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div class="px-4 py-3" role="none">
                    <p
                      class="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    <li v-for="(item, index) in navItems" :key="index">
                      <span
                        @click="onClickTopBar(item)"
                        :to="item.link"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        {{ item.label }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <template v-for="(item, index) in menuItems" :key="index">
              <li v-if="item.submenu">
                <button
                  type="button"
                  class="flex items-center w-full p-2 text-base text-gray-600 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  :aria-controls="'dropdown-' + index"
                  :data-collapse-toggle="'dropdown-' + index"
                >
                  <font-awesome-icon class="icon" :icon="item.icon" />
                  <span
                    class="pl-3 flex-1 ms-3 text-left rtl:text-right whitespace-nowrap"
                    >{{ item.label }}</span
                  >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul :id="'dropdown-' + index" class="hidden py-2 space-y-2">
                  <li
                    v-for="(subItem, subIndex) in item.submenu"
                    :key="subIndex"
                  >
                    <!-- <a
                      :href="subItem.link"
                      class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <span class="pl-3">
                        {{ subItem.label }}
                      </span>
                    </a> -->
                    <router-link :to="subItem.link" class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        <span class="pl-3">{{ subItem.label }}</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li v-else>
                <router-link
                  :to="item.link"
                  class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-gray-100 group"
                >
                  <font-awesome-icon class="icon" :icon="item.icon" />
                  <span class="pl-3 flex-1 ms-3 whitespace-nowrap">{{
                    item.label
                  }}</span>
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-64">
        <div class="p-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from "flowbite";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase/supabase";
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
    link: "dashboard",
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
    label: "School",
    icon: ["fa-solid", "fa-school"],
    link: "school",
  },
  {
    label: "Teacher",
    icon: ["fa-solid", "fa-person-chalkboard"],
    link: "teacher",
  },
  {
    label: "Course",
    icon: ["fa-solid", "fa-graduation-cap"],
    link: "course",
  },
]);

const router = useRouter();

const onClickTopBar = async (item) => {
  if (item.code == "SO") {
    console.log(`Clicked on item: ${item.code}`);
    const { error } = await supabase.auth.signOut();
    if (error == null) {
      console.log(`error`, error);
      localStorage.removeItem("expires_at");
      router.push("login");
    }
  }
};

onMounted(() => {
  initFlowbite();
});
</script>

<style lang="css" scoped>
.icon {
  min-width: 23px;
}
</style>