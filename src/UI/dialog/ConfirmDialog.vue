<template>
    <div class="flex flex-col ">

        <form @submit.prevent="submitForm">
            <div class="p-4 flex gap-3 flex-col">

                <p class="text-center text-lg">Are you sure you want to delete?</p>

                <div class="flex gap-2 justify-center mt-6">
                    <Button class="w-28" label="No" severity="danger" @click="actionButtonDialog({ buttonType: 'No' })" />
                    <Button label="Yes" @click="actionButtonDialog({ buttonType: 'Yes' })" class="button-primary w-28" />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useToast } from 'primevue/usetoast';
import userApi from '@/api/route/users';
const dialogRef = inject("dialogRef");
const toast = useToast();
const patchForm = ref(null)
const formData = ref({
    id: '',
    code: '',
    name: '',
});
const actionButtonDialog = async (e) => {
    const button = e.buttonType;

    if (button === 'Yes') {
        const payloadData = {
            code: formData.value.code,
            name: formData.value.name,
            id: formData.value.id
        };
        try {
            await deletePermission(payloadData);
        } catch (error) {
            handleRequestError(error);
            return;
        }

    }

    dialogRef.value.close(e);
};


const deletePermission = async (payload) => {
    const { data, error } = await userApi.deletePermission(payload);
    if (error) {
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

onMounted(() => {
    const dialog = dialogRef?.value?.data
    patchForm.value = dialog.permissions?.data
    formData.value = {
        id: patchForm?.value?.id,
        code: patchForm?.value?.code,
        name: patchForm?.value?.name,
    };
});
</script>

<style lang="css" scoped>
td {
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>
