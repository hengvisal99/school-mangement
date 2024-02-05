<template>
  <form @submit="login">
    <section class="h-screen flex flex-row">
      <div
        class="background-login flex flex-col basis-6/12 justify-center items-center gap-6"
      >
        <img src="@/assets/study.svg" alt="SVG image" />
      </div>

      <div class="flex flex-col basis-6/12 justify-center items-center">
        <div class="border rounded-2xl p-8 shadow-lg width-5">
          <h1 class="text-center text-2xl p-5 font-bold">
            School Management System
          </h1>

          <div class="flex flex-col gap-2">
            <label for="username">Username</label>
            <InputText
              id="username"
              v-model="username"
              :class="{ 'p-invalid': errors.username }"
              :bind = "usernameAttrs"
            />
            <small id="username-help" class="mb-2" :class="{ 'text-red-500': errors.username }">{{ errors.username }}</small>
          </div>
          <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <Password
              class="w-full"
              v-model="password"
              toggleMask
              :feedback="false"
              :bind = "passwordAttrs"
              :class="{ 'p-invalid': errors.password }"
            />
            <small id="password-help" class="mb-2" :class="{ 'text-red-500': errors.password }">{{ errors.password }}</small>
          </div>
          <div class="flex flex-row mt-3 justify-between mb-2">
            <div class="flex flex-row gap-2">
              <Checkbox
                v-model="remember_me"
                inputId="ingredient"
                :binary="true"
              />

              <label for="ingredient" class="link-color cursor-pointer">
                remember me
              </label>
            </div>

            <label class="text-center underline link-color cursor-pointer">
              Forgot password?
            </label>
          </div>
          <div class="flex flex-col gap-4">
            <Button
              type="submit"
              class="w-full mt-4"
              label="Login"
              severity="info"
              raised
            />
          </div>
          <div class="flex flex-row justify-center mt-5">
            <h1 class="text-center mb-6">
              Don't have an account?
              <span class="underline link-color cursor-pointer">Register</span>
            </h1>
          </div>

          <div class="mb-5">
            <h1 class="h-line">or</h1>
          </div>
          <div class="flex flex-row gap-5 mb-3 justify-center">
            <button
              class="border rounded-lg h-10 w-40 text-center p-2 hover:bg-slate-200"
            >
              <div class="text-blue-800">
                <font-awesome-icon icon="fa-brands fa-facebook" class="pr-2" />
                <span>Facebook</span>
              </div>
            </button>
            <button
              class="border rounded-lg h-10 w-40 text-center p-2 hover:bg-slate-200"
            >
              <font-awesome-icon icon="fa-brands fa-github" class="pr-2" />
              <span>Github</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

  
<script setup>
import { useForm } from 'vee-validate';
import * as yup from "yup";
const { defineField, errors, handleSubmit} = useForm({
  validationSchema: yup.object({
    username: yup.string().required(),
    password: yup.string().min(6).required(),
  }),
});
const test = useForm({
  validationSchema: yup.object({
    username: yup.string().required(),
    password: yup.string().min(6).required(),
  }),
});
const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");

const login = handleSubmit((values,form) => {
  console.log("test",form);
  console.log("form", values);
  console.log("error", errors);
});
</script>
  
<style scoped>
.h-line {
  display: flex;
  flex-direction: row;
}
.h-line:before,
.h-line:after {
  content: "";
  flex: 1 1;
  border-bottom: 1px solid;
  margin: auto;
}
.h-line:before {
  margin-right: 10px;
}
.h-line:after {
  margin-left: 10px;
}
.background-login {
  background-image: linear-gradient(
    to right bottom,
    #00b0ff,
    #00c4ff,
    #00d5f2,
    #00e3d8,
    #2eeeb7
  );
}
img {
  height: 500px;
}
</style>