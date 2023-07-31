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
          :value="users"
        >
          <Column field="id" header="ID"></Column>
          <Column field="username" header="Nom d'utilisateur"></Column>
          <Column field="last_name" header="Nom"></Column>
          <Column field="first_name" header="Prénoms"></Column>
          <Column header="Roles" style="{width: '20vw'}">
            <template #body="{data}">
              <Tag v-for="group in data.groups" >{{ group }}</Tag>
            </template>
          </Column>
          <Column>
            <template #body="{data}">
              <Button text size="small" class="mr-1" icon="pi pi-pencil" />
              <Button text severity="danger" size="small" icon="pi pi-trash" />
            </template>
          </Column>
        </DataTable>
      </TabPanel>

      <TabPanel header="Programme de garde">
        <div class="justify-content-between d-flex align-items-center">
          <div></div>
          <div>
            <Button @click="showaddgarde = true" label="Ajouter une garde" icon="pi pi-plus" size="small"></Button>
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
              <InputMask id="contact" mask="00 00-00-00-00" placeholder="00 00-00-00-00"  type="phone" v-model="newPatient.contact" class="w-100"/>
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


// Personnel Global
let {data: users} = useMyFetch('users/').json()
let {data: unites} = useMyFetch('unites/').json()
const toast = useToast()


let showaddmodal = ref(false)
let newPatient = reactive({
  groups_all: [],
  groups: [],
  permissions: computed(()=> {
    let permissions = []
    newPatient.groups_all.forEach(group => {
      permissions = [...permissions, ...group.permissions]
    })
    return permissions
  }),
})

watch(()=> newPatient.groups_all, (groups_all)=>{
  newPatient.groups = groups_all.map(group => group.id)
})

let {data: groups} = useMyFetch('groups/').json()
let {data: permissions} = useMyFetch('permissions/').json()
let addUserForm = reactive({
  loading: false,
  errors: {}
})
const addUser = ()=>{
  newPatient.username = newPatient.email
  addUserForm.loading = true
  const {data, onFetchError} = useMyFetch('users/').post(newPatient).json()
  if(data.value){
    showaddmodal.value = false
    users.value.push(data)
    toast.add({severity:'success', summary: 'Succès', detail: 'Utilisateur ajouté avec succès', life: 3000});
  }


}


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
