<template>
  <div class="dropdown">
    <label class="app-label">
      {{label}}:
      <button
          class="dropdown_button"
          type="button"
          ref="dropDownBtn"
          @click="toggleShow"
      >
        Выберите из списка
      </button>
    </label>

    <ul
        class="dropdown_list"
        ref="dropDownList"
    >
      <li
          class="dropdown_list-item"
          v-for="option in optionsContent"
          :data-value="option.value"
          @click="selectValue"
      >
        {{ option.name }}
      </li>
    </ul>

    <input
        class="dropdown_input-hidden"
        type="text"
        name="select-category"
        :value="modelValue"
        @input="update"
    />
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: 'dropdown',
  props: {
    optionsContent: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String
    }
  },

  setup(props, {emit}) {
    const dropDownBtn = ref(null);
    const dropDownList = ref(null);


    const update = (event) => {
      emit("update:modelValue", event.target.value)
    }

    const toggleShow = () => {
      dropDownList.value.classList.toggle('dropdown_list--visible');
      dropDownBtn.value.classList.add('dropdown_button-active')
    }
    const selectValue = (el) => {
      dropDownBtn.value.innerText = el.target.innerText;
      dropDownBtn.value.focus();

      emit('update:modelValue', el.target.dataset.value)

      dropDownList.value.classList.remove('dropdown_list--visible');
    }

    document.addEventListener('click', function (event) {
      if (event.target !== dropDownBtn.value) {
        dropDownBtn.value.classList.remove('dropdown_button-active');
        dropDownList.value.classList.remove('dropdown_list--visible');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Tab' || event.key === 'Escape') {
        dropDownBtn.value.classList.remove('dropdown_button-active');
        dropDownList.value.classList.remove('dropdown_list--visible');
      }
    })

    return {
      dropDownBtn,
      dropDownList,
      toggleShow,
      selectValue,
      update
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown_button {
  position: relative;
  display: block;
  width: 100%;
  text-align: left;

  background: white;
  border: 1px solid darkgrey;
  border-radius: 5px;
  /*height: 40 px;*/

  padding: 10px 15px;
  margin-bottom: 10px;

  font-size: 12px;
}

.dropdown_button-active {
  outline: none;
  box-shadow: 0 0 0 1px hsla(248, 56%, 85%, 100%);
}

.dropdown_button::before {
  content: "";
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  width: 0;
  height: 0;
  border-width: 8px 6px 0 6px;
  border-color: #80808073 transparent transparent transparent;
  border-style: solid;

  pointer-events: none;
}

.dropdown_list {
  display: none;

  position: absolute;
  left: 0;
  top: 37px;

  margin: 0;
  padding: 0;
  list-style-type: none;

  background: white;
  box-shadow: 0 4px 8px rgba(176, 198, 225, 0.6);
  overflow: hidden;

  border-radius: 5px;
  width: 100%;

  z-index: 1;
}

.dropdown_list--visible {
  display: block;
}

.dropdown_list-item {
  margin: 0;
  padding: 0;
  border: 1px solid darkgrey;
  border-bottom: 0;
  padding: 10px 15px;
  cursor: pointer;

  font-size: 13px;
}

.dropdown_list-item:first-child {
  border-radius: 5px 5px 0 0;
}

.dropdown_list-item:last-child {
  border-radius: 0 0 5px 5px;
  border-bottom: 1px solid darkgrey;
}

.dropdown_list-item:hover {
  background: rgba(176, 198, 225, 0.6);
}

.dropdown_input-hidden {
  display: none;
}
</style>