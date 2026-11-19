<script setup lang="ts">
import { registerMap } from 'echarts/core'

const props = defineProps<{
  startAt: number
  endAt: number
  hostname: string
}>()

const mapType = ref<'world' | 'china'>('china')
const geoReady = reactive({ world: false, china: false })
const geoErrors = reactive({ world: false, china: false })

const { data: countryData, status: countryStatus } = useFetch(
  '/api/insight/metrics-expanded',
  {
    key: 'insight-map-country',
    query: computed(() => ({
      type: 'country',
      startAt: props.startAt,
      endAt: props.endAt,
      hostname: props.hostname,
      limit: 500,
    })),
  },
)

const { data: regionData, status: regionStatus } = useFetch(
  '/api/insight/metrics-expanded',
  {
    key: 'insight-map-region',
    query: computed(() => ({
      type: 'region',
      startAt: props.startAt,
      endAt: props.endAt,
      hostname: props.hostname,
      limit: 500,
    })),
  },
)

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
    center: [104.3182, 35.8051],
    zoom: 1.64,
  },
  world: {
    center: [-3.7892, 3.2963],
    zoom: 1.12,
  },
} as const

async function loadGeo(type: 'world' | 'china') {
  if (geoReady[type]) return
  geoErrors[type] = false
  try {
    const json = await $fetch(`/geo/${type}.json`)
    registerMap(type, json as any)
    geoReady[type] = true
  } catch {
    geoErrors[type] = true
  }
}

onMounted(() => loadGeo('china'))
watch(mapType, (type) => loadGeo(type))

const chinaSpecialRegions: Record<string, string> = {
  TW: '台湾省',
  HK: '香港特别行政区',
  MO: '澳门特别行政区',
}

const mapData = computed(() => {
  if (mapType.value === 'world') {
    return (countryData.value ?? [])
      .filter((item) => item.name && countryCodeToName[item.name])
      .map((item) => ({
        name: countryCodeToName[item.name!],
        value: Number(item.pageviews) || 0,
      }))
  }
  const regionItems = (regionData.value ?? [])
    .filter((item) => item.name && regionCodeToName[item.name])
    .map((item) => ({
      name: regionCodeToName[item.name!],
      value: Number(item.pageviews) || 0,
    }))
  const specialItems = (countryData.value ?? [])
    .filter((item) => item.name && chinaSpecialRegions[item.name])
    .map((item) => ({
      name: chinaSpecialRegions[item.name!],
      value: Number(item.pageviews) || 0,
    }))
  return [...regionItems, ...specialItems]
})

const maxValue = computed(() => {
  const values = mapData.value.map((d) => d.value)
  return Math.max(...values, 1)
})

const palette = useChartPalette()
const failed = computed(
  () =>
    countryStatus.value === 'error' ||
    (mapType.value === 'china' && regionStatus.value === 'error'),
)

const chartOptions = computed<ECOption>(() => {
  const chartTheme = palette.value
  if (!geoReady[mapType.value] || !chartTheme) return {}

  return {
    tooltip: {
      trigger: 'item',
      renderMode: 'richText',
      backgroundColor: chartTheme.tooltipBg,
      borderColor: chartTheme.tooltipBorder,
      borderWidth: 1,
      textStyle: { color: chartTheme.tooltipText },
      formatter(params: any) {
        const value = Number(params.value) || 0
        return `${params.name}\n${value.toLocaleString()} 次浏览`
      },
    },
    visualMap: [
      {
        type: 'continuous',
        left: 16,
        bottom: 16,
        min: 0,
        max: maxValue.value,
        inRange: {
          color: chartTheme.range,
        },
        text: ['多', '少'],
        calculable: true,
        textStyle: { color: chartTheme.axisText },
      },
      transparentZeroVisualMap,
    ],
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
          itemStyle: { areaColor: 'inherit' },
        },
        itemStyle: {
          areaColor: 'transparent',
          borderColor: chartTheme.axisLine,
        },
        select: {
          disabled: true,
        },
        data: mapData.value.map((item) =>
          item.value > 0
            ? {
                ...item,
                emphasis: { itemStyle: { areaColor: chartTheme.pageviews } },
              }
            : item,
        ),
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
  <UCard as="section">
    <template #header>
      <h2 class="font-semibold">访问地域</h2>
      <UTabs v-model="mapType" :items="tabItems" :content="false" size="sm" />
    </template>
    <p v-if="failed" class="text-muted text-sm" role="status">
      暂时无法读取地域数据。
    </p>
    <p v-else-if="geoErrors[mapType]" class="text-muted text-sm" role="status">
      地图暂时无法加载。
      <UButton variant="link" label="重试" @click="loadGeo(mapType)" />
    </p>
    <div v-else class="relative h-80 sm:h-96">
      <VChart
        v-if="geoReady[mapType] && palette"
        :key="mapType"
        :option="chartOptions"
        :autoresize="true"
        class="size-full"
      />
      <USkeleton v-else class="size-full" />
    </div>
  </UCard>
</template>
