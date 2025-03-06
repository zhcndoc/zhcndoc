<script setup lang="ts">
const comments = [
  {
    quote: `这文档真是我的开发好帮手，从基础概念到高阶应用都讲得透彻，特别是那些实战案例，每次卡壳的时候总能在这里找到灵感，更新速度也完全跟得上技术迭代节奏。`,
    user: {
      name: 'Liang',
      description: '@lianginx',
      avatar: {
        src: 'https://avatar.ikxin.com/github/lianginx  ',
      },
    },
  },
  {
    quote: `国内服务器的加载速度就像本地文件一样流畅，文档结构设计得很贴心，每次我需要某个技术方案时，总能在三层目录内精准定位到想要的内容。`,
    user: {
      name: '馬腊咯稽',
      description: '@ElementRef',
      avatar: {
        src: 'https://avatar.ikxin.com/github/ElementRef  ',
      },
    },
  },
  {
    quote: `开源技术指南整合得就像精心编排的技术剧集，记得上周调试接口时，按着指南操作一次就成功了，连同事都来问我要秘籍。`,
    user: {
      name: 'libchaos',
      description: '@libchaos',
      avatar: {
        src: 'https://avatar.ikxin.com/github/libchaos  ',
      },
    },
  },
  {
    quote: `作为一个转行过来的程序员，这里的实例分析就像同事在旁边手把手教，原本两周才能消化的新框架现在三天就能上手。`,
    user: {
      name: 'Ali_Eljerrari',
      description: '@ali-eljerrari',
      avatar: {
        src: 'https://avatar.ikxin.com/github/ali-eljerrari  ',
      },
    },
  },
  {
    quote: `最近把这个网站设为浏览器首页了，知识点覆盖全面得像技术百科全书，更新推送比行业资讯还及时，现在写代码遇到瓶颈就会下意识先来这里找思路。`,
    user: {
      name: 'Yu Hengliang',
      description: '@yuhengliang',
      avatar: {
        src: 'https://avatar.ikxin.com/github/yuhengliang  ',
      },
    },
  },
  {
    quote: `加载速度让我误以为是打开了本地文档，从语法基础到架构设计应有尽有，最近带新人时直接把相关章节链接发过去，他们自学就能完成基础模块开发。`,
    user: {
      name: 'PP Kun',
      description: '@PPKunOfficial',
      avatar: {
        src: 'https://avatar.ikxin.com/github/PPKunOfficial  ',
      },
    },
  },
  {
    quote: `访问体验流畅得就像在本地看电子书，技术资料整理得比我的笔记还要系统，现在遇到技术难题的时候，直接查文档的效率比在群里提问高多了。`,
    user: {
      name: 'YassineZhang',
      description: '@yassine-zhang',
      avatar: {
        src: 'https://avatar.ikxin.com/github/yassine-zhang  ',
      },
    },
  },
  {
    quote: `文档能做到这种专业程度实在难得，每个技术点都深入浅出地讲解，配套代码可以复制到项目里调试，省去了大量适配时间。`,
    user: {
      name: 'David Muriithi',
      description: '@BarriosXJavier',
      avatar: {
        src: 'https://avatar.ikxin.com/github/BarriosXJavier  ',
      },
    },
  },
  {
    quote: `文档像是专门为开发者设计的说明书，项目实战指南又像烹饪教程般步骤详尽，现在我们组的代码评审时间都缩短了一半。`,
    user: {
      name: 'winnie xiong',
      description: '@winnie-xzh',
      avatar: {
        src: 'https://avatar.ikxin.com/github/winnie-xzh  ',
      },
    },
  },
  {
    quote: `中文文档对我太友好了，之前看官方文档要反复使用翻译软件，现在复杂的技术原理都用日常语言讲得通透，能够快速理解核心逻辑。`,
    user: {
      name: 'nnqqss',
      description: '@nnqqss',
      avatar: {
        src: 'https://avatar.ikxin.com/github/nnqqss  ',
      },
    },
  },
]
</script>

<template>
  <div>
    <UPageHero>
      <template #title>
        <div class="font-serif font-black">
          <div class="mb-6">
            由
            <span class="text-primary-500 text-[1.2em]">开源社区</span>
            提供支持的
          </div>
          <div class="text-primary-500 text-[1.2em]">中文技术文档</div>
        </div>
      </template>

      <template #description>
        <div class="text-3xl">
          旨在为中文地区开发者提供优质的技术文档查阅体验
        </div>
      </template>

      <template #top>
        <div
          class="absolute left-1/2 size-60 -translate-x-1/2 -translate-y-80 transform rounded-full blur-[300px] sm:size-80 dark:bg-(--ui-primary)"
        />
        <StarsBg />
      </template>

      <template #links>
        <UButton
          color="primary"
          size="xl"
          to="/project"
          trailing-icon="tabler:chevron-right"
          variant="solid"
        >
          探索项目
        </UButton>
      </template>
    </UPageHero>

    <UPageSection
      title="社区用户评价"
      description="来自社区用户的使用体验与评价反馈，感谢每一位用户的支持与建议"
    >
      <UPageColumns class="xl:columns-4">
        <UPageCard
          v-for="(testimonial, index) in comments"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{
            description:
              'before:content-[open-quote] after:content-[close-quote] text-justify',
          }"
        >
          <template #footer>
            <UUser v-bind="testimonial.user" size="lg" />
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>

    <USeparator />

    <UPageCTA
      title="立即开始"
      description="探索项目、查阅文档、参与社区，一切尽在简中文档！"
      variant="naked"
      class="overflow-hidden"
      :links="[
        {
          label: 'Github',
          color: 'neutral',
          icon: 'tabler:brand-github',
        },
        {
          label: '探索项目',
          color: 'neutral',
          variant: 'subtle',
          trailingIcon: 'tabler:chevron-right',
        },
      ]"
    >
      <div
        class="absolute left-1/2 size-40 -translate-x-1/2 -translate-y-80 transform rounded-full blur-[250px] sm:size-50 dark:bg-(--ui-primary)"
      />
      <StarsBg />
    </UPageCTA>
  </div>
</template>
