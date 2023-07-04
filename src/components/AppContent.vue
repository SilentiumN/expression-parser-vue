<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/store/index';
import TabsWrapper from '@/components/Variable/VariableTabs.vue';
import TablesWrapper from '@/components/Variable/VariableTables.vue';
import {
  dataForUpdateVariable,
  resultVariable,
  resultVariableList,
  Variable,
  VariableList,
} from '@/types/VariableTypes';
import { ItemList, ItemTable } from '@/types/TableTypes';

const store = useCounterStore();
const { variable } = storeToRefs(store);
const initialVariables: Ref<VariableList> = ref(new Map<string, Variable>());
const initialVariableTableItems: Ref<ItemList> = ref(new Map<string, ItemTable>());
const computedVariables: Ref<VariableList> = ref(new Map<string, Variable>());
const computedVariableTableItems: Ref<ItemList> = ref(new Map<string, ItemTable>());
const tabsList: Ref<string[]> = ref(['Вводимые значения', 'Вычисляемые значения', 'Проверка расчетов']);
const resultInitialVariable: Ref<resultVariableList> = ref(new Map<string, resultVariable>());
const resultComputedVariable: Ref<resultVariableList> = ref(new Map<string, resultVariable>());

const getVariableTableItems = (mapVariable: VariableList): ItemList => {
  const items = new Map<string, ItemTable>() as ItemList;

  mapVariable.forEach((mapValue, mapKey) => {
    const value = (): ItemTable['value'] => {
      if (mapValue.computedVariable) {
        return mapValue.expression;
      }
      return mapValue.value;
    };

    items.set(mapKey, {
      name: mapValue.name,
      type: mapValue.type,
      value: value(),
    });
  });

  return items;
};

const getVariablesByType = (isComputedVariableList: boolean): VariableList => {
  const items = new Map<string, Variable>() as VariableList;

  variable.value.forEach((value, key) => {
    console.log(key, 'k', value, 'v');
    if (value.computedVariable === isComputedVariableList) {
      items.set(key, value);
    }
  });

  return items;
};

const getAllValueVariable = (): Record<string, Variable['value']> => {
  const variables = {} as Record<string, Variable['value']>;

  variable.value.forEach((mapValue) => {
    variables[mapValue.name] = mapValue.value;
  });

  return variables;
};

const getResultVariable = (isComputedVariableList: boolean) => {
  const variables = getAllValueVariable() as Record<string, Variable['value']>;
  const keys = Object.keys(variables);
};

store.$subscribe(() => {
  initialVariables.value = getVariablesByType(false);
  initialVariableTableItems.value = getVariableTableItems(initialVariables.value);
  computedVariables.value = getVariablesByType(true);
  computedVariableTableItems.value = getVariableTableItems(computedVariables.value);
  getResultVariable(false);
});

const updateVariable = (id: string, data: dataForUpdateVariable): void => {
  store.updateVariable(id, data);
};

const deleteVariable = (id: string): void => {
  store.deleteVariable(id);
};

const addVariable = (isComputedVariable: boolean): void => {
  store.addVariable(isComputedVariable);
};
</script>

<template>
  <div
    class="app__content"
  >
    <div
      class="app__tabs-container"
    >
      <TabsWrapper
        ref="tabs"
        :tabs-list="tabsList"
      >
        <template #tab-0>
          <TablesWrapper
            :items="initialVariableTableItems"
            type-variable="initial"
            @addVariable="addVariable"
            @deleteVariable="deleteVariable"
            @updateVariable="updateVariable"
          />
        </template>
        <template #tab-1>
          <TablesWrapper
            :items="computedVariableTableItems"
            type-variable="computed"
            @addVariable="addVariable"
            @deleteVariable="deleteVariable"
            @updateVariable="updateVariable"
          />
        </template>
        <template #tab-2>

        </template>
      </TabsWrapper>
    </div>
    <div
      class="app__footer"
    >
      <button
        class="button button_purple"
      >
        Сохранить
      </button>
      <button
        class="button button_transparent"
      >
        Очистить
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
