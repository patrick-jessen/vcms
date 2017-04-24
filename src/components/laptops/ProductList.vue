<template>
<div class='wrapper'>
  <div class='innerwrapper'>
    <ProductSummary v-for='i in items' :laptop='i'/>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          name: 'Lemur',
          displaySize: '14"',
          price: '$699',
          finance: '$62',
          smallImage: 'https://d1vhcvzji58n1j.cloudfront.net/assets/products/lemu7/thumb-91f3e173bd.png',
          meters: [80,50,40,50],
          link: '/laptops/lemur'
        },
        {
          name: 'Gazelle',
          displaySize: '15"',
          price: '$769',
          note: 'NEW MODEL',
          finance: '$68',
          smallImage: 'https://d1vhcvzji58n1j.cloudfront.net/assets/products/gaze12/thumb-7bfc468754.png',
          meters: [70,50,40,60],
          link: '/laptops/gazelle'
        },
        {
          name: 'Kudu',
          displaySize: '17"',
          price: '$989',
          note: 'NEW MODEL',
          finance: '$87',
          smallImage: 'https://d1vhcvzji58n1j.cloudfront.net/assets/products/kudu4/thumb-ca170fce4f.png',
          meters: [80,50,40,60],
          link: '/laptops/kudu'
        },
        {
          name: 'Galago Pro',
          displaySize: '13" HiDPI',
          price: '$899',
          note: 'PRE-ORDER TODAY',
          finance: '$80',
          smallImage: 'https://d1vhcvzji58n1j.cloudfront.net/assets/products/galp2/thumb-bd7a9ed4c7.png',
          meters: [100,50,40,50],
          link: '/laptops/galago'
        },
        {
          name: 'Oryx Pro',
          displaySize: '15" or 17"',
          price: '$1,399',
          finance: '$123',
          smallImage: 'https://d1vhcvzji58n1j.cloudfront.net/assets/products/oryp3/thumb-39ab76cfa2.png',
          meters: [70,100,80,80],
          link: '/laptops/oryx'
        },
        {
          name: 'Serval WS',
          displaySize: '15" or 17"',
          price: '$1,899',
          finance: '$167',
          smallImage: 'https://d1vhcvzji58n1j.cloudfront.net/assets/products/serw10/thumb-3fc0644931.png',
          meters: [30,100,80,100],
          link: '/laptops/serval'
        },
        {
          name: 'Bonobo WS',
          displaySize: '17"',
          price: '$2,799',
          finance: '$247',
          smallImage: 'https://d1vhcvzji58n1j.cloudfront.net/assets/products/bonw12/thumb-577d40b520.png',
          meters: [20,100,100,100],
          link: '/laptops/bonobo'
        }
      ]
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 50px;
  background-color: white;
  margin: auto;
}
.innerwrapper {
  max-width: 900px;
  margin: auto;
}
</style>