<template>
  <main>
    <h1 class="font-bold">Content</h1>
    <p>Blah blh blh</p>
    <Button>Toto</Button>
    <!-- TODO for switching use select button -->
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth.js';

const { isMobile } = import.meta.client ? useScreen() : { isMobile: true };
const config = useCookie('home.config', {
  default: () => ({ feed: true, banner: true, personal: false }),
});
const { feed, banner, personal } = toRefs(config.value);
const { authenticated } = storeToRefs(useAuthStore());
const isPersonal = computed(() => authenticated.value && personal);
</script>

<!-- <style lang="scss" scoped>
@include mixins.mobile {
  .feed-view {
    padding-left: 0;
    padding-right: 0;

    .feed-title {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .field {
    flex-direction: column;
  }

  .preference-switch {
    margin-top: 0.3rem;
    margin-left: 0.3rem;
    display: flex;

    & > span {
      display: flex;
      flex-direction: row-reverse;

      & > * {
        margin-right: 0.3rem;
      }
    }
  }
}

@include mixins.tablet {
  .feed-view {
    margin-top: var(--bulma-size-3);
  }

  .field {
    justify-content: space-between;
    align-items: baseline;
  }
}

.feed-title {
  display: flex;

  span:first-child {
    flex-grow: 1;
  }
}

.intro {
  margin-bottom: var(--bulma-size-6);
}

.switch[type='checkbox']:checked + label::before {
  background: $color-base-c2c;
}

.toggle-checkbox {
  display: none;
}

.toggle-container {
  position: relative;
  border-radius: 20px;
  background: white;
  border: 1px solid $color-base-c2c;
  padding: 5px 2px;
  cursor: pointer;
}

.is-active {
  color: white;
  border-radius: 20px;
  background: $color-base-c2c;
  transition: color 0.3s;
}

.toggleContainer span {
  padding: 3px 10px;
  text-align: center;
  z-index: 100;
}

.field {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.ams-ad {
  margin-bottom: var(--bulma-size-7);
}
</style> -->
