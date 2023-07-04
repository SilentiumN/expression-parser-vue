<script lang="ts" setup>
import type { Ref } from 'vue';
import { defineEmits, defineProps, ref } from 'vue';
import TableInput from '@/components/TableItem/TableInput.vue';
import TableSelect from '@/components/TableItem/TableSelect.vue';
import TableEmpty from '@/components/TableItem/TableEmpty.vue';
import { ItemList, ItemTable, OptionSelect } from '@/types/TableTypes';
import { dataForUpdateVariable } from '@/types/VariableTypes';

interface Header {
  value: string;
  name: string;
}

export interface Props {
  typeVariable: 'computed' | 'initial';
  items: ItemList;
}

const props = defineProps<Props>();

const emit = defineEmits<{(e: 'updateVariable', id: string, data: dataForUpdateVariable): void
  (e: 'deleteVariable', id: string): void,
  (e: 'addVariable', isComputedVariable: boolean): void
}>();

const headers: Ref<Header[]> = ref([
  {
    value: 'name',
    name: 'Переменная',
  },
  {
    value: 'type',
    name: 'Тип',
  },
  {
    value: 'value',
    name: props.typeVariable === 'computed' ? 'Формула' : 'Начальное значение',
  },
]);

const selectComponent = (headerValue: string, item: ItemTable, id: string) => {
  let component = TableEmpty;
  if (headerValue === 'name') {
    component = TableInput;
  }
  if (
    headerValue === 'type'
    || (headerValue === 'value' && item.type === 'boolean' && props.typeVariable === 'initial')
  ) {
    component = TableSelect;
  }
  if (
    (headerValue === 'value' && item.type === 'number')
    || (headerValue === 'value' && props.typeVariable === 'computed')
  ) {
    component = TableInput;
  }
  return component;
};

const selectProps = (headerValue: string, item: ItemTable, id: string) => {
  let currentProps = {};

  if (headerValue === 'name') {
    currentProps = {
      name: `name-${id}`,
      type: 'text',
      value: item.name,
      placeholder: 'Введите имя',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange: () => {
      },
    };
  }
  if (headerValue === 'type') {
    currentProps = {
      options: [
        {
          value: 'boolean',
          title: 'Логическое значение',
        },
        {
          value: 'number',
          title: 'Число',
        },
      ],
      default: item[headerValue],
      unselectedText: 'Выберите тип',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onInput: (selectedOption: OptionSelect) => {
        console.log(selectedOption, {
          name: item.name,
          type: selectedOption.value,
          [props.typeVariable === 'computed' ? 'expression' : 'value']: item.value,
        });
        emit('updateVariable', id, {
          name: item.name,
          type: selectedOption.value,
          [props.typeVariable === 'computed' ? 'expression' : 'value']: item.value,
        });
      },
    };
  }
  if (headerValue === 'value' && item.type === 'boolean' && props.typeVariable === 'initial') {
    currentProps = {
      options: [
        {
          value: true,
          title: 'Да',
        },
        {
          value: false,
          title: 'Нет',
        },
      ],
      default: item[headerValue],
      unselectedText: 'Выберите значение',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onInput: () => {
      },
    };
  }
  if (headerValue === 'value' && item.type === 'number') {
    currentProps = {
      name: `input-${item.name}-initial`,
      type: 'number',
      value: item.value,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange: () => {
      },
    };
  }
  if (headerValue === 'value' && props.typeVariable === 'computed') {
    currentProps = {
      name: `input-${item.name}-computed`,
      type: 'text',
      value: item.value,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange: () => {
      },
    };
  }

  return currentProps;
};
</script>

<template>
  <div
    class="table__wrap"
  >
    <div
      class="table"
    >
      <div
        class="table__rows"
      >
        <div
          v-for="headerItem in headers"
          :key="headerItem.value"
          class="table__rows-item table__rows-item_left"
        >
          {{ headerItem.name }}
        </div>
        <div
          class="table__rows-item table__rows-item_center"
        />
      </div>
      <div
        v-for="[id, item] in items"
        :key="id"
        class="table__rows"
      >
        <div
          v-for="headerItem in headers"
          :key="headerItem.value"
          class="table__rows-item table__rows-item_left"
        >
          <component
            :is="selectComponent(headerItem.value, item, id)"
            v-bind="selectProps(headerItem.value, item,  id)"
          />
        </div>
        <div
          class="table__rows-item table__rows-item_center"
        >
          <button
            class="table__delete-btn"
            @click="emit('deleteVariable', id)"
          >
            <font-awesome-icon icon="fa-solid fa-trash"/>
          </button>
        </div>
      </div>
    </div>
    <button
      class="button button_purple"
      @click="emit('addVariable', props.typeVariable === 'computed')"
    >
      Добавить переменную
    </button>
  </div>
</template>

<style lang="scss">
@import '../../assets/styles/variable/variable-table';
</style>
