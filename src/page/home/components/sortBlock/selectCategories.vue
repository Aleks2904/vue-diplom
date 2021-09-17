<template>
    <castom-select :title="title" v-model:model="model">
        <option value="0">Все категории</option>
        <option v-for="item in arr" :key="item.id" :value="item.id">
            {{ item.title }}
        </option>
    </castom-select>
</template>

<script>
import castomSelect from "@/page/home/components/sortBlock/castomSelect";
import { toRefs, computed } from "vue";
export default {
    props: ["title", "model", "arr"],
    components: { castomSelect },
    setup(props, { emit }) {
        const { title } = toRefs(props);
        const { arr } = toRefs(props);
        const model = computed({
            get: () => props.model,
            set: (value) => {
                emit("update:model", value);
            },
        });
        return { title, model, arr };
    },
};
</script>

<style lang="scss" scoped>
</style>