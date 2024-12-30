# Custom font-awesome icons

The best use is through the `Icon` component:

```javascript
<Icon :icon="['activity', 'hiking']" />
```

But you can still use it directly with `fa-icon` and `fa-layers` if needed. In such case, please encapsulate it with Bulma's icon element:

```javascript
<span class="icon">
  <fa-layers>
    <fa-icon class="sun" icon="sun" transform="shrink-4 up-2 left-2" spin />
    <fa-icon
      icon="cloud"
      :style="{ color: 'white' }"
      transform="shrink-3 flip-h left-1 down-3"
    />
    <fa-icon icon="cloud" transform="shrink-5 flip-h left-1 down-3" />
  </fa-layers>
</span>
```

:warning: SVG file has one constraint: it must contains only one single path element.
