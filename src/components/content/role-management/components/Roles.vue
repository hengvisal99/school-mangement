<template>
    <div class="card">
        <DataTable v-model:filters="filters" v-model:selection="selectedCustomer" :value="customers" stateStorage="session"
            stateKey="dt-state-demo-session" paginator :rows="5" filterDisplay="menu" selectionMode="single" dataKey="id"
            paginatorTemplate="FirstPageLink   PageLinks  LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]" :pageLinkSize="3" removableSort
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} roles"
            :globalFilterFields="['name', 'country.name', 'representative.name', 'status']" tableStyle="min-width: 50rem">
            <template #header>
                <!-- sm:max-md:flex-col  -->
                <div class="flex justify-between items-center sm:max-md:flex-col gap-3">
                    <h3 class="flex-none">Roles List</h3>
                    <div class="flex flex-row  sm:max-md:gap-2  sm:flex-col max-w-[680px]">
                        <InputText class="flex-initial mr-4 w-48" v-model="filters['global'].value" placeholder="Search Role">
                        </InputText>
                        <Button label="Add Role" @click="showRoles"
                            class="flex-initial w-44 active:bg-primary-700 
                                 hover:bg-primary-800 focus:outline-none 
                                 bg-primary border-primary 
                                " />
                    </div>
                </div>

            </template>
            <Column field="name" header="ID" sortable style="width: 25%">

            </Column>
            <Column field="country.name" header="Name" sortable style="width: 25%">

            </Column>
            <Column header="Action" sortable style="width: 25%">
                <template #body="{ data }">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2 text-primary border-primary-200"
                        @click="editProduct(data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(data)" />
                </template>
            </Column>

            <template #empty> No customers found. </template>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { CustomerService } from '../../../../service/CustomerService';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useDialog } from 'primevue/usedialog';
import { useToast } from 'primevue/usetoast';

const rolesList = defineAsyncComponent(() => import('@/UI/dialog/RoleDialog.vue'));
const customers = ref();
const selectedCustomer = ref();
const dialog = useDialog();
const toast = useToast();

const filters = ref(
    {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    }
);


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