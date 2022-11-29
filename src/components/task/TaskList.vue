<template>
  <div>
    <transition-group name="task-list">
      <task-item
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @archive="$emit('archive', task)"
          @edit="$emit('edit', task)"
          @remove="$emit('remove', task)"
          @add="$emit('add', task)"
          @fetch-children="$emit('fetch-children', task)"
          @close-children="$emit('close-children', task)"
      >
        <div
            class="children-block"
            v-if="task.showChildren"
        >
          <prompt :content="'Добавить подзадачу'">
            <b-icon-plus-circle-fill
                class="btns"
                @click="$emit('add', task)"
            />
          </prompt>

          <div
              class="children-absent"
              v-if="task.children && task.children.length === 0"
          >
            Подзадач нет
          </div>

          <task-list
              class="children-list"
              v-else
              :tasks="task.children"
              @archive="(_task) => $emit('archive', _task)"
              @edit="(_task) => $emit('edit', _task)"
              @remove="(_task) => $emit('remove', _task)"
              @add="(_task) => $emit('add', _task)"
              @fetch-children="(_task) => $emit('fetch-children', _task)"
              @close-children="(_task) => $emit('close-children', _task)"
          >
          </task-list>
        </div>
      </task-item>
    </transition-group>
  </div>
</template>

<script>
import TaskItem from "@/components/task/TaskItem";
import Prompt from "@/components/UI/Prompt";

export default {
  components: {Prompt, TaskItem},
  props: {
    tasks: {
      type: Array
    }
  }
}
</script>

<style scoped>
.children-list {
  padding-left: 23px;
  width: 100%;
}

.children-absent {
  color: #AFAFBC;
  white-space: nowrap;
  margin-left: 15px;
  margin-top: 15px;
}

.children-block {
  display: flex;
  padding-left: 27px;
}

.btns {
  color: darkgrey;
  width: 30px;
  height: 30px;
  padding-top: 9px;
}

.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.4s;
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateX(180px);
}

.task-list-move {
  transition: transform 0.4s;
}
</style>