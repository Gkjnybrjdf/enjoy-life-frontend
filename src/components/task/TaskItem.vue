<template>
  <div>
    <div class="task-item">
      <select-button
          @click="$emit('archive', task)"
      >
      </select-button>

      <b-icon-arrow-up
          class="btns"
          :class="{'priority-low': isLow, 'priority-medium': isMedium, 'priority-high': isHigh}"
      />

      <div>
        <div class="task-item-name">
          {{ task.name }}
          {{ task.id }}
        </div>
      </div>

      <div style="margin-left: auto;">
        <span style="color: #AFAFBC; ">
          <i v-if="task.easy">
            Задача легкая
          </i>
          <i v-else>
            Задача сложная
          </i>
        </span>

        <b-icon-pencil-fill
            class="btns"
            @click="$emit('edit', task)"
        />

        <b-icon-trash3-fill
            class="btns"
            @click="$emit('remove', task)"
        />

        <b-icon-chevron-down
            class="btns"
            v-if="!task.showChildren"
            @click="$emit('fetch-children', task.id)"
        />

        <b-icon-chevron-compact-up
            class="btns"
            v-if="task.showChildren"
            @click="$emit('close-children', task)"
        />
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import SelectButton from "@/components/UI/SelectButton";
import {ref} from "vue";

export default {
  components: {SelectButton},

  props: {
    task: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const isLow = ref(props.task.priority === "LOW")
    const isMedium = ref(props.task.priority === "MEDIUM")
    const isHigh = ref(props.task.priority === "HIGH")

    return {
      isLow,
      isMedium,
      isHigh
    }
  }
}
</script>

<style scoped>
.task-item {
  margin: 5px;
  padding: 10px;
  font-size: 11px;
  background-color: #EBEAFF;
  border-radius: 15px;
  box-shadow: 2px 2px 4px #AFAFBC;
  display: flex;
  align-items: center;
}

.task-item-name {
  margin-left: 5px
}

.btns {
  margin-left: 10px;
  width: 15px;
  height: 15px;
  color: darkgrey;
}

.priority-low {
  color: green;
}

.priority-medium {
  color: orange;
}

.priority-high {
  color: red;
}

.btns:hover {
  color: #C9C9C9;
}
</style>