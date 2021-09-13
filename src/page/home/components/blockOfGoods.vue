<template>
    <section class="catalog">
        <list-of-goods />
        <pagination />
    </section>
</template>

<script>
import listOfGoods from "@/page/home/components/listOfGoods";
import pagination from "@/page/home/components/pagination";

export default {
    components: {
        listOfGoods,
        pagination,
    },
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
</style>