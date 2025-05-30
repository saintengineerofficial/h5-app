export type ActDecorateContainerType = "Rules" | 'Reward' | 'Ranking'

export const ActDecorateContainerConfig = {
  Rules: {
    topSection: {
      imageUrl: "/charm-anchor/rule-bg-01.png",
      className: "w-[750px] h-[320px]",
    },
    middleSection: {
      imageUrl: "/charm-anchor/rule-bg-02.png",
      className: "w-[750px] min-h-[30px]",
    },
    bottomSection: {
      imageUrl: "/charm-anchor/rule-bg-03.png",
      className: "w-[750px] h-[304px]",
    },
  },
  Ranking: {
    topSection: {
      imageUrl: "/charm-anchor/ranking-bg-01.png",
      className: "w-[750px] h-[839px]",
    },
    middleSection: {
      imageUrl: "/charm-anchor/ranking-bg-02.png",
      className: "w-[750px] min-h-[30px]",
    },
    bottomSection: {
      imageUrl: "/charm-anchor/ranking-bg-03.png",
      className: "w-[750px] h-[190px]",
    },
  },
  Reward: {
    topSection: {
      imageUrl: "/charm-anchor/reward-bg-01.png",
      className: "w-[750px] h-[322px]",
    },
    middleSection: {
      imageUrl: "/charm-anchor/reward-bg-02.png",
      className: "w-[750px] min-h-[30px]",
    },
    bottomSection: {
      imageUrl: "/charm-anchor/reward-bg-03.png",
      className: "w-[750px] h-[260px]",
    },
  },
}