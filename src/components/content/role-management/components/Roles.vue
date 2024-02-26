<template>
    <div class="card">
        <Suspense @fallback="handleFallback">
            <template #default>
                <BaseDataTable v-if="!isLoading" 
                :tableData="roles" 
                :columns="tableColumns" 
                :paginatorTemplate="paginatorTemplate"
                :rowsPerPageOptions="rowsPerPageOptions"
                :pageLinkSize="pageLinkSize"
                :currentPageReportTemplate="currentPageReportTemplate"
                    >
                    <template #headerTitle>
                        <h3 class="flex-none">Roles List</h3>
                    </template>
                    <template #headerButton>
                        <Button label="Add Role" @click="showRoles"
                            class="flex-initial w-44 active:bg-primary-700 
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

const BaseDataTable = defineAsyncComponent(() => import('@/UI/table/BaseDataTable.vue'));
const rolesList = defineAsyncComponent(() => import('@/components/content/role-management/dialog/RoleDialog.vue'));
const dialog = useDialog();
const toast = useToast();
const roles = ref();
const isLoading = ref(true);

// props
const paginatorTemplate = ref("FirstPageLink PageLinks LastPageLink CurrentPageReport RowsPerPageDropdown");
const rowsPerPageOptions = [5, 10,25];
const pageLinkSize = 3;
const currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} roles";
const tableColumns = ref([
    { field: 'id', header: 'ID', sortable: true, style: 'width: 25%' },
    { field: 'name', header: 'Name', sortable: true, style: 'width: 25%' },
    { field: 'actions', header: 'Actions', actionColumn: true, style: 'width: 25%' }
    // Add more columns as needed
]);

const showRoles = () => {
    console.log('show', dialog)
    const dialogRef = dialog.open(rolesList, {
        props: {
            header: 'Add New Role',
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
        onClose: (options) => {
            console.log('dialog', options)
            const data = options.data;
            if (data) {
                const buttonType = data.buttonType;
                const summary_and_detail = buttonType === 'Cancel' ? { severity: 'error', summary: 'No Role Selected', detail: `Pressed '${buttonType}' button` } : { severity: 'info', summary: 'Role Selected', detail: data.name };
                toast.add({ ...summary_and_detail, life: 3000 });
            }
        }
    });
    console.log('dialog',dialogRef)
}


const getRoleList = async () => {
    try {
        const data = await CustomerService.getCustomersMedium();
        roles.value = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        isLoading.value = false;
    }
};

const handleFallback = () => {
    console.log('Fallback content is being displayed.');
    isLoading.value = true; // Reset isLoading to true when fallback is triggered
};
onMounted(() => {
    getRoleList();
});

const editProduct = (prod) => {
    // product.value = {...prod};
    // productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    // product.value = prod;
    // deleteProductDialog.value = true;
};
</script>

<style lang="css" scoped></style>