<template>
<PageLayout page-title="Gestion Personnelle">
<section class="card">
  <div class="card-body">
    <TabView>
      <TabPanel header="Personnel Global">
        <div class="my-1 d-flex justify-content-between align-items-center">
          <div></div>
          <div>
            <Button @click="showaddmodal = true" label="Ajouter" size="small" icon="pi pi-plus" />
          </div>
        </div>
        <DataTable
          v-model:selected="selectedUser"
          :value="users"
          data-key="id"
          selectionMode="single"
          :ref="usersTable"
        >
          <Column selectionMode="multiple"></Column>
          <Column field="id" header="ID"></Column>
          <Column field="username" header="Nom d'utilisateur"></Column>
          <Column field="last_name" header="Nom"></Column>
          <Column field="first_name" header="Prénoms"></Column>
          <Column header="Roles" style="{width: '20vw'}">
            <template #body="{data}">
              <Tag v-for="group in data.groups" >{{ group.name }}</Tag>
            </template>
          </Column>
          <Column>
            <template #body="{data}">
              <Button text size="small" @click="onUserEdit(data)" class="mr-1" icon="pi pi-pencil" />
              <Button text severity="danger" size="small" icon="pi pi-trash" @click="confirmDeletion(data)" />
            </template>
          </Column>
        </DataTable>
      </TabPanel>

      <TabPanel header="Programme de garde">
        <div>
          <div class="justify-content-between d-flex align-items-center">
            <div></div>
            <div>
              <Button @click="showaddgarde = true" label="Ajouter une garde" icon="pi pi-plus" size="small"></Button>
            </div>
          </div>
          <div class="mt-3">
            <Alternance/>
          </div>
        </div>
      </TabPanel>
    </TabView>

    <Dialog modal :style="{width: '50vw'}" header="Ajouter un utilisateur" v-model:visible="showaddmodal">
      <div>
        <form @submit.prevent="addUser" >
          <div class="row mt-1">
            <div class="col-md-6 mt-1">
              <label for="">Nom</label><br>
              <InputText required v-model="newPatient.last_name" class="w-100"/>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Prénoms</label><br>
              <InputText required v-model="newPatient.first_name" class="w-100"/>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Email</label><br>
              <InputText required type="email" v-model="newPatient.email" class="w-100"/>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Numero de téléphone</label><br>
              <InputText v-model="newPatient.contact" class="w-100"/>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Mot de passe</label><br>
              <InputText required type="password" v-model="newPatient.password" class="w-100"/>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Confirmer le mot de passe</label><br>
              <InputText required type="password" v-model="newPatient.password_confirmation" class="w-100"/>
            </div>
            <div class="col-12 mt-1">
              <label for="">Roles</label>
              <MultiSelect v-model="newPatient.groups_all" filter class="w-100" :options="groups" option-label="name" ></MultiSelect>
            </div>
            <div class="col-12 mt-1">
              <label for="">Permissions</label>
              <MultiSelect v-model="newPatient.permissions" filter class="w-100" :options="permissions" option-label="name" option-value="id"></MultiSelect>
            </div>
          </div>
          <div class="d-flex justify-content-end mt-2">
            <Button type="submit" label="Enregistrer" />
          </div>
        </form>
      </div>
    </Dialog>

    <Dialog modal :style="{width: '50vw'}" header="Modifier un utilisateur" v-model:visible="showeditmodal">
      <div>
        <form @submit.prevent="editUser(selectedUser)" >
          <div class="row mt-1">
            <div class="col-md-6 mt-1">
              <label for="">Nom</label><br>
              <InputText required v-model="selectedUser.last_name" class="w-100"/>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Prénoms</label><br>
              <InputText required v-model="selectedUser.first_name" class="w-100"/>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Email</label><br>
              <InputText required type="email" v-model="selectedUser.email" class="w-100"/>
            </div>
            <div class="col-md-6 mt-1">
              <label for="">Numero de téléphone</label><br>
              <InputMask id="contact" mask="00 00-00-00-00" placeholder="00 00-00-00-00"  type="phone" v-model="selectedUser.contact" class="w-100"/>
            </div>
            <div class="col-12 mt-1">
              <label for="">Roles</label>

              <MultiSelect v-model="selectedUser.groups" filter class="w-100" :options="groups" option-label="name" ></MultiSelect>
            </div>
            <div class="col-12 mt-1">
              <label for="">Permissions</label>
              <MultiSelect v-model="selectedUser.permissions" filter class="w-100" :options="permissions" option-label="name" option-value="id"></MultiSelect>
            </div>
          </div>
          <div class="d-flex justify-content-end mt-2">
            <Button type="submit" label="Enregistrer" />
          </div>
        </form>
      </div>
    </Dialog>

    <Dialog modal :style="{width: '50vw'}" header="Ajouter une garde" v-model:visible="showaddgarde">
      <div>
        <form @submit.prevent="addGarde">
          <div class="row">
            <div class="col-md-6 mt-1">
              <label>Jours</label><br>
              <Calendar class="w-100" v-model="newGarde.dates" selectionMode="range" :manualInput="false" />
            </div>
            <div class="col-md-6 mt-1">
              <label>Unité</label><br>
              <Dropdown v-model="newGarde.unite" class="w-100" :options="unites" option-label="nom" option-value="id"  />
            </div>
            <div class="col-md-12 mt-1">
              <label for="">Personnel</label><br>
              <MultiSelect  filter class="w-100" v-model="newGarde.user" :options="users" option-label="username" option-value="id"></MultiSelect>
            </div>
          </div>
          <p>
            <Button type="submit">Enregistrer</Button>
          </p>
        </form>
      </div>
    </Dialog>
  </div>
