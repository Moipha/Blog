<script lang="ts" setup>
import { provide, ref, VNodeChild, render, defineComponent } from 'vue'

defineProps({
  data: {
    type: Array as () => { _id: string; [key: string]: any }[],
    required: true
  }
})

const columns = ref<
  {
    prop: string
    label: string
    width: number
    slots: ((item: any) => VNodeChild) | undefined
  }[]
>([])

function registerColumn(
  prop: string,
  label: string,
  width: number,
  slots: ((item: any) => VNodeChild) | undefined
) {
  columns.value.push({ prop, label, width, slots })
}

// 提供注册列方法上下文
provide('registerColumn', registerColumn)

const VNode = defineComponent({
  props: {
    content: {
      type: Object
    }
  },
  render(): any {
    return this.content
  }
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.prop"
          :style="{ minWidth: column.width + 'px' }"
          scope="col"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
      <tr v-for="item in data" :key="item._id">
        <td v-for="column in columns" :key="column.prop">
          <template v-if="column.slots">
            <VNode :content="column.slots(item) as any" />
          </template>
          <template v-else>{{ item[column.prop] }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
  margin-top: 40px;
  border-spacing: 0;
  border: 1.5px solid var(--border);
  border-radius: 10px;

  thead {
    color: var(--light-text);
  }

  td {
    height: 56px;
    border-top: 1.5px solid var(--border);
    text-align: center;
  }

  th {
    height: 40px;
  }

  tr {
    transition: 0.1s all ease;

    &:hover {
      background-color: var(--table-hover);
    }
  }
  .action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .btn {
      height: 40px;
      padding: 10px 11px;
    }
  }
}
</style>
