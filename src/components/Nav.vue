<template>
  <nav
      class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light">
    <div class="navbar-wrapper" style="background-color: transparent!important;">
      <div class="navbar-container content">
        <div class="collapse navbar-collapse show" id="navbar-mobile">
          <ul class="nav navbar-nav mr-auto float-left">
            <li class="nav-item d-block d-md-none"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i
                class="ft-menu"></i></a></li>
            <li class="nav-item d-none d-md-block"><a class="nav-link nav-link-expand" href="#"><i
                class="ficon ft-maximize"></i></a></li>
            <li class="nav-item dropdown navbar-search"><a class="nav-link dropdown-toggle hide" data-toggle="dropdown"
                                                           href="#"><i class="ficon ft-search"></i></a>
              <ul class="dropdown-menu">
                <li class="arrow_box">
                  <form>
                    <div class="input-group search-box">
                      <div class="position-relative has-icon-right full-width">
                        <input class="form-control" id="search" type="text" placeholder="Search here...">
                        <div class="form-control-position navbar-search-close"><i class="ft-x"> </i></div>
                      </div>
                    </div>
                  </form>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav float-right">
            <li class="dropdown dropdown-notification nav-item"><a class="nav-link nav-link-label" href="#"
                                                                   data-toggle="dropdown"><i class="ficon ft-mail"> </i></a>
              <div class="dropdown-menu dropdown-menu-right">
                <div class="arrow_box_right"><a class="dropdown-item" href="#"><i class="ft-book"></i> Read Mail</a><a
                    class="dropdown-item" href="#"><i class="ft-bookmark"></i> Read Later</a><a class="dropdown-item"
                                                                                                href="#"><i
                    class="ft-check-square"></i> Mark all Read </a></div>
              </div>
            </li>
            <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link" href="#"
                                                           data-toggle="dropdown"> <span
                class="avatar avatar-online"><i class="pi pi-user"></i><i></i></span></a>
              <div class="dropdown-menu dropdown-menu-right">
                <div class="arrow_box_right"><a class="dropdown-item" href="#"><span class="avatar avatar-online">

                  <span
                    class="user-name text-bold-700 ml-1">{{ user?.username}}</span></span></a>
                  <div class="dropdown-divider"></div>
                  <a href="#" @click="logout" class="dropdown-item"><i class="ft-power"></i> Deconnexion</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {useAuthStore} from "../stores/auth.js";
import {storeToRefs} from "pinia";


const router = useRouter()
const authStore = useAuthStore()
const {user} = storeToRefs(authStore)
const logout = () => {
  localStorage.removeItem('token')
  authStore.logout()
  setTimeout(() => router.push('/connexion'), 1000)
}
</script>

<style scoped>

</style>
