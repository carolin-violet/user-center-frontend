<template>
  <div class="register-form-wrapper">
    <div class="register-form-title">{{ $t('register.form.title') }}</div>
    <div class="register-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="registerForm"
      :model="userInfo"
      class="register-form"
      @submit="handleSubmit"
    >
      <a-form-item
        field="userAccount"
        :rules="[
          {
            required: true,
            message: $t('register.form.userAccount.error.required'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.userAccount"
          :placeholder="$t('register.form.userAccount.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="userPassword"
        :rules="[
          {
            required: true,
            message: $t('register.form.userPassword.error.required'),
          },
          {
            minLength: 8,
            message: $t('register.form.userPassword.error.minLength8'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.userPassword"
          :placeholder="$t('register.form.userPassword.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="checkPassword"
        :rules="[
          {
            required: true,
            message: $t('register.form.checkPassword.error.required'),
          },
          {
            validator: (value, callback) => {
              value === userInfo.userPassword
                ? callback()
                : callback(
                    new Error(
                      $t('register.form.checkPassword.error.matchPassword')
                    )
                  );
            },
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.checkPassword"
          :placeholder="$t('register.form.checkPassword.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('register.form.submit') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import useLoading from '@/hooks/loading';
  import { register } from '@/api/user';

  const router = useRouter();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();

  const userInfo = ref({
    userAccount: '',
    userName: '',
    userPassword: '',
    userRole: '',
    userProfile: '',
    userAvatar: '',
    email: '',
    phone: '',
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      register({ ...values })
        .then(() => {
          Message.success('注册成功');
          router.push('/login');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
</script>

<style lang="less" scoped>
  .register-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
