<template>
  <div>
    <div class="info">Ходит {{gamer | longText}}</div>
    <div class="arrowTop" @click="xControl--"></div>
    <div class="middle">
      <div class="left" @click="yControl--"></div><div class="gameBlock">
          <div class="row" v-for="(elem1, index1) in table" :key="index1">
            <div style="display: inline-block; overflow: hidden;"  v-for="(elem2, index2) in table" :key="index2" @click="setPoint(index1, index2)">
              <div class="block">
                <div class="first" v-if="Point(index1, index2)"></div>
                <div class="second" v-if="Point2(index1, index2)"></div>
              </div>
            </div>
          </div>
      </div><div class="left right" @click="yControl++"></div>
    </div>
    <div class="arrowTop rotate" @click="xControl++"></div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data () {
    return {
      cellWidth: 0,
      cellCoutn: 20,
      xControl: 0,
      yControl: 0,
      table: Array(20),
      gamerNumber: 1
    }
  },
  methods: {
    setPoint: function (index1, index2) {
      if (!this.Point2(index1, index2) && !this.Point(index1, index2)) {
        this.control(index1, index2)
      }
    },
    Point: function (x, y) {
      return this.$store.getters.getForFirst({x: x + this.xControl, y: y + this.yControl})
    },
    Point2: function (x, y) {
      return this.$store.getters.getForSecond({x: x + this.xControl, y: y + this.yControl})
    },
    control: function (x, y) {
      this.$store.dispatch('putPoint', {
        coordinate: {x: x + this.xControl, y: y + this.yControl},
        index: this.gamerNumber
      })
      if (this.$store.getters.getWin(this.gamerNumber)) {
        alert(`${this.gamer} победил`)
        this.$emit('game')
      }
      this.gamerNumber > 1 ? this.gamerNumber = 1 : this.gamerNumber++
      this.Point({x: x, y: y})
      this.Point2({x: x, y: y})
    }
  },
  computed: {
    PointForFirst: function (x, y) {
      return x
    },
    gamer: function () {
      return this.$store.getters.getName(this.gamerNumber)
    }
  },
  filters: {
    longText: function (value) {
      return value.length > 15 ? value.substring(0, 12)+'...' : value
    }
  }
}
</script>

<style scoped>
  .row{
    display: block;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  div {
    line-height: 1px;
  }

  .info {
    position: absolute;
    top: 20px;
    left: 10%;
    font-size: 26px;
    color: gray;
    font-family: 'Pacifico', cursive;
    width: auto;
    height: 100px;
  }

  .block {
    box-sizing: border-box;
    padding: 0;
    display: inline-block;
    height: calc(75vh / 20);
    width: calc(75vh / 20);
    margin: 0;
    background-repeat: no-repeat;
    background-image: url(../assets/cross-out.svg);
    background-size: 100%;
    transform: rotate(45deg);
  }

  .left {
    cursor: pointer;
    display: inline-block;
    height: 50px;
    width: 50px;
    margin-left: 5px;
    margin-right: 5px;
    vertical-align: middle;
    margin-bottom: 76vh;
    background-image: url("../assets/arrow-left.svg");
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .right {
    background-image: url("../assets/arrow-right.svg");
  }

  .second {
    margin: 15% 15% 15% 15%;
    width: 70%;
    height: 70%;
    z-index: 2;
    background-color: red;
    border-radius: 100%;
    background-size: 100%;
  }
.middle {
  width:auto;
  height:calc(76vh + 34px);
  text-align: center;
}
  .first {
    margin: 15% 15% 15% 15%;
    width: 70%;
    height: 70%;
    background-image: url(../assets/cross.svg);
    background-size: 100%;
    transform: rotate(45deg);
    z-index: 2;
  }
  .gameBlock{
    display: inline-block;
    border: 20px groove #543A1D;
    background-color: #E66519;
    background-image: url("../assets/back4.jpg");
    background-size: 150%;
    background-repeat: no-repeat;

  }
  .arrowTop {
    display: block;
    cursor: pointer;
    width: 50px;
    height: 50px;
    margin-left: calc(50% - 25px);
    margin-bottom: 5px;
    margin-top: 5px;
    background-image: url("../assets/arrow-up.svg");
    background-size: 50px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .rotate {
    transform: rotate(180deg);
  }
</style>
