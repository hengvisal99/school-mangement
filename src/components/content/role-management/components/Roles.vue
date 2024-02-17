<template>
    <div class="card">
        <DataTable v-model:filters="filters" v-model:selection="selectedCustomer" :value="customers" stateStorage="session"
            stateKey="dt-state-demo-session" paginator :rows="5" filterDisplay="menu" selectionMode="single" dataKey="id"
            paginatorTemplate="FirstPageLink  PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]" :pageLinkSize="3" removableSort
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} roles"
            :globalFilterFields="['name', 'country.name', 'representative.name', 'status']" tableStyle="min-width: 50rem">
            <template #header>

                <div class="flex justify-between items-center">
                    <h3 class="text-center">Roles List</h3>
                    <div>
                        <InputText class="mr-4" v-model="filters['global'].value" placeholder="Search Role">
                        </InputText>
                        <Button label="Add Role"
                            class="w-44 active:bg-primary-700 hover:bg-primary-800 focus:outline-none bg-primary border-primary " />
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
import { ref, onMounted } from 'vue';
import { CustomerService } from '../../../../service/CustomerService';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const customers = ref();
const selectedCustomer = ref();
const filters = ref(
    {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    }
);
const representatives = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
]);

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

<style lang="css" scoped>
.p-button.p-button-outlined {
    /* border-color: var(--primary-color) */
}
</style>