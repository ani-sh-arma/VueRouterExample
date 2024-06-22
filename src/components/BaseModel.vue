<script setup>
const props = defineProps({
  modelActive: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close-model"]);
</script>

<template>
  <Teleport to="body">
      <Transition name="model-outer">
        <div
          v-show="modelActive"
          class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
        >
          <Transition name="model-inner">
            <div
              v-if="modelActive"
              class="p-4 bg-white self-start mt-32 max-w-screen-md"
            >
              <slot> </slot>
              <button
                @click="$emit('close-model')"
                class="text-white mt-8 bg-primary py-2 px-6"
              >
                Close
              </button>
            </div>
          </Transition>
        </div>
      </Transition>
  </Teleport>
</template>


<style scoped>
.model-outer-enter-active,
.model-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.model-outer-enter-from,
.model-outer-enter-to {
  opacity: 0;
}
</style>