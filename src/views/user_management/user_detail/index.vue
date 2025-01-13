<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.userManagement',
        titleNameOptions[Number($route.query.pageType)],
      ]"
    />
    <a-card
      class="general-card"
      :title="titleNameOptions[Number($route.query.pageType)]"
    >
      <a-form
        ref="formRef"
        :model="formData"
        class="form"
        :label-col-props="{ span: 8 }"
        :wrapper-col-props="{ span: 16 }"
      >
        <a-form-item
          v-if="Number($route.query.pageType) === PageTypeEnum.ADD"
          field="userAccount"
          :label="$t('userManagement.userInfo.form.userAccount')"
          :rules="[
            {
              required: true,
              message: $t('userManagement.form.error.userAccount.required'),
            },
          ]"
        >
          <a-input
            v-model="formData.userAccount"
            :placeholder="$t('userManagement.userInfo.placeholder.userAccount')"
          />
        </a-form-item>
        <a-form-item
          v-if="Number($route.query.pageType) === PageTypeEnum.UPDATE_PASSWORD"
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
            :placeholder="
              $t('userManagement.userInfo.placeholder.userPassword')
            "
          />
        </a-form-item>
        <a-form-item
          v-if="Number($route.query.pageType) !== PageTypeEnum.UPDATE_PASSWORD"
          field="userName"
          :label="$t('userManagement.userInfo.form.userName')"
        >
          <a-input
            v-model="formData.userName"
            :placeholder="$t('userManagement.userInfo.placeholder.userName')"
          />
        </a-form-item>
        <a-form-item
          v-if="Number($route.query.pageType) !== PageTypeEnum.UPDATE_PASSWORD"
          field="userAvatar"
          :label="$t('userManagement.userInfo.form.userAvatar')"
        >
          <a-input
            v-model="formData.userAvatar"
            :placeholder="$t('userManagement.userInfo.placeholder.userAvatar')"
          />
        </a-form-item>
        <a-form-item
          v-if="Number($route.query.pageType) !== PageTypeEnum.UPDATE_PASSWORD"
          field="email"
          :label="$t('userManagement.userInfo.form.email')"
        >
          <a-input
            v-model="formData.email"
            :placeholder="$t('userManagement.userInfo.placeholder.email')"
          />
        </a-form-item>
        <a-form-item
          v-if="Number($route.query.pageType) !== PageTypeEnum.UPDATE_PASSWORD"
          field="phone"
          :label="$t('userManagement.userInfo.form.phone')"
        >
          <a-input
            v-model="formData.phone"
            :placeholder="$t('userManagement.userInfo.placeholder.phone')"
          />
        </a-form-item>
        <a-form-item
          v-if="Number($route.query.pageType) !== PageTypeEnum.UPDATE_PASSWORD"
          field="userProfile"
          :label="$t('userManagement.userInfo.form.userProfile')"
        >
          <a-textarea
            v-model="formData.userProfile"
            :placeholder="$t('userManagement.userInfo.placeholder.userProfile')"
          />
        </a-form-item>

        <a-form-item
          v-if="Number($route.query.pageType) !== PageTypeEnum.UPDATE_PASSWORD"
          field="userRole"
          :label="$t('userManagement.userInfo.form.userRole')"
          :rules="[
            {
              required: true,
              message: $t('userManagement.form.error.userRole.required'),
            },
          ]"
        >
          <a-select
            v-model="formData.userRole"
            :placeholder="$t('userManagement.userInfo.placeholder.userRole')"
          >
            <a-option value="user">{{
              $t('userManagement.form.userRole.user')
            }}</a-option>
            <a-option value="ban">{{
              $t('userManagement.form.userRole.ban')
            }}</a-option>
          </a-select>
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
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    UserState,
    updateUser,
    addUser,
    getUserById,
    updateUserPassword,
  } from '@/api/user';

  import { useRoute, useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import { PageTypeEnum } from '@/enums';

  const { loading, setLoading } = useLoading();
  const { t } = useI18n();
  const route = useRoute();
  const router = useRouter();

  const formRef = ref<FormInstance>();
  const formData = ref<Partial<UserState>>({
    userAccount: '',
    userName: '',
    userPassword: '',
    userRole: '',
    userProfile: '',
    userAvatar: '',
    email: '',
    phone: '',
  });

  const titleNameOptions: Record<number, string> = {
    [PageTypeEnum.EDIT]: t('menu.userManagement.edit'),
    [PageTypeEnum.ADD]: t('menu.userManagement.add'),
    [PageTypeEnum.UPDATE_PASSWORD]: t('menu.userManagement.updatePassword'),
  };

  const isEdit = computed<boolean>(() => !!route.query.id);

  const handleAddUser = () => {
    setLoading(true);
    addUser(formData.value)
      .then(() => {
        Message.success('添加成功!');
        router.push('/user_management/user_list');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditUser = () => {
    setLoading(true);
    updateUser(formData.value)
      .then(() => {
        Message.success('修改成功!');
        router.push('/user_management/user_list');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditPassword = () => {
    setLoading(true);
    updateUserPassword(formData.value)
      .then(() => {
        Message.success('修改成功!');
        router.push('/user_management/user_list');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetUserById = () => {
    getUserById(Number(route.query.id)).then((res) => {
      formData.value = res.data;
      formData.value.userPassword = '';
    });
  };

  const submitStrategy: Record<number, any> = {
    [PageTypeEnum.EDIT]: handleEditUser,
    [PageTypeEnum.ADD]: handleAddUser,
    [PageTypeEnum.UPDATE_PASSWORD]: handleEditPassword,
  };

  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      submitStrategy[Number(route.query.pageType)]();
    }
  };
  const reset = async () => {
    await formRef.value?.resetFields();
  };

  onMounted(() => {
    if (isEdit.value) {
      handleGetUserById();
    }
  });
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
