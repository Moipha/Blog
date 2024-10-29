<script lang="ts" setup>
import { provide, ref, VNodeChild, defineComponent } from 'vue'

defineProps({
  data: {
    type: Array as () => { _id: string; [key: string]: any }[],
    required: true
  },
  height: {
    type: String,
    default: 'auto'
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
          :style="{ width: column.width + 'px' }"
          scope="col"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody :style="{ maxHeight: height }">
      <slot></slot>
      <tr v-for="item in data" :key="item._id">
        <td
          v-for="column in columns"
          :key="column.prop"
          :style="{ width: column.width + 'px' }"
        >
          <template v-if="column.slots">
            <VNode :content="column.slots(item) as any" />
          </template>
          <template v-else>{{ item[column.prop] }}</template>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td :colspan="columns.length">
          <slot name="footer" />
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss" scoped>
table {
  --table-border: 1.5px solid var(--border);
  width: 100%;
  margin-top: 40px;
  border-spacing: 0;
  border: var(--table-border);
  border-radius: 10px;

  tbody,
  thead,
  tr {
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  tbody {
    display: block;
    overflow-y: scroll;
    scrollbar-color: var(--hover) var(--border);
    scrollbar-width: thin;
    scroll-snap-type: y;

    tr {
      scroll-snap-align: start;

      &:first-child td {
        border-top: none;
      }
    }
  }

  thead {
    color: var(--light-text);
    border-bottom: var(--table-border);
  }

  td {
    height: 56px;
    border-top: var(--table-border);
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

  tfoot tr {
    &:hover {
      background-color: var(--bg);
    }
    td {
      height: auto;
    }
  }
}
</style>
