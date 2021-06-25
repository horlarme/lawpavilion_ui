<template>
  <el-row gutter="20">
    <el-col :span="6">
      <el-form label-width="120px" @submit.prevent="submit">
        <el-form-item label="First Name">
          <el-input v-model="form.first_name" type="first_name"/>
        </el-form-item>
        <el-form-item label="Last Name">
          <el-input v-model="form.last_name" type="last_name"/>
        </el-form-item>
        <el-form-item label="Email ">
          <el-input v-model="form.email" type="email"/>
        </el-form-item>
        <el-form-item label="Legal Counsel">
          <el-input v-model="form.primary_legal_counsel"/>
        </el-form-item>
        <el-form-item label="Date of Birth">
          <el-date-picker v-model="form.date_of_birth" type="date"/>
        </el-form-item>
        <el-form-item label="Profile Image">
          <input type="file" accept="image/jpeg, image/png" ref="file"
                 @change="($event) => (file = $event.target.files[0])"/>
        </el-form-item>
        <el-form-item label="Date Profiled">
          <el-date-picker v-model="form.date_profiled" type="date"/>
        </el-form-item>
        <el-form-item label="Case Details">
          <el-input type="textarea" v-model="form.case_details" rows="5"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Create</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24-6">
      <el-table :data="clients">
        <el-table-column type="expand">
          <template #default="props">
            Case Details: {{ props.row.case_details }}
          </template>
        </el-table-column>
        <el-table-column type="index" label="S/N"/>
        <el-table-column prop="first_name" label="First Name"/>
        <el-table-column prop="last_name" label="Last Name"/>
        <el-table-column prop="email" label="Email"/>
        <el-table-column prop="date_profiled" label="Date profiled"/>
        <el-table-column prop="date_of_birth" label="DOB"/>
        <el-table-column prop="primary_legal_counsel" label="Pri. Legal Co."/>
        <el-table-column label="Image">
          <template #default="{row}">
            <a :href="`${api}/${row.profile_image}`" v-if="row.profile_image" target="_blank">Open</a>
            <p v-else>NA</p>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import axios from "axios";

export default defineComponent({
  setup() {
    const clients = ref([])
    const api = import.meta.env.VITE_API;
    const file = ref(null)
    const form = ref({
      first_name: '',
      last_name: '',
      email: '',
      date_profiled: '' as Date,
      primary_legal_counsel: '',
      date_of_birth: '' as Date,
      profile_image: '',
      case_details: ''
    })

    const submit = function Submit() {
      const formData = new FormData
      formData.append('first_name', form.value.first_name)
      formData.append('last_name', form.value.last_name)
      formData.append('email', form.value.email)
      formData.append('case_details', form.value.case_details)
      formData.append('primary_legal_counsel', form.value.primary_legal_counsel)
      formData.append('date_profiled', form.value.date_profiled?.toJSON() as string)
      formData.append('date_of_birth', form.value.date_of_birth?.toJSON() as string)
      if (file.value) {
        formData.append('profile_image', file.value as Blob)
      }
      axios.post(`${api}/api/clients`, formData)
          .then(() => {
            alert('Client Profile Created')
            fetchList()
          })
          .catch(null)
    }

    function fetchList() {
      clients.value.splice(0)
      axios.get(`${api}/api/clients`)
          .then(response => {
            clients.value.push(...response.data)
          })
          .catch(null)
    }

    onBeforeMount(fetchList)

    return {form, submit, clients, file, api}
  }
})
</script>

<style scoped lang="scss">
</style>
