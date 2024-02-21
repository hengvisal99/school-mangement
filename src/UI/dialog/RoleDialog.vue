<template>
    <div class="flex flex-col ">
        <div class="flex flex-col flex-wrap justify-center content-center gap-2">
            <p class="text-xl">Set Role Permissions</p>
            <!-- <p class="text-base text-center">Set Role Permissions</p> -->
        </div>
        <form @submit.prevent="submitForm">
            <div class="p-4 flex gap-3 flex-col">
                <div class="flex flex-col gap-2">
                    <label for="username">Role Name</label>
                    <InputText id="username" v-model="roleName" />
                </div>

                <p class="text-xl">Role Permissions</p>
                <div class="mb-4">
                    <table class="w-full">
                        <tr class="border-b border-gray-200">
                            <td>Administrator Access</td>
                            <td colspan="4">
                                <div class="flex justify-end">
                                    <Checkbox v-model="selectAll" inputId="checkAll" :binary="true" @change="selectAllPermissions" />
                                    <label for="checkAll" class="ml-2">Select All</label>
                                </div>
                            </td>
                        </tr>
                        <tr class="border-b border-gray-200" v-for="(permission, index) in permissionsList" :key="permission.code">
                            <td>{{ permission.name }}</td>
                            <td>
                                <div class="flex justify-end">
                                    <Checkbox v-model="permission.read" :binary="true" :inputId="'read_' + index" />
                                    <label :for="'read_' + index" class="ml-2">Read</label>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-end">
                                    <Checkbox v-model="permission.write" :binary="true" :inputId="'write_' + index" />
                                    <label :for="'write_' + index" class="ml-2">Write</label>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-end">
                                    <Checkbox v-model="permission.create" :binary="true" :inputId="'create_' + index" />
                                    <label :for="'create_' + index" class="ml-2">Create</label>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-end">
                                    <Checkbox v-model="permission.delete" :binary="true" :inputId="'delete_' + index" />
                                    <label :for="'delete_' + index" class="ml-2">Delete</label>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="flex gap-2 justify-center">
                    <Button type="submit" label="Submit" />
                    <Button label="Cancel" />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useDialog } from "primevue/usedialog";
import { ProductService } from "@/service/ProductService";

const dialogRef = inject("dialogRef");
const roleName = ref(null)
const dialog = useDialog();
const products = ref(null);
const permissionsList = ref([
    {
        name: "Dashboard Management",
        code: 'DBM',
        read: false,
        write: true,
        create: false,
        delete: false,
    },
    {
        name: "Department Management",
        code: 'DM',
        read: false,
        write: false,
        create: false,
        delete: false,
    },
    {
        name: "Teacher Management",
        code: 'TM',
        read: true,
        write: false,
        create: false,
        delete: true,
    },
    {
        name: "Student Management",
        code: 'SM',
        read: false,
        write: true,
        create: true,
        delete: false, 
    }
])
const selectAll = ref(false);
const selectAllPermissions = () => {
    permissionsList.value.forEach(permission => {
        permission.read = selectAll.value;
        permission.write = selectAll.value;
        permission.create = selectAll.value;
        permission.delete = selectAll.value;
    });
};


onMounted(() => {
    ProductService
        .getProductsSmall()
        .then((data) => (products.value = data.slice(0, 5)));
});


const submitForm = () => {
    // Handle form submission here, e.g., send data to server
    console.log(permissionsList.value);
};

</script>

<style lang="css" scoped>
td {
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>
