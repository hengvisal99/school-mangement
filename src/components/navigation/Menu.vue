<template>
    <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium list">
                <template v-for="(item, index) in menuItems" :key="index">
                    <li v-if="item.submenu">
                        <button :class="{ active: isActiveMainMenu(item) }" type="button"
                            class="flex items-center w-full p-2 text-base text-gray-600 transition duration-75 rounded-lg group hover:bg-gray-100"
                            :aria-controls="'dropdown-' + index" :data-collapse-toggle="'dropdown-' + index"
                            @click="toggleDropdown(index)">
                            <font-awesome-icon class="icon" :icon="item.icon" />
                            <span class="pl-3 flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{{ item.label
                            }}</span>

                            <svg :class="{ 'rotate-down': isDropdownOpen[index] }" class="w-3 h-3 rotate-270"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <ul :id="'dropdown-' + index" class="py-2 space-y-2"
                            :class="{ 'hidden': !isDropdownOpen[index], 'block': isDropdownOpen[index] }">

                            <li v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                                <router-link :to="subItem.link" @click="closeOtherDropdowns(index)"
                                    class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-11 group custom-active-class">
                                    <span class="pl-3">{{ subItem.label }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li v-else>
                        <router-link :to="item.link"
                            class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white custom-active-class group">
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
    <div class="p-4 sm:ml-64 main-card">
        <div>
            <router-view></router-view>
        </div>

    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    menuItems: {
        type: Array,
        required: true,
    }
});
const isDropdownOpen = ref(Array(props.menuItems.length).fill(true));
const toggleDropdown = (index) => {
    isDropdownOpen.value[index] = !isDropdownOpen.value[index];
};
const closeOtherDropdowns = (index) => {
    isDropdownOpen.value.fill(false);
    isDropdownOpen.value[index] = true;
};
const isActiveMainMenu = (menuItem) => {
    const path = router.currentRoute.value.fullPath;
    if (menuItem.submenu) {
        return menuItem.submenu.some((subItem) => path === subItem.link);
    }
    return false;
};

onMounted(() => {
    isDropdownOpen.value = props.menuItems.map(item => isActiveMainMenu(item));
});

</script>

<style lang="css" scoped>
.icon {
    min-width: 23px;
}

button.active {
    background: #fff;
    color: var(--primary-color);
}

.rotate-270 {
    transform: rotate(270deg);
}

.rotate-down {
    transform: rotate(0deg) !important;
}

.block {
    display: block !important;

}
</style>