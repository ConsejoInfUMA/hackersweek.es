<script lang="ts">
  let { height } = $props();
</script>

<svg {height} viewBox="123.07 0.878 17.045 17.044">
  <title>12</title>
  <path
    d="M123.07.878V17.922H140.115V13.067H130.363V10.611H140.115V0.878H130.384V1.491H129.175V2.067H130.384V3.307H137.697V8.194H127.945V15.507H125.484V0.878Z"
    id="secondary"
  />
  <path
    d="M123.07.878V17.922H140.115V14.892H128.541V10.611H140.115V2.7H130.384V3.307H139.519V10.017H127.945V15.507H139.519V17.33H123.662V0.878ZM130.384 3.307V5.712H127.945V3.307ZM129.175 1.491V2.067H130.384V1.491Z"
    id="primary"
  />
  <path
    d="M131.009 2.64H131.569V2.068H131.009ZM131.568 1.488V0.918H131.008V1.488Z"
    id="eyes"
  />
</svg>

<style>
  svg {
    display: inline-block;
    vertical-align: bottom;
  }
  #primary {
    fill: var(--primary);
  }
  #secondary {
    fill: var(--secondary);
  }
  #eyes {
    fill: light-dark(var(--primary), var(--main-background));
  }
</style>
