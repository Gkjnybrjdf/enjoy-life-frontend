import {ref} from "vue";

export function getTaskWithoutId(task) {
    return ref({
        name: task.name,
        description: task.description,
        priority: task.priority,
        easy: task.easy,
        active: task.active,
        categories: task.categories
    })
}