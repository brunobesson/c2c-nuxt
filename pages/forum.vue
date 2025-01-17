<script setup lang="ts">
definePageMeta({
  middleware: [
    async function () {
      await navigateTo(useRuntimeConfig().public.forumBase, { external: true, redirectCode: 301 });
    },
  ],
});
</script>
