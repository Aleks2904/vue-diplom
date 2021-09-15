<template>
    <aside class="filter">
        <form class="filter__form form" @submit.prevent="submitHandler">
            <fieldset class="form__block">
                <legend class="form__legend">Цена</legend>
                <label class="form__label form__label--price">
                    <input
                        class="form__input"
                        type="number"
                        v-model.number="minPrice"
                    />
                    <span class="form__value">От</span>
                </label>
                <label class="form__label form__label--price">
                    <input
                        class="form__input"
                        type="number"
                        v-model.number="maxPrice"
                    />
                    <span class="form__value">До</span>
                </label>
            </fieldset>

            <fieldset class="form__block">
                <legend class="form__legend">количество товара для пока</legend>
                <label class="form__label form__label--select">
                    <select class="form__select" v-model.number="productLimit">
                        <option value="3">3 товар</option>
                        <option value="6">6 товаров</option>
                        <option value="9">9 товаров</option>
                        <option value="12">12 товаров</option>
                        <option value="15">15 товаров</option>
                        <option value="18">18 товаров</option>
                        <option value="21">21 товаров</option>
                    </select>
                </label>
            </fieldset>

            <fieldset class="form__block">
                <legend class="form__legend">Категория</legend>
                <label class="form__label form__label--select">
                    <select class="form__select" v-model.number="sortCategory">
                        <option value="0">Все категории</option>
                        <option
                            v-for="item in sortsCategoryArr"
                            :key="item.id"
                            :value="item.id"
                        >
                            {{ item.title }}
                        </option>
                    </select>
                </label>
            </fieldset>

            <fieldset class="form__block">
                <legend class="form__legend">Материал</legend>
                <ul class="check-list">
                    <li
                        v-for="item in sortsMaterialsArr"
                        :key="item.id"
                        class="check-list__item"
                    >
                        <label class="check-list__label">
                            <input
                                class="check-list__check sr-only"
                                type="checkbox"
                                v-model="sortMaterials[item.id]"
                            />
                            <span class="check-list__desc">
                                {{ item.title }}
                                <span>({{ item.productsCount }})</span>
                            </span>
                        </label>
                    </li>
                </ul>
            </fieldset>

            <fieldset class="form__block">
                <legend class="form__legend">Коллекция</legend>
                <ul class="check-list">
                    <li
                        v-for="item in sortsSeasonsArr"
                        :key="item.id"
                        class="check-list__item"
                    >
                        <label class="check-list__label">
                            <input
                                class="check-list__check sr-only"
                                type="checkbox"
                                v-model="sortSeasons[item.id]"
                            />
                            <span class="check-list__desc">
                                {{ item.title }}
                                <span>({{ item.productsCount }})</span>
                            </span>
                        </label>
                    </li>
                    <li class="check-list__item">
                        <label class="check-list__label">
                            <input
                                class="check-list__check sr-only"
                                type="checkbox"
                                name="collection"
                                value="зима"
                            />
                            <span class="check-list__desc">
                                зима
                                <span>(53)</span>
                            </span>
                        </label>
                    </li>
                </ul>
            </fieldset>

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
import { ref, onMounted, watch } from "vue";
import { sortCategoryArr, sortMaterialsArr, sortSeasonsArr } from "@/api/sort";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();

        const productLimit = ref(3);

        const minPrice = ref(0);
        const maxPrice = ref(0);

        const sortCategory = ref(0);
        const sortsCategoryArr = ref();

        const sortMaterials = ref({});
        const sortsMaterialsArr = ref();

        const sortSeasons = ref({
            1: true,
        });
        const sortsSeasonsArr = ref();

        function submitHandler() {
            let sortMaterialArr = new Object(sortMaterials.value);
            for (let key in sortMaterialArr) {
                if (!sortMaterialArr[key]) {
                    delete sortMaterialArr[key];
                }
            }
            sortMaterialArr = Object.keys(sortMaterialArr).map(Number);

            let sortSeasonsArr = new Object(sortSeasons.value);
            for (let key in sortSeasonsArr) {
                if (!sortSeasonsArr[key]) {
                    delete sortSeasonsArr[key];
                }
            }
            sortSeasonsArr = Object.keys(sortSeasonsArr).map(Number);

            store.commit("product/setPriceMin", minPrice.value);
            store.commit("product/setPriceMax", maxPrice.value);
            store.commit("product/setSortId", sortCategory.value);
            store.commit("product/setMaterialId", sortMaterialArr);
            store.commit("product/setCollectionId", sortSeasonsArr);
            store.commit("product/setPage", 1);
            store.dispatch("product/getProducts");
        }

        function reset() {
            minPrice.value = 0;
            maxPrice.value = 0;
            sortCategory.value = 0;
            sortMaterials.value = {};
            sortSeasons.value = { 1: true };

            submitHandler();
        }

        watch(productLimit, () => {
            store.commit("product/setProductShow", productLimit.value);
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
            sortMaterials,
            sortsMaterialsArr,
            sortSeasons,
            sortsSeasonsArr,
            submitHandler,
            reset,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>