<template>
    <aside class="filter">
        <form class="filter__form form" @submit.prevent="submitHandler">
            <sortPrice
                v-model:minPrice="minPrice"
                v-model:maxPrice="maxPrice"
            />

            <select-goods-show
                :title="'количество товара для показа'"
                v-model:model="productLimit"
            />

            <select-categories
                :title="'Категория'"
                :arr="sortsCategoryArr"
                v-model:model="sortCategory"
            />

            <castom-check-box
                :arr="sortsMaterialsArr"
                :title="'Материал'"
                v-model:value="sortMaterials"
            />

            <castom-check-box
                :arr="sortsSeasonsArr"
                :title="'Коллекция'"
                v-model:value="sortSeasons"
            />

            <button class="filter__submit button button--primery" type="submit">
                Применить
            </button>

            <button
                class="filter__reset button button--second"
                type="button"
                @click.prevent="reset"
            >
                Сбросить
            </button>
        </form>
    </aside>
</template>

<script>
import { ref, onMounted, watch, computed, reactive } from "vue";
import { sortCategoryArr, sortMaterialsArr, sortSeasonsArr } from "@/api/sort";
import { useStore } from "vuex";
import castomCheckBox from "@/page/home/components/sortBlock/castomCheckBox";
import selectCategories from "@/page/home/components/sortBlock/selectCategories";
import selectGoodsShow from "@/page/home/components/sortBlock/selectGoodsShow";
import sortPrice from "@/page/home/components/sortBlock/sortPrice";

export default {
    components: {
        castomCheckBox,
        selectCategories,
        selectGoodsShow,
        sortPrice,
    },
    setup() {
        const store = useStore();

        const productLimit = ref(store.state.product.productShow);

        const minPrice = ref(0);
        const maxPrice = ref(0);

        const sortCategory = ref(0);
        const sortsCategoryArr = ref();

        const sortsMaterialsArr = ref();
        const sortMaterials = ref({ 1: true });

        const sortsSeasonsArr = ref();
        const sortSeasons = ref({ 1: true });

        function changingArr(value) {
            let val = new Object(value);
            for (let key in val) {
                if (!val[key]) {
                    delete val[key];
                }
            }
            val = Object.keys(val).map(Number);
            return val;
        }

        function submitHandler() {
            store.commit("product/setPriceMin", minPrice.value);
            store.commit("product/setPriceMax", maxPrice.value);
            store.commit("product/setSortId", sortCategory.value);
            store.commit(
                "product/setMaterialId",
                changingArr(sortMaterials.value)
            );
            store.commit(
                "product/setCollectionId",
                changingArr(sortSeasons.value)
            );
            store.commit("product/setPage", 1);
            store.dispatch("product/getProducts");
        }

        function reset() {
            minPrice.value = 0;
            maxPrice.value = 0;
            sortCategory.value = 0;
            sortMaterials.value = { 1: true };
            sortSeasons.value = { 1: true };

            submitHandler();
        }

        watch(productLimit, () => {
            store.dispatch("product/getProducts");
        });

        onMounted(async () => {
            await sortCategoryArr().then((resp) => {
                if (resp.statusText === "OK") {
                    sortsCategoryArr.value = resp.data.items;
                }
            });

            await sortMaterialsArr().then((resp) => {
                if (resp.statusText === "OK") {
                    sortsMaterialsArr.value = resp.data.items;
                }
            });

            await sortSeasonsArr().then((resp) => {
                if (resp.statusText === "OK") {
                    sortsSeasonsArr.value = resp.data.items;
                }
            });
        });

        return {
            productLimit,
            minPrice,
            maxPrice,
            sortCategory,
            sortsCategoryArr,
            sortsMaterialsArr,
            sortMaterials,
            sortsSeasonsArr,
            sortSeasons,
            submitHandler,
            reset,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>