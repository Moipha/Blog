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
  },
  width: {
    type: String,
    default: 'auto'
  },
  align: {
    type: String as () => 'center' | 'left' | 'right' | 'justify' | 'char',
    default: 'center'
  }
})

// 列
const columns = ref<
  {
    prop: string
    label: string
    width: number
    slots: ((item: any) => VNodeChild) | undefined
  }[]
>([])

// 注册列
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

// 渲染td插槽内容
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
          :style="{ width: column.width + 'px', minWidth: column.width + 'px' }"
          scope="col"
          :align="align">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody :style="{ maxHeight: height }">
      <!-- 用于加载插槽中的TableColumn以注册各个列，实际不渲染任何标签 -->
      <slot></slot>
      <tr v-for="item in data" :key="item._id">
        <td
          v-for="column in columns"
          :key="column.prop"
          :style="{
            width: column.width + 'px',
            minWidth: column.width + 'px'
          }"
          :align="align">
          <!-- 如果该列有插槽函数就加载插槽函数，否则直接渲染属性值 -->
          <template v-if="column.slots">
            <!-- 传入整个对象作为插槽函数的参数 -->
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
  --table-border: var(--normal-border);
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

  tbody,
  thead {
    display: block;
    scrollbar-color: var(--hover) var(--border);
    scrollbar-width: thin;
    scroll-snap-type: y;
    scrollbar-gutter: stable;
  }

  tbody {
    display: block;
    overflow-y: auto;

    tr {
      scroll-snap-align: start;

      &:first-child td {
        border-top: none;
      }
    }
  }

  thead {
    display: block;
    overflow-x: auto;
    color: var(--light-text);
    border-bottom: var(--table-border);
  }

  td {
    height: 56px;
    border-top: var(--table-border);
  }

  th {
    height: 40px;
  }

  th:nth-of-type(1),
  td:nth-of-type(1) {
    padding-left: 15px;
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
