<template>
    <div class="card">
        <Suspense @fallback="handleFallback">
            <template #default>
                <BaseDataTable v-if="!isLoading" :tableData="roles" :columns="tableColumns"
                    :paginatorTemplate="paginatorTemplate" :rowsPerPageOptions="rowsPerPageOptions"
                    :pageLinkSize="pageLinkSize" :currentPageReportTemplate="currentPageReportTemplate"
                    @edit="editPermission">
                    <template #headerTitle>
                        <h3 class="flex-none">Roles List</h3>
                    </template>
                    <template #headerButton>
                        <Button label="Add Role" @click="handleRoles" class="flex-initial w-44 active:bg-primary-700 
                                 hover:bg-primary-800 focus:outline-none 
                                 bg-primary border-primary 
                                " />
                    </template>
                </BaseDataTable>
                <p v-else>Loading...</p>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { CustomerService } from '../../../../service/CustomerService';
import { useDialog } from 'primevue/usedialog';
import { useToast } from 'primevue/usetoast';
import userApi from '@/api/route/users';
const BaseDataTable = defineAsyncComponent(() => import('@/UI/table/BaseDataTable.vue'));
const rolesDialog = defineAsyncComponent(() => import('@/components/content/role-management/dialog/RoleDialog.vue'));
const dialog = useDialog();
const toast = useToast();
const roles = ref();
const isLoading = ref(true);

// props
const paginatorTemplate = ref("FirstPageLink PageLinks LastPageLink CurrentPageReport RowsPerPageDropdown");
const rowsPerPageOptions = [5, 10, 25];
const pageLinkSize = 3;
const currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} roles";
const tableColumns = ref([
    { field: 'role_name', header: 'Name', sortable: true, style: 'width: 25%' },
    { field: 'actions', header: 'Actions', actionColumn: true, style: 'width: 25%' }
    // Add more columns as needed
]);

const handleRoles = (data,isEdit) => {
    console.log('show', dialog)
    const dialogRef = dialog.open(rolesDialog, {
        props: {
            header: isEdit ? 'Edit New Role' : 'Add New Role',
            style: {
                width: '900px',
                height: '900px',

            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            modal: true
        },
        data: {
            roles: data,
            isEdit : isEdit ? isEdit : false
        },
        onClose: (options) => {
            console.log('dialog', options)
            const data = options.data;
            if (data) {
                const buttonType = data.buttonType;
                const summary_and_detail = buttonType === 'Cancel' ? { severity: 'error', summary: 'No Role Selected', detail: `Pressed '${buttonType}' button` } : { severity: 'info', summary: 'Role Selected', detail: data.name };
                toast.add({ ...summary_and_detail, life: 3000 });
                if (buttonType === 'Submit') getRoleList();
            }
        }
    });
    console.log('dialog', dialogRef)
}

const handleFallback = () => {
    console.log('Fallback content is being displayed.');
    isLoading.value = true; // Reset isLoading to true when fallback is triggered
};
const getRoleList = async () => {
    try {
        const res = await userApi.getRolePermission()
        roles.value = res.data;
        console.log('role name',roles)
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        isLoading.value = false;
    }
}
const editPermission = (val) => {
    console.log('edit',val)
    handleRoles(val,true)
};
onMounted(() => {
    getRoleList();
});

</script>

<style lang="css" scoped></style>