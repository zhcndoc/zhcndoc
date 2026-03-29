<script setup lang="ts">
import { registerMap } from 'echarts/core'

const props = defineProps<{
  startAt: number
  endAt: number
  hostname: string
}>()

const mapType = ref<'world' | 'china'>('china')
const geoReady = reactive({ world: false, china: false })

// 用于获取图表实例，读取拖拽/缩放后的 center 和 zoom 值
const vchartRef = ref<{ chart: any } | null>(null)

function onGeoRoam() {
  return // 先注释掉，等需要微调初始视角时再启用这个函数
  const chart = vchartRef.value?.chart
  if (!chart) return
  const option = chart.getOption() as any
  const series = option?.series?.[0]
  if (series) {
    // 控制台会打印当前中心点和缩放比例，将满意的值填入 chartOptions 中的注释位置
    console.log(
      '[GeoMap] center:',
      JSON.stringify(series.center),
      '| zoom:',
      series.zoom,
    )
  }
}

const { data: countryData } = useFetch('/api/analytics/metrics-expanded', {
  query: computed(() => ({
    type: 'country',
    startAt: props.startAt,
    endAt: props.endAt,
    hostname: props.hostname,
    limit: 500,
  })),
})

const { data: regionData } = useFetch('/api/analytics/metrics-expanded', {
  query: computed(() => ({
    type: 'region',
    startAt: props.startAt,
    endAt: props.endAt,
    hostname: props.hostname,
    limit: 500,
  })),
})

const countryCodeToName: Record<string, string> = {
  CN: 'China',
  SG: 'Singapore',
  US: 'United States',
  JP: 'Japan',
  HK: 'Hong Kong',
  AT: 'Austria',
  GB: 'United Kingdom',
  TW: 'Taiwan',
  BR: 'Brazil',
  KR: 'South Korea',
  DE: 'Germany',
  FR: 'France',
  AU: 'Australia',
  CA: 'Canada',
  RU: 'Russia',
  IN: 'India',
  IT: 'Italy',
  ES: 'Spain',
  NL: 'Netherlands',
  CH: 'Switzerland',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  PL: 'Poland',
  BE: 'Belgium',
  IE: 'Ireland',
  PT: 'Portugal',
  CZ: 'Czech Republic',
  MY: 'Malaysia',
  TH: 'Thailand',
  VN: 'Vietnam',
  ID: 'Indonesia',
  PH: 'Philippines',
  NZ: 'New Zealand',
  MX: 'Mexico',
  AR: 'Argentina',
  CL: 'Chile',
  CO: 'Colombia',
  PE: 'Peru',
  ZA: 'South Africa',
  AE: 'United Arab Emirates',
  SA: 'Saudi Arabia',
  TR: 'Turkey',
  IL: 'Israel',
  EG: 'Egypt',
  NG: 'Nigeria',
  KE: 'Kenya',
}

const regionCodeToName: Record<string, string> = {
  'CN-GD': '广东省',
  'CN-BJ': '北京市',
  'CN-SH': '上海市',
  'CN-TJ': '天津市',
  'CN-CQ': '重庆市',
  'CN-HE': '河北省',
  'CN-SX': '山西省',
  'CN-LN': '辽宁省',
  'CN-JL': '吉林省',
  'CN-HL': '黑龙江省',
  'CN-JS': '江苏省',
  'CN-ZJ': '浙江省',
  'CN-AH': '安徽省',
  'CN-FJ': '福建省',
  'CN-JX': '江西省',
  'CN-SD': '山东省',
  'CN-HA': '河南省',
  'CN-HB': '湖北省',
  'CN-HN': '湖南省',
  'CN-GX': '广西壮族自治区',
  'CN-HI': '海南省',
  'CN-SC': '四川省',
  'CN-GZ': '贵州省',
  'CN-YN': '云南省',
  'CN-XZ': '西藏自治区',
  'CN-SN': '陕西省',
  'CN-GS': '甘肃省',
  'CN-QH': '青海省',
  'CN-NX': '宁夏回族自治区',
  'CN-XJ': '新疆维吾尔自治区',
  'CN-NM': '内蒙古自治区',
  'CN-TW': '台湾省',
  'CN-HK': '香港特别行政区',
  'CN-MO': '澳门特别行政区',
}

