<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="userPassword"
      :label="$t('userManagement.userInfo.form.userPassword')"
      :rules="[
        {
          required: true,
          message: $t('userManagement.form.error.userPassword.required'),
        },
        {
          minLength: 8,
          message: $t('userManagement.form.error.userPassword.minLength8'),
        },
      ]"
    >
      <a-input-password
        v-model="formData.userPassword"
        :placeholder="$t('userManagement.userInfo.placeholder.userPassword')"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="validate">
          {{ $t('userSetting.save') }}
        </a-button>
        <a-button type="secondary" @click="reset">
          {{ $t('userSetting.reset') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { BasicInfoModel } from '@/api/user-center';
  import { updatePersonalPassword } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  const formRef = ref<FormInstance>();

  const formData = ref<BasicInfoModel>({
    userPassword: '',
  });

  const reset = async () => {
    await formRef.value?.resetFields();
  };

  const handleEditUser = () => {
    updatePersonalPassword(formData.value).then(() => {
      Message.success('修改成功!');
      reset();
    });
  };

  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      handleEditUser();
    }
  };
</script>

<style scoped lang="less">
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
