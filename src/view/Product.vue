<template>
  <div class="product">
  	<p>this is product page</p>
    <ol>
      <li><router-link :to="'/detail/'+p">detail</router-link></li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'product',
  data(){
  	return {
  		p: '123'
  	}
  }
}
</script>
<style scoped>
h1{
  font-weight: normal;color: #fff;font-size: 24px;
}
.product{background:red;}
</style>
