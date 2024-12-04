<template>
  <button class="button is-primary">
    {{ $t('welcome', { toto: 'toto' }) }} -
    {{ $t('welcome', { toto: 'tata' }) }} - {{ $t('bananas', 0) }} -
    {{ $t('bananas', 1) }} -
    {{ $t('bananas', 10) }}
    <fa-icon :icon="['activity', 'hiking']"></fa-icon
    ><fa-icon icon="users"></fa-icon>
  </button>
</template>
