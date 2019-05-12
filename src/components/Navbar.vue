<template>
    <nav class="navbar bg-dark">
      <div class="navbar-brand">
        <a href="#" class="navbar-item text-brand">SUZURI</a>
      </div>
      <div class="navbar-menu">
        <button type="button" class="icon-btn icon-btn-primary"><i class="fas fa-search"></i></button>
      </div>
    </nav>
</template>

<style scoped lang="scss">
.navbar {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: .5rem 1rem;
}

.navbar-brand {
    font-family: 'HelveticaNeue-CondensedBold', 'Helvetica Neue';
    font-size: 1.5rem;
}
</style>
