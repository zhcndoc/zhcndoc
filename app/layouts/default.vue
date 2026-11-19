<template>
  <Html lang="zh-CN" dir="ltr">
    <Body class="bg-muted text-default font-sans antialiased">
      <div class="flex min-h-dvh min-w-0 flex-col">
        <AppHeader />
        <UMain><slot /></UMain>
        <AppFooter />
      </div>
    </Body>
  </Html>
</template>
