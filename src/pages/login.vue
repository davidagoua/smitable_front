<template>
  <div  class="app-content ">


    <div  class="content-wrapper">

      <div class="content-body"><!-- Basic Alerts start -->

        <!-- Basic Alerts end -->

        <!-- Alerts with Additional Content start -->


        <div class="row">
          <div style="margin-left: 400px; margin-top: 100px" class="col-md-4">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title text-center">CONNEXION</h4>

              </div>
              <div class="card-content ">



                <div class="mb-4" role="alert">
                  <div class="card-body pt-1">
                    <form @submit.prevent="submit">
                      <fieldset class="form-label-group form-group position-relative has-icon-right">
                        <label for="user-name">Nom d'utilisateur</label>
                        <input type="text" v-model="user.username" class="form-control" id="user-name" placeholder="Nom d'utilisateur" required>
                        <div class="form-control-position">
                          <i class="feather icon-user"></i>
                        </div>
                      </fieldset>

                      <fieldset class="form-label-group position-relative has-icon-left">
                        <label for="user-password">Mot de passe</label><br>
                        <span class="p-input-icon-right w-100" >
                          <i @click="showpass = !showpass" :class="showpass ? 'pi pi-eye-slash': 'pi pi-eye'"></i>
                          <input :type="showpass ? 'text' : 'password'" v-model="user.password" class="form-control" id="user-password" placeholder="Mot de passe" required>
                        </span>
                        <div class="form-control-position">
                          <i class="feather icon-lock"></i>
                        </div>
                      </fieldset>
                      <div class="form-group d-flex mt-3 justify-content-between align-items-center">
                        <div class="text-left">
                          <fieldset class="checkbox">
                            <div class="vs-checkbox-con vs-checkbox-primary">
                              <input type="checkbox">
                              <span class="vs-checkbox">
                                      <span class="vs-checkbox--check">
                                          <i class="vs-icon feather icon-check"></i>
                                      </span>
                                  </span>
                              <span class="ml-1">Se souvenir de moi</span>
                            </div>
                          </fieldset>
                        </div>
                        <div class="text-right"><a href="auth-forgot-password.html" class="card-link">Mot de passe oublié ?</a></div>
                      </div>

                      <Button icon="pi pi-signin" type="submit" :loading="loading" label="Se connecter" class="btn btn-primary float-right btn-inline"/>
                    </form>
                  </div>


                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Alerts with Additional Content end -->


        <!-- Dismissible Alerts & Round Alerts with icons end -->
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import useMyFetch from "../compoables/useMyFetch.js";
import {useFetch} from "@vueuse/core";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {useAuthStore} from "../stores/auth.js";

document.querySelector('body').style.backgroundImage = "url('images/smit-home.png')"
document.querySelector('body').style.backgroundSize = "cover"


const authStore = useAuthStore()
const user = reactive({})
const toast = useToast()
const router = useRouter()
const loading = ref(false)
const showpass = ref(false)
const submit = async ()=>{
  loading.value = true

  const {data, statusCode} = await useFetch(import.meta.env.VITE_BACKEND_URL+'auth/token/login/')
      .post(user).json()
  if(statusCode.value === 200){
    toast.add({
      severity: 'success',
      detail: "Heureux de vous revoir !",
      life: 3000
    })
    await getUserInfo(data)


  }else if( statusCode.value === 400){
    toast.add({
      severity: 'error',
      detail: "Nom d'utilisateur ou mot de passe incorrect !",
      life: 3000
    })
  }
  loading.value = false

}

const getUserInfo = async(data)=>{
  localStorage.setItem('token', data.value.auth_token ?? 'veryshow')
  const {data: user, onFetchResponse} = await useMyFetch('auth/me/',{
    async beforeFetch({ url, options, cancel }) {
      const myToken = data.value.auth_token

      if (!myToken) {
        cancel()
      }

      options.headers = {
        ...options.headers,
        Authorization: `Token ${myToken}`,
      }
      return {
        options,
      }
    }
  }).get().json()
  authStore.login(data.value.auth_token, user.value)
  document.querySelector('body').style.backgroundImage = null
  router.push('/')
}
</script>

<style scoped>

</style>
