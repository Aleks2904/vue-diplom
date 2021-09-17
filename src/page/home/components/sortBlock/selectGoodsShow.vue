<template>
    <castom-select :title="title" v-model:model="model">
        <option value="3">3 товара</option>
        <option value="6">6 товаров</option>
        <option value="9">9 товаров</option>
        <option value="12">12 товаров</option>
        <option value="15">15 товаров</option>
        <option value="18">18 товаров</option>
        <option value="21">21 товар</option>
    </castom-select>
</template>

<script>
import castomSelect from "@/page/home/components/sortBlock/castomSelect";
import { toRefs, computed } from "vue";
export default {
    props: ["title", "model"],
    components: { castomSelect },
    setup(props, { emit }) {
        const { title } = toRefs(props);
        const model = computed({
            get: () => props.model,
            set: (value) => {
                emit("update:model", value);
            },
        });

        return { title, model };
    },
};
</script>

<style lang="scss" scoped>
</style>