<template>
  <div class="container">
    <Breadcrumb :items="['menu.userManagement', 'menu.userManagement.list']" />
    <a-card class="general-card" :title="$t('menu.userManagement.list')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="userName"
                  :label="$t('userManagement.form.userName')"
                >
                  <a-input
                    v-model="formModel.userName"
                    :placeholder="
                      $t('userManagement.form.userName.placeholder')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="userAccount"
                  :label="$t('userManagement.form.userAccount')"
                >
                  <a-input
                    v-model="formModel.userAccount"
                    :placeholder="
                      $t('userManagement.form.userAccount.placeholder')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="userRole"
                  :label="$t('userManagement.form.userRole')"
                >
                  <a-select
                    v-model="formModel.userRole"
                    :options="userRoleTypeOptions"
                    :placeholder="$t('userManagement.form.userRole')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createTime"
                  :label="$t('userManagement.form.createTime')"
                >
                  <a-range-picker
                    v-model="formModel.createTime as any"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('userManagement.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('userManagement.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('userManagement.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('userManagement.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('userManagement.operation.download') }}
          </a-button>
          <a-tooltip :content="$t('userManagement.actions.refresh')">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('userManagement.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('userManagement.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #userAvatar="{ record }">
          <a-avatar :size="48" shape="square">
            <img alt="avatar" :src="record.userAvatar" />
          </a-avatar>
        </template>
        <template #userRole="{ record }">
          <a-tag
            v-if="record.userRole === 'admin'"
            color="purple"
            :closable="false"
          >
            {{ record.userRole }}
          </a-tag>
          <a-tag
            v-if="record.userRole === 'user'"
            color="cyan"
            :closable="false"
          >
            {{ record.userRole }}
          </a-tag>
          <a-tag v-if="record.userRole === 'ban'" color="red" :closable="false">
            {{ record.userRole }}
          </a-tag>
        </template>
        <template #operations="{ record }">
          <a-button
            v-permission="['admin']"
            type="text"
            size="small"
            @click="handleEdit(record)"
          >
            {{ $t('userManagement.operation.edit') }}
          </a-button>
          <a-button
            v-permission="['admin']"
            type="text"
            size="small"
            status="danger"
            @click="handleDelete(record)"
          >
            {{ $t('userManagement.operation.delete') }}
          </a-button>
          <a-button
            v-permission="['admin']"
            type="text"
            size="small"
            status="warning"
            @click="handleUpdatePassword(record)"
          >
            {{ $t('userManagement.operation.updatePassword') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { listUserByPage, deleteUser } from '@/api/user';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { useRouter } from 'vue-router';
  import { Message, Modal } from '@arco-design/web-vue';
  import { PageTypeEnum } from '@/enums';
  import { UserState } from '@/store/modules/user/types';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const router = useRouter();

  const generateFormModel = () => {
    return {
      token: '',
      id: undefined,
      userAvatar: '',
      userName: '',
      userProfile: '',
      userRole: '',
      phone: undefined,
      email: '',
      createTime: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<any[]>([]);
  const formModel = ref<Partial<UserState>>(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const densityList = computed(() => [
    {
      name: t('userManagement.size.mini'),
      value: 'mini',
    },
    {
      name: t('userManagement.size.small'),
      value: 'small',
    },
    {
      name: t('userManagement.size.medium'),
      value: 'medium',
    },
    {
      name: t('userManagement.size.large'),
      value: 'large',
    },
  ]);
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('userManagement.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: t('userManagement.columns.userAccount'),
      dataIndex: 'userAccount',
    },
    {
      title: t('userManagement.columns.userName'),
      dataIndex: 'userName',
    },
    {
      title: t('userManagement.columns.userProfile'),
      dataIndex: 'userProfile',
    },
    {
      title: t('userManagement.columns.userAvatar'),
      dataIndex: 'userAvatar',
      slotName: 'userAvatar',
    },
    {
      title: t('userManagement.columns.phone'),
      dataIndex: 'phone',
    },
    {
      title: t('userManagement.columns.email'),
      dataIndex: 'email',
    },
    {
      title: t('userManagement.columns.userRole'),
      dataIndex: 'userRole',
      slotName: 'userRole',
    },
    {
      title: t('userManagement.columns.createTime'),
      dataIndex: 'createTime',
    },
    {
      title: t('userManagement.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ]);
  const userRoleTypeOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('userManagement.form.userRole.admin'),
      value: 'admin',
    },
    {
      label: t('userManagement.form.userRole.user'),
      value: 'user',
    },
    {
      label: t('userManagement.form.userRole.ban'),
      value: 'ban',
    },
  ]);

  const fetchData = async (params: any = { current: 1, pageSize: 20 }) => {
    setLoading(true);
    try {
      const { data } = await listUserByPage(params);
      renderData.value = data.records;
      pagination.current = params.current;
      pagination.total = Number(data.total);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as any);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };

  const handleAdd = () => {
    router.push({
      path: '/user_management/user_add',
      query: {
        pageType: PageTypeEnum.ADD,
      },
    });
  };

  const handleEdit = (user: Partial<UserState>) => {
    router.push({
      path: '/user_management/user_edit',
      query: {
        id: user.id,
        pageType: PageTypeEnum.EDIT,
      },
    });
  };

  const handleUpdatePassword = (user: Partial<UserState>) => {
    router.push({
      path: '/user_management/user_edit',
      query: {
        id: user.id,
        pageType: PageTypeEnum.UPDATE_PASSWORD,
      },
    });
  };

  const handleDelete = (user: UserState) => {
    Modal.open({
      title: '删除确认',
      content: '确认删除该账户吗?',
      onOk: () => {
        deleteUser({ id: user.id }).then(() => {
          Message.success('删除成功!');
          search();
        });
      },
    });
  };

  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };

  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<script lang="ts">
  export default {
    name: 'UserManagement',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
