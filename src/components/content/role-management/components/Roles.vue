<template>
    <div class="card">
        <BaseDataTable :tableData="customers" 
        :colums="tableColumns"
        :headerName="'Add New Role'" 
        ></BaseDataTable>
    </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { CustomerService } from '../../../../service/CustomerService';
import { useDialog } from 'primevue/usedialog';
import { useToast } from 'primevue/usetoast';
import BaseDataTable from '@/UI/table/BaseDataTable.vue';
const rolesList = defineAsyncComponent(() => import('@/UI/dialog/RoleDialog.vue'));
const customers = ref();
const tableColumns = ref([
    { field: 'id', header: 'ID', sortable: true, style: 'width: 25%' },
    { field: 'name', header: 'Name', sortable: true, style: 'width: 25%' },
    { field: 'actions', header: 'Actions', actionColumn: true, style: 'width: 25%' }
    // Add more columns as needed
]);
const dialog = useDialog();
const toast = useToast();



const showRoles = () => {
    console.log('show', dialog)
    const dialogRef = dialog.open(rolesList, {
        props: {
            header: props.headerName,
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
            console.log('dialog',options)
            const data = options.data;
            if (data) {
                const buttonType = data.buttonType;
                const summary_and_detail = buttonType === 'Cancel' ? { severity:'error', summary: 'No Role Selected', detail: `Pressed '${buttonType}' button` } : {severity:'info', summary: 'Role Selected', detail: data.name };
                toast.add({ ...summary_and_detail, life: 3000 });
            }
        }
    });
}

onMounted(() => {
    CustomerService.getCustomersMedium().then((data) => (customers.value = data));
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