</section>
</PageLayout>
</template>

<script setup>
import PageLayout from "../../components/PageLayout.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import useMyFetch from "../../compoables/useMyFetch.js";
import Tag from "primevue/tag";
import Dropdown from "primevue/dropdown";
import InputMask from "primevue/inputmask";
import MultiSelect from "primevue/multiselect";
import Calendar from "primevue/calendar";
import {computed, reactive, ref, watch} from "vue";
import {useToast} from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import Alternance from "./alternance.vue";

// Personnel Global
let {data: users} = useMyFetch('users/').json()
let {data: unites} = useMyFetch('unites/').json()
let {data: groups} = useMyFetch('groups/').json()
let {data: permissions} = useMyFetch('permissions/').json()
const toast = useToast()
const confirm = useConfirm();
const usersTable = ref()

let showaddmodal = ref(false)
let newPatient = reactive({
  groups_all: [],
  groups: [],
  contact: null,
  permissions: computed(()=> {
    let permissions = []
    newPatient.groups_all.forEach(group => {
      permissions = [...permissions, ...group.permissions]
    })
    return permissions
  }),
})

let showeditmodal = ref(false)
let selectedUser = ref(null)
let onUserEdit = (data)=>{
  console.log(data)
  selectedUser.value = data
  showeditmodal.value = true
}
let editUser = (user)=>{
  user.username = user.email
  addUserForm.loading = true
  const {data, onFetchError, isFinished} = useMyFetch('users/'+user.id+'/').put(user).json()
  watch(isFinished, (value)=>{
    if(value && !onFetchError.value){
      users.value.push(data.value)
      showeditmodal.value = false
      let index = users.value.findIndex((e)=> e.id = user.id)
      if(index !== -1){
        users.value[index] = data.value
        console.log(users.value[index])
      }
      toast.add({severity:'success', summary: 'Succès', detail: 'Utilisateur modifié', life: 3000});
    }
  })
}
watch(()=> newPatient.groups_all, (groups_all)=>{
  newPatient.groups = groups_all.map(group => group.id)
})


let addUserForm = reactive({
  loading: false,
  errors: {}
})
const addUser = async()=>{
  newPatient.username = newPatient.email
  addUserForm.loading = true
  const {data, statusCode} = await useMyFetch('users/').post(newPatient).json()
  console.log(data.value)
  if(statusCode.value === 201){
      users.value = [...users.value, data.value]
      showaddmodal.value = false
      toast.add({severity:'success', summary: 'Succès', detail: 'Utilisateur ajouté avec succès', life: 3000});
  }else{
      toast.add({severity: 'error', detail: 'Une erreur est survenu', life: 3000})
  }
}


let deleteUser = (user)=>{
  const {data, onFetchError, isFinished} = useMyFetch('users/'+user.id+'/').delete().json()
  watch(isFinished, (value)=>{
    if(value && !onFetchError.value){
      toast.add({severity:'success', summary: 'Succès', detail: 'Utilisateur supprimé', life: 3000});
      users.value = users.value.filter((u)=> u.id !== user.id)
    }
  })
}
const confirmDeletion = (user) => {
  confirm.require({
    message: 'Voulez-vous réellement supprimer cet utilisateur ?',
    header: 'Confirmation de suppression',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: () => {
      deleteUser(user)
    },
  });
};

// Programme de garde
let showaddgarde = ref(false)
let addGardeForm = reactive({
  loading: false,
  errors: {}
})
let newGarde = reactive({})
const addGarde = ()=>{
  try{
    addGardeForm.loading = true
    const {data, statusCode} = useMyFetch('garde_tours/').post(newGarde).json()
    if(statusCode === 201){
      showaddgarde.value = false
      users.value.push(data)
      toast.add({severity:'success', summary: 'Succès', detail: 'Utilisateur ajouté avec succès', life: 3000});
    }
  }catch(e){
    console.log(e)
    toast.add({
      severity:'error',
      summary: 'Erreur',
      detail: 'Une erreur est survenue lors de l\'enregistrement',
      life: 3000
    })
  }finally{

  }
}
</script>

<style scoped>

</style>
