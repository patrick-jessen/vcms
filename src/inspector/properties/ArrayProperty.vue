<template>
<tbody>
  <tr>
    <td class='title' @click='toggle'>
      <i :class='icon'></i>
      {{property.title}}
    </td>
    <td>  
      <span v-html='preview' class='title' @click='toggle'></span>
    </td>
  </tr>
  <template v-if='expanded'>
    <template v-if='property.type === "array"'>
      <!--<tr v-for='(v, i) in property.value' class='child'>
        <td>
          <div class='props'> <i :class='icon'></i>{{i}}</div>
        </td>
        <td>
        </td>
      </tr>-->
      <template v-for='(p, i) in property.value'>
      <Property 
        :nested='1' 
        :title='p.descr' 
        :property='childProp(property.props, i, property.value)' 
        @change='onChange(p, 0, $event)' 
        :key='p'
        class='child'
        />
        </template>
    </template>
    <template v-else v-for='p in property.props'>
      <Property 
        :nested='1' 
        :title='p.descr' 
        :property='childProp(p, 0, property.value)' 
        @change='onChange(p, 0, $event)' 
        :key='p'
        class='child'
        />
    </template>


    <!--<tr v-for='e in entries'>
      <template v-if='property.type === "array"'>
      </template>
      <template v-else v-for='p in property.props'>
        <td>
          <div class='props'>
          {{p}} asd
          </div>
        </td>
        <td>  
          {{p}}
        </td>
      </template>
      
    </tr>-->
  </template>
</tbody>

<!--
  <template v-if='expanded'>
    <template v-if='property.type === "array"'>
      <template v-for='(p, i) in property.value'>
        Item {{i}}
        <table>
          <tr v-for='pd in property.props' :title='pd.descr'>
            <td>
              {{pd.title}}
            </td>
            <td>
              <Property :property='childProp(pd, p)' @change='onChange(pd, i, $event)'/>
            </td>
          </tr>
        </table>
      </template>
    </template>
    <template v-else>
      <table>
        <tr v-for='pd in property.props' :title='pd.descr'>
          <td>
            {{pd.title}}
          </td>
          <td>
            <Property :property='childProp(pd, property.value)' @change='onChange(pd, 0, $event)'/>
          </td>
        </tr>
      </table>
    </template>
  </template>
</div>-->
</template>

<script>
export default {
  props: ['property'],
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    icon() {
      if(this.expanded)
        return 'caret down icon'
      else
        return 'caret right icon'
    },
    preview() {
      // no render function
      if(!this.property.render)
        return this.property.value

      return this.property.render(this.property.value)
    },
    keys() {
      return Object.keys(this.property.value)
    },
  },
  beforeCreate() {
    this.$options.components.Property = require('../Property.vue')
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded
    },
    childProp(propDef, i, prop) {
      var obj = Object.assign({}, propDef)
      obj.value = prop[propDef.name]


      if(this.property.type === 'array') {
        return {
          title:'Item ' + i, 
          type:'object',
          props:propDef,
          value: prop[i],
          render: (item) => {return this.property.render([item])}
        }  
      }
      return obj
    },
    onChange(pd, i, e) {
      if(this.property.type === 'array')
        this.$set(this.property.store[this.property.name][i], pd.name, e)
      else
        this.$set(this.property.store[this.property.name], pd.name, e)
    },
  },
}
</script>

<style scoped>
.title {
  cursor: pointer;
}
.icon {
  margin-left: -5px;
  margin-right: -2px;
}
td {
  position: relative;
  padding-left: 10px !important;
}
.props {
  margin-left: 30px;
}
.child:nth-child(odd) {
  background-color: #eaffff !important;
}
.child:nth-child(even) {
  background-color: #f6ffff !important;
}
.child:last-child {
  border-bottom: 1px solid black !important;
}
tbody.child {
  display: table-row;
}
</style>
<style>
.title img {
  max-width: 80%;
  max-height: 25px;
}
</style>