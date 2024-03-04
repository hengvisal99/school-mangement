<template>
    <div class="flex flex-col ">
        <Suspense @fallback="handleFallback">
            <template #default>
                <form @submit.prevent="submitForm" v-if="!isLoading">
                    <div class="p-4 flex gap-3 flex-col">
                        <div class="flex flex-col gap-2">
                            <label for="username">Role Name</label>
                            <InputText id="username" v-model="roleName" />
                        </div>

                        <p class="text-xl font-medium">Role Permissions</p>
                        <div class="mb-4">
                            <table class="w-full">
                                <tr class="border-b border-gray-200">
                                    <td>Administrator Access</td>
                                    <td colspan="4">
                                        <div class="flex justify-end">
                                            <Checkbox v-model="selectAll" inputId="checkAll" :binary="true"
                                                @change="selectAllPermissions" />
                                            <label for="checkAll" class="ml-2">Select All</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-200" v-for="(permission, index) in permissionsList"
                                    :key="permission.code">
                                    <td>{{ permission.name || permission.permission_name }}</td>
                                    <td>
                                        <div class="flex justify-end">
                                            <Checkbox v-model="permission.read" :binary="true" :inputId="'read_' + index" />
                                            <label :for="'read_' + index" class="ml-2">Read</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex justify-end">
                                            <Checkbox v-model="permission.write" :binary="true"
                                                :inputId="'write_' + index" />
                                            <label :for="'write_' + index" class="ml-2">Write</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex justify-end">
                                            <Checkbox v-model="permission.create" :binary="true"
                                                :inputId="'create_' + index" />
                                            <label :for="'create_' + index" class="ml-2">Create</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex justify-end">
                                            <Checkbox v-model="permission.delete" :binary="true"
                                                :inputId="'delete_' + index" />
                                            <label :for="'delete_' + index" class="ml-2">Delete</label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="flex gap-2 justify-center">
                            <Button label="Cancel" severity="danger"
                                @click="actionButtonDialog({ buttonType: 'Cancel' })" />
                            <Button type="submit" label="Submit" @click="actionButtonDialog({ buttonType: 'Submit' })"
                                class="button-primary" />
                        </div>
                    </div>
                </form>
                <p v-else>Loading...</p>
            </template>
        </Suspense>

    </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useToast } from 'primevue/usetoast';
import userApi from '@/api/route/users';
const dialogRef = inject("dialogRef");
const roleName = ref(null)
const toast = useToast();
const permissionsList = ref([])
const selectAll = ref(false);
const isLoading = ref(true);
const payloadData = ref(null);
const roleId = ref(null);
const patchForm = ref(null)
const selectAllPermissions = () => {
    permissionsList.value.forEach(permission => {
        permission.read = selectAll.value;
        permission.write = selectAll.value;
        permission.create = selectAll.value;
        permission.delete = selectAll.value;
    });
};
const checkPermission = () => permissionsList.value.some(permission =>
    permission.read || permission.write || permission.create || permission.delete
);

const isEdit = ref(false)
const actionButtonDialog = async (e) => {
    const button = e.buttonType;
    const atLeastOneTrue = checkPermission(permissionsList);
    console.log('atleaseone', atLeastOneTrue)
    if (button === 'Submit') {
        if (atLeastOneTrue) {
            if (isEdit.value) {
                payloadData.id = formData.value.id;
                try {
                    await updatePermission(payloadData);
                } catch (error) {
                    handleRequestError(error);
                    return;
                }
            } else {
                try {
                    await createRole(roleName.value);
                    const rolePermissionData = permissionsList.value
                        .filter(permission => permission.read || permission.write || permission.create || permission.delete)
                        .map(permission => ({
                            role_id: roleId.value,
                            permission_id: permission.id,
                            read : permission.read,
                            write : permission.write,
                            create : permission.create,
                            delete :  permission.delete,
                        }));

                    console.log('rolePermissionData', rolePermissionData);
                    await createRolePermission(rolePermissionData )
                } catch (error) {
                    handleRequestError(error);
                    return;
                }
            }
            dialogRef.value.close(e);
        }
        else {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Select Atlease One Permission', life: 3000 });
        }
        return
    }
    dialogRef.value.close(e);

};


const createRole = async (payload) => {
    const {data,error} = await userApi.createRole(payload);
    if (data) {
        console.log('data role permission', data);
        roleId.value = data[0].id
        console.log('roleId', roleId);
    }
    else if (error) {
        throw new Error(error); // Throw error if there is an error
    }
};

const createRolePermission = async (payload) => {
    const { error ,data} = await userApi.createRolePermission(payload);
    if (data) {
        console.log('data role permission', data);
    }
    else if (error) {
        throw new Error(error); // Throw error if there is an error
    }
};

const showToast = (severity, summary, detail) => {
    toast.add({ severity, summary, detail, life: 3000 });
};

const handleRequestError = (error) => {
    showToast('error', 'Error Message', 'Fail request');
    console.error('Error creating permission:', error);
    return
};

const submitForm = () => {
    // Handle form submission here, e.g., send data to server
    console.log(permissionsList.value);
};
const getPermission = async () => {
    const { data, error } = await userApi.getPermission()
    if (data) {
        console.log('permissions',data)
    }
    else if (error) {
        console.error('Error get permission:', error);
    }
    isLoading.value = false;
}
const getRolePermissionId = async (id) => {
    const { data, error } = await userApi.getRolePermissionId(id)
    if (data) {
        permissionsList.value = data.permissions
    }
    else if (error) {
        console.error('Error get permission:', error);
    }
    isLoading.value = false;
}
const handleFallback = () => {
    isLoading.value = true; // Reset isLoading to true when fallback is triggered
};
onMounted(async() => {
    const dialog = dialogRef?.value?.data
    patchForm.value = dialog.roles?.data
    isEdit.value =  dialog.isEdit
    if (isEdit.value) {
        getRolePermissionId(patchForm.value.role_id)
       
    }else{
        console.log('else')
        getPermission();
    }

});

</script>

<style lang="css" scoped>
td {
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>
