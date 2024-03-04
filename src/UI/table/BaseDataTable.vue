<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="tableData" stateStorage="session" paginator :rows="5"
            filterDisplay="menu" selectionMode="single" dataKey="id" :paginatorTemplate="paginatorTemplate"
            :rowsPerPageOptions="rowsPerPageOptions" :pageLinkSize="pageLinkSize" removableSort
            :currentPageReportTemplate="currentPageReportTemplate" tableStyle="min-width: 50rem">
            <template #header>  
                <div class="flex flex-wrap justify-between items-center gap-3">
                    <slot name="headerTitle"></slot>
                    <div class="flex flex-row ">
                        <InputText class="flex-initial mr-4 w-48" v-model="filters['global'].value" placeholder="Search">
                        </InputText>
                        <slot name="headerButton"></slot>
                    </div>
                </div>
            </template>

            <template v-for="column in columns" :key="column.field">
                <Column v-if="!column.actionColumn" :field="column.field" :header="column.header"
                    :sortable="column.sortable" :style="column.style">
                </Column>
                <Column v-else-if="column.actionColumn" :key="column.field" :header="column.header" :style="column.style">
                    <template #body="{ data, index }">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2 text-primary border-primary-200"
                            @click="editRow(data, index)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteRow(data, index)" />
                    </template>
                </Column>
            </template>
            <template #empty> No customers found. </template>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
const currentPage =ref(1)
const props = defineProps({
    tableData: {
        type: Array,
        required: true,
    },
    paginatorTemplate: {
        type: String,
        required: true
    },
    columns: {
        type: Array,
        required: true
    },
    rowsPerPageOptions: {
        type: Array,
        default: () => [5, 10, 25]
    },
    pageLinkSize: {
        type: Number,
        default: 3
    },
    currentPageReportTemplate: {
        type: String,
        default: "Showing {first} to {last} of {totalRecords} roles"
    }
});
const emit = defineEmits(['edit', 'delete'])
const filters = ref(
    {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    }
);
const editRow = (data, index) => {
    emit('edit', { data, index });
}
const deleteRow = (data, index) => {
    emit('delete', { data, index });
}
onMounted(() => {
    console.log('tableData:', props);
});
</script>

<style lang="css" scoped></style>