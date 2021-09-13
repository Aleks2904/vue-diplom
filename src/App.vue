<template>
    <router-view></router-view>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        onMounted(async () => {
            await store.dispatch("product/getProducts");
            await store.dispatch("basket/reloadBaskets");
        });
        return {};
    },
};
</script>

<style lang="scss" scoped>
</style>
