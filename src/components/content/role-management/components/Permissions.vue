<template>
    <div class="card">
        <Suspense @fallback="handleFallback">
            <template #default>
                <BaseDataTable v-if="!isLoading" :tableData="permissions" :columns="tableColumns"
                    :paginatorTemplate="paginatorTemplate" :rowsPerPageOptions="rowsPerPageOptions"
                    :pageLinkSize="pageLinkSize" :currentPageReportTemplate="currentPageReportTemplate" 
                    @edit="editPermission" @delete="deletePermission">
                    <template #headerTitle>
                        <h3 class="flex-none">Permissions List</h3>
                    </template>
                    <template #headerButton>
                        <Button label="Add Permission" @click="addPermission()" class="flex-initial w-44 active:bg-primary-700 
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
import { useDialog } from 'primevue/usedialog';
import { useToast } from 'primevue/usetoast';
import userApi from '@/api/route/users';
const BaseDataTable = defineAsyncComponent(() => import('@/UI/table/BaseDataTable.vue'));
const PermissionDialog = defineAsyncComponent(() => import('@/components/content/role-management/dialog/PermissionDialog.vue'));
const dialog = useDialog();
const toast = useToast();
const permissions = ref();
const isLoading = ref(true);

// props
const paginatorTemplate = ref("FirstPageLink PageLinks LastPageLink CurrentPageReport RowsPerPageDropdown");
const rowsPerPageOptions = [5, 10, 25];
const pageLinkSize = 3;
const currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} roles";
const tableColumns = ref([
    { field: 'name', header: 'Name', sortable: true, style: 'width: 25%' },
    { field: 'actions', header: 'Actions', actionColumn: true, style: 'width: 25%' }
    // Add more columns as needed
]);

const addPermission = (data,isEdit) => {
    console.log('data',data)
    const dialogRef = dialog.open(PermissionDialog, {
        props: {
            header: 'Add New Permission',
            style: {
                width: '600px',
                height: '300px',

            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            modal: true
        },
        data: {
            permissions: data,
            isEdit : isEdit ? isEdit : false
        },
        onClose: (options) => {
            const data = options.data;
            console.log('onclose data', data)
            if (data) {
                const buttonType = data.buttonType;
                const summary_and_detail = buttonType === 'Cancel' ? { severity: 'error', summary: 'No Permission Added', detail: `Pressed '${buttonType}' button` } : { severity: 'info', summary: 'Permission Added', detail: data.name };
                toast.add({ ...summary_and_detail, life: 3000 });
                if (buttonType === 'Submit') getPermission();
            }
        },
    });
    console.log('dialog', dialogRef)
}
const editPermission = (val) => {
    console.log('edit',val)
    addPermission(val,true)
};
const deletePermission = (val) => {
    console.log('delete',val)
    addPermission(val)
};
const handleFallback = () => {
    isLoading.value = true; // Reset isLoading to true when fallback is triggered
};
const getPermission = async () => {
    const { data, error } = await userApi.getPermission()
    if (data) {
        permissions.value = data;
    }
    else if (error) {
        console.error('Error get permission:', error);
    }
    isLoading.value = false;
}
onMounted(() => {
    getPermission();
});


</script>

<style lang="css" scoped></style>