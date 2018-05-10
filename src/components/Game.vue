<template>
  <div>
    <div class="info">Ходит {{gamer}}</div>
    <div class="top" @click="xControl--"></div>
    <div class="middle">
      <div class="left" @click="yControl--"></div>
      <div class="gameBlock">
          <div class="row" v-for="(elem1, index1) in table" :key="index1">
            <div class="block" v-for="(elem2, index2) in table" :key="index2" @click="setPoint(index1, index2)">
                <div class="first" v-if="Point(index1, index2)"></div>
                <div class="second" v-if="Point2(index1, index2)"></div>
            </div>
          </div>
      </div>
      <div class="left right" @click="yControl++"></div>
    </div>
    <div class="top rotate" @click="xControl++"></div>
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
  }
}
</script>

<style scoped>
  .row{
    width: 80vh;
    display: block;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  div {
    line-height: 1px;
  }

  .info {
    margin-bottom: 20px;
    vertical-align: middle;
    display: block;
  }

  .block {
    box-sizing: border-box;
    padding: 0;
    display: inline-block;
    height: calc(75vh / 20);
    width: calc(75vh / 20);
    margin: 0;
    background-size: calc(80vh / 20);
    background-repeat: no-repeat;
    background-image: url(../assets/cross-out.svg);
    transform: rotate(45deg);
  }

  .left {
    display: inline-block;
    height: 60%;
    width: 50px;
    margin-left: 10px;
    margin-right: 10px;
    vertical-align: center;
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
    background-image: url("../assets/circle-outline.svg");
    background-size: 100%;
  }
.middle {
  width:auto;
  height:75vh;
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
    padding-top: 0.6vh;
    height: 76vh;
    background-color: #E66519;

  }
  .top {
    display: block;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    margin-top: 20px;
    background-image: url("../assets/arrow-up.svg");
    background-size: 50px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .rotate {
    transform: rotate(180deg);
  }

  @media (max-width: 640px) {
    .left{
      width: 15px;
    }
    .top {
      height: 15px;
      background-size: 15px;
      margin-top: 5px;
      margin-bottom: 3px;
    }
    .info {
      font-size: 12px;
      margin: 0;
    }
    .middle{
      width: 80%;
      margin: 0 auto;
    }
  }
</style>
