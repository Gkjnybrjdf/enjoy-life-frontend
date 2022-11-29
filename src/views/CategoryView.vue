<template>
  <div>
    <div style="display: flex">
      <h1>Категории</h1>
      <div class="btns">
        <prompt :content="'Добавить категорию'">
          <b-icon-plus-circle
              class="btn_add"
              @click="showAddDialog"
          />
        </prompt>
      </div>
    </div>

    <app-dialog
        v-model:show="dialogVisible"
        :headerName="headerName"
    >
      <category-form
          :category="category"
          @submit="submitCategory"
      >
      </category-form>
    </app-dialog>

    <category-list
        :categories="categories"
        @edit="showEditDialog"
        @remove="removeCategory"
    >
    </category-list>
  </div>
</template>

<script>
import Prompt from "@/components/UI/Prompt";
import CategoryList from "@/components/category/CategoryList";
import {ref} from "vue";
import {deleteCategory, getCategory, saveCategory, updateCategory} from "@/hooks/useCategoryApi";
import AppDialog from "@/components/UI/AppDialog";
import CategoryForm from "@/components/category/CategoryForm";

export default {
  components: {CategoryForm, AppDialog, CategoryList, Prompt},

  setup(props) {
    const clearCategory = () => {
      category.value = {
        id: undefined,
        name: undefined,
        description: undefined
      }
    }
    const categories = ref([])
    const dialogVisible = ref(false)
    const headerName = ref("")
    const category = ref({})
    clearCategory()

    getCategory("/api/categories/list")
        .then(_categories => {
          categories.value = _categories
        })

    const removeCategory = (category) => {
      deleteCategory(`/api/categories/${category.id}`)
      categories.value.splice(categories.value.indexOf(category), 1)
    }

    const showAddDialog = () => {
      headerName.value = "Создание категории"
      dialogVisible.value = true
    }

    const showEditDialog = (_category) => {
      headerName.value = "Редактирование категории"
      dialogVisible.value = true
      category.value = {..._category}
    }

    const submitCategory = (newCategory) => {
      if (newCategory.id === undefined) {
        saveCategory("/api/categories", newCategory)
            .then(_category => {
              categories.value.push(_category)
              dialogVisible.value = false
              clearCategory()
            })
      } else {
        updateCategory(`/api/categories/${newCategory.id}`, newCategory)
            .then(_category => {
              categories.value[categories.value
                  .findIndex((el) => el.id === newCategory.id)] = _category
              dialogVisible.value = false
              clearCategory()
            })
      }
    }

    return {
      categories,
      dialogVisible,
      headerName,
      category,
      showAddDialog,
      removeCategory,
      submitCategory,
      showEditDialog
    }
  }
}
</script>

<style scoped>
.btn_add {
  color: #7B68EE;
  width: 30px;
  height: 30px;
  margin: 2px;
}

.btns {
  margin-left: auto;
}
</style>