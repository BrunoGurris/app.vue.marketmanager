<template>
  <div class="d-flex">
    <div id="left" class="col-12 col-md-6 col-lg-5 py-5">
      <div class="d-flex justify-content-center">
        <img src="@/assets/images/logo.png" width="274" height="84">
      </div>

      <div class="d-flex justify-content-center title">
        <h3 class="fw-bold">Acesse sua conta</h3>
      </div>

      <div class="box mx-auto col-9 col-xl-7">
        <div class="mb-3">
          <label class="form-label m-0 w-100">E-mail</label>
          <InputText v-model="formAuthLogin.email" type="text" placeholder="Digite seu e-mail" class="w-100" />
        </div>

        <div class="mb-4">
          <label class="form-label m-0 w-100">Senha</label>
          <InputText v-model="formAuthLogin.password" type="password" placeholder="Digite sua senha" class="w-100" />
        </div>

        <div class="mb-3">
          <Button @click="login()" :label="buttonAuthLogin.label" :disabled="buttonAuthLogin.disabled" class="w-100" />
        </div>
      </div>
    </div>

    <div id="right" class="d-none d-md-block col-12 col-md-6 col-lg-7">
      <div class="d-flex justify-content-center align-items-center h-100 w-100">
        <img src="@/assets/images/login_right.png" class="img-fluid">
      </div>
    </div>
  </div>
</template>

<script>
import { authLoginHook } from '@/hooks/authHooks'

export default {
  name: 'Login',

  data() {
    return {
      formAuthLogin: {
        email: 'bruno@email.com',
        password: 'Bruno@123'
      },

      buttonAuthLogin: {
        label: 'Acessar',
        disabled: false
      }
    }
  },

  methods: {
    async login() {
      this.buttonAuthLogin.label = 'Acessando...'
      this.buttonAuthLogin.disabled = true

      const response = await authLoginHook(this.formAuthLogin)

      if (response.status == 200) {
        this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Acesso realizado com sucesso!', life: 3000 })
        this.$router.push('/')
      } else {
        this.$toast.add({ severity: 'error', summary: 'Erro', detail: response.data.messages[0], life: 3000 })
      }

      this.buttonAuthLogin.label = 'Acessar'
      this.buttonAuthLogin.disabled = false
    }
  }
}
</script>

<style lang="scss" scoped>
#left {
  height: 100vh;
  overflow: auto;
  background: #E9ECEF;
}

.title {
  margin-top: 90px;
  color: $text-dark;
}

.box {
  margin-top: 40px;
}

#right {
  height: 100vh;
  background: $green;

  .img-fluid {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>