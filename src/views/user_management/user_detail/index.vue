<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.userManagement',
        isEdit ? 'menu.userManagement.edit' : 'menu.userManagement.add',
      ]"
    />
    <a-card
      class="general-card"
      :title="
        $t(isEdit ? 'menu.userManagement.edit' : 'menu.userManagement.add')
      "
    >
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
          :rules="[
            {
              required: true,
              message: $t('userManagement.form.error.userName.required'),
            },
          ]"
        >
          <a-input
            v-model="formData.userName"
            :placeholder="$t('userManagement.userInfo.placeholder.userName')"
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
          field="countryRegion"
          :label="$t('userSetting.basicInfo.form.label.countryRegion')"
          :rules="[
            {
              required: true,
              message: $t('userSetting.form.error.countryRegion.required'),
            },
          ]"
        >
          <a-select
            v-model="formData.countryRegion"
            :placeholder="$t('userSetting.basicInfo.placeholder.area')"
          >
            <a-option value="China">中国</a-option>
          </a-select>
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
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { BasicInfoModel } from '@/api/user-center';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const formRef = ref<FormInstance>();
  const formData = ref<BasicInfoModel>({
    email: '',
    nickname: '',
    countryRegion: '',
    area: '',
    address: '',
    profile: '',
  });

  const isEdit = computed<boolean>(() => !!route.query.id);

  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      // do some thing
      // you also can use html-type to submit
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
