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
        <a-button type="primary" :loading="loading" @click="validate">
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
  import { UserState, updatePersonalPassword } from '@/api/user';

  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';

  const { loading, setLoading } = useLoading();
  const formRef = ref<FormInstance>();
  const formData = ref<Partial<UserState>>({
    userPassword: undefined,
  });

  const reset = async () => {
    await formRef.value?.resetFields();
  };

  const handleEditUser = () => {
    setLoading(true);
    updatePersonalPassword(formData.value)
      .then(() => {
        Message.success('修改成功!');
        reset();
      })
      .finally(() => {
        setLoading(false);
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
