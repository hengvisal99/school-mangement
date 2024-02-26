<template>
    <div class="flex flex-col ">

        <form @submit.prevent="submitForm">
            <div class="p-4 flex gap-3 flex-col">
                <div class="flex flex-row gap-8">
                    <div class="flex flex-col gap-2 w-1/2">
                        <label for="username">Permission Code</label>
                        <InputText id="username" v-model="formData.code" />
                    </div>
                    <div class="flex flex-col gap-2 w-1/2">
                        <label for="username">Permission Name</label>
                        <InputText id="username" v-model="formData.name" />
                    </div>
                </div>

                <div class="flex gap-2 justify-center mt-6">
                    <Button label="Cancel" severity="danger" @click="actionButtonDialog({ buttonType: 'Cancel' })" />
                    <Button type="submit" label="Submit" @click="actionButtonDialog({ buttonType: 'Submit' })"
                        class="button-primary" />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useToast } from 'primevue/usetoast';
const dialogRef = inject("dialogRef");
const roleName = ref(null)
const toast = useToast();

const formData = ref({
    code: '',
    name: '',
});

const actionButtonDialog = (e) => {
    const button = e.buttonType;
    console.log('button',button)   
    if (button === 'Submit') {
        if(formData.value.code == '' || formData.value.name == '')
        {
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'Please Input Code or Name', life: 3000 });
            return
        }
    }
    dialogRef.value.close(e);

};
const submitForm = () => {
    // Handle form submission here, e.g., send data to server
    console.log(formData.value);
};

</script>

<style lang="css" scoped>
td {
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>
