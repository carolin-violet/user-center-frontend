<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="userName"
      :label="$t('userManagement.userInfo.form.userName')"
    >
      <a-input
        v-model="formData.userName"
        :placeholder="$t('userManagement.userInfo.placeholder.userName')"
      />
    </a-form-item>
    <a-form-item
      field="userAvatar"
      :label="$t('userManagement.userInfo.form.userAvatar')"
    >
      <a-input
        v-model="formData.userAvatar"
        :placeholder="$t('userManagement.userInfo.placeholder.userAvatar')"
      />
    </a-form-item>
    <a-form-item
      field="email"
      :label="$t('userManagement.userInfo.form.email')"
    >
      <a-input
        v-model="formData.email"
        :placeholder="$t('userManagement.userInfo.placeholder.email')"
      />
    </a-form-item>
    <a-form-item
      field="phone"
      :label="$t('userManagement.userInfo.form.phone')"
    >
      <a-input
        v-model="formData.phone"
        :placeholder="$t('userManagement.userInfo.placeholder.phone')"
      />
    </a-form-item>
    <a-form-item
      field="userProfile"
      :label="$t('userManagement.userInfo.form.userProfile')"
    >
      <a-textarea
        v-model="formData.userProfile"
        :placeholder="$t('userManagement.userInfo.placeholder.userProfile')"
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
  import { BasicInfoModel } from '@/api/user-center';
  import { updatePersonalInfo } from '@/api/user';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';

  const { loading, setLoading } = useLoading();

  const formRef = ref<FormInstance>();
  const formData = ref<BasicInfoModel>({
    userName: '',
    userProfile: '',
    userAvatar: '',
    email: '',
    phone: '',
  });

  const handleEditUser = () => {
    setLoading(true);
    updatePersonalInfo(formData.value)
      .then(() => {
        Message.success('修改成功!');
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
  const reset = async () => {
    await formRef.value?.resetFields();
  };
</script>

<style scoped lang="less">
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
