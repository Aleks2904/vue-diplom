<template>
    <ul class="catalog__list">
        <item-of-goods />
    </ul>
</template>

<script>
import itemOfGoods from "@/page/home/components/items/itemOfGoods";

export default {
    components: {
        itemOfGoods,
    },
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
</style>