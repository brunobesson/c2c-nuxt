<template>
  <section class="p-5 has-text-centered">
    <!-- TODO <html-header :title="$t('Page not found')" /> -->

    <div class="content">
      <h1>{{ $t('Ooops') }}</h1>
      <h3>{{ $t('Page not found') }}</h3>

      <p>
        {{ $t('The page you are looking for does not exist or is broken.') }}
      </p>
      <p>
        <a href="javascript:history.go(-1)">{{
          $t('Go to the previous page')
        }}</a>
        <span>&nbsp;</span>
        <span>{{ $t('or try the following pages:') }}</span>
      </p>
    </div>

    <div class="notfound-buttons">
      <NuxtLink
        to="/"
        class="is-size-4 has-text-normal has-hover-background has-text-weight-bold"
      >
        <Icon icon="home" class="has-text-secondary is-size-1" />
        <div class="is-capitalized">
          {{ $t('home') }}
        </div>
      </NuxtLink>
      <NuxtLink
        v-for="docType of [
          'outing',
          'waypoint',
          'route',
          'article',
          'book',
          'xreport',
          'image',
          'area',
        ]"
        :to="`/${docType}s`"
        class="is-size-4 has-text-normal has-hover-background has-text-weight-bold"
      >
        <IconDocument :type="docType" class="has-text-secondary is-size-1" />
        <div class="is-capitalized">
          {{ $t(docType) }}
        </div>
      </NuxtLink>
    </div>

    <img class="falling-image" src="@/assets/img/falling.svg" />
  </section>
</template>

<script setup lang="ts">
useSeoMeta({ robots: { noindex: true } });

const button = [
  'outing',
  'waypoint',
  'route',
  'article',
  'book',
  'xreport',
  'image',
  'area',
].map((type) => ({}));
</script>

<style lang="scss" scoped>
.notfound-buttons {
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  max-width: 660px;
  margin: auto;

  a {
    width: 33%;
    padding: 20px 0;
    transition: 0.3s;
  }
}

.falling-image {
  transition-property: transform;
  transition-duration: 1s;

  &:hover {
    animation-name: rotate;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
