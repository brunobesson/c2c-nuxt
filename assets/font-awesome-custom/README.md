# Custom font-awesome icons

The best use is through the `Icon` component:

```javascript
<Icon :icon="['activity', 'hiking']" />
```

But you can still use it directly with `Icon` and `FaLayers` if needed. In such case, please encapsulate it with Bulma's icon element:

```javascript
<span class="icon">
  <FaLayers>
    <Icon class="sun" icon="sun" transform="shrink-4 up-2 left-2" spin />
    <Icon
      icon="cloud"
      :style="{ color: 'white' }"
      transform="shrink-3 flip-h left-1 down-3"
    />
    <Icon icon="cloud" transform="shrink-5 flip-h left-1 down-3" />
  </FaLayers>
</span>
```

:warning: SVG file has one constraint: it must contains only one single path element.