const geoInitialView: Record<
  'china' | 'world',
  { center: [number, number]; zoom: number }
> = {
  china: {
    center: [103.20744907696428, 35.88842392631007],
    zoom: 1.6105100000000014,
  },
  world: {
    // 中国在世界地图中的初始视角；如果后续想微调，只改这里即可。
    center: [-0.05216586370656273, 5.942875886235669],
    zoom: 1.2100000000000009,
  },
} as const

async function loadGeo(type: 'world' | 'china') {
  if (geoReady[type]) return
  const json = await $fetch(`/geo/${type}.json`)
  registerMap(type, json as any)
  geoReady[type] = true
}

onMounted(() => loadGeo('china'))
watch(mapType, (type) => loadGeo(type))

const mapData = computed(() => {
  if (mapType.value === 'world') {
    return (countryData.value ?? [])
      .filter((item) => item.name && countryCodeToName[item.name])
      .map((item) => ({
        name: countryCodeToName[item.name!],
        value: Number(item.pageviews) || 0,
      }))
  }
  return (regionData.value ?? [])
    .filter((item) => item.name && regionCodeToName[item.name])
    .map((item) => ({
      name: regionCodeToName[item.name!],
      value: Number(item.pageviews) || 0,
    }))
})

const maxValue = computed(() => {
  const values = mapData.value.map((d) => d.value)
  return Math.max(...values, 1)
})

const chartTheme = {
  axisText: '#64748B',
  mapColor: 'rgba(54, 162, 235, 0.88)',
  mapRange: [
    'rgba(54, 162, 235, 0.06)',
    'rgba(54, 162, 235, 0.24)',
    'rgba(54, 162, 235, 0.52)',
    'rgba(54, 162, 235, 0.88)',
  ],
  tooltipBg: 'rgba(15, 23, 42, 0.92)',
  tooltipBorder: 'rgba(148, 163, 184, 0.3)',
  tooltipText: '#F8FAFC',
}

const chartOptions = computed<ECOption>(() => {
  if (!geoReady[mapType.value]) return {}

  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: chartTheme.tooltipBg,
      borderColor: chartTheme.tooltipBorder,
      borderWidth: 1,
      textStyle: { color: chartTheme.tooltipText },
      formatter(params: any) {
        const value = Number(params.value) || 0
        return `${params.name}<br/><span style="font-size: 14px; font-weight: 700;">${value.toLocaleString()}</span> 次浏览`
      },
    },
    visualMap: {
      show: true,
      left: 16,
      bottom: 16,
      min: 0,
      max: maxValue.value,
      inRange: {
        color: chartTheme.mapRange,
      },
      text: ['多', '少'],
      calculable: true,
      textStyle: { color: chartTheme.axisText },
    },
    series: [
      {
        name: '浏览量',
        type: 'map',
        roam: true,
        map: mapType.value,
        scaleLimit: {
          min: geoInitialView[mapType.value].zoom,
          max: 5,
        },
        center: geoInitialView[mapType.value].center,
        zoom: geoInitialView[mapType.value].zoom,
        emphasis: {
          label: { show: false },
          itemStyle: { areaColor: chartTheme.mapColor },
        },
        itemStyle: {
          areaColor: 'rgba(148, 163, 184, 0.12)',
          borderColor: 'rgba(148, 163, 184, 0.4)',
        },
        select: {
          disabled: true,
        },
        data: mapData.value,
      },
    ],
  }
})

const tabItems = [
  { label: '中国', value: 'china' },
  { label: '世界', value: 'world' },
]
</script>

<template>
  <UCard :ui="{ body: 'p-0 sm:p-0' }">
    <div class="relative" style="height: 30.625rem">
      <div class="absolute top-3 right-3 z-10">
        <UTabs
          v-model="mapType"
          :items="tabItems"
          variant="pill"
          :content="false"
          size="xs"
        />
      </div>
      <VChart
        v-if="geoReady[mapType]"
        ref="vchartRef"
        :key="mapType"
        :option="chartOptions"
        :autoresize="true"
        class="h-full w-full"
        @georoam="onGeoRoam"
      />
      <div v-else class="text-muted flex h-full items-center justify-center">
        <UIcon name="i-lucide-loader-circle" class="size-6 animate-spin" />
      </div>
    </div>
  </UCard>
</template>
