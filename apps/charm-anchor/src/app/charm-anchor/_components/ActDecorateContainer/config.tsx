export type ActDecorateContainerType = "Rules" | 'Reward' | 'Ranking'

export const ActDecorateContainerConfig = {
  Rules: {
    topSection: {
      imageUrl: "/rule-bg-01.png",
      className: "w-[750px] h-[320px]",
    },
    middleSection: {
      imageUrl: "/rule-bg-02.png",
      className: "w-[750px] min-h-[30px]",
    },
    bottomSection: {
      imageUrl: "/rule-bg-03.png",
      className: "w-[750px] h-[304px]",
    },
  },
  Ranking: {
    topSection: {
      imageUrl: "/ranking-bg-01.png",
      className: "w-[750px] h-[839px]",
    },
    middleSection: {
      imageUrl: "/ranking-bg-02.png",
      className: "w-[750px] min-h-[30px]",
    },
    bottomSection: {
      imageUrl: "/ranking-bg-03.png",
      className: "w-[750px] h-[190px]",
    },
  },
  Reward: {
    topSection: {
      imageUrl: "/reward-bg-01.png",
      className: "w-[750px] h-[322px]",
    },
    middleSection: {
      imageUrl: "/reward-bg-02.png",
      className: "w-[750px] min-h-[30px]",
    },
    bottomSection: {
      imageUrl: "/reward-bg-03.png",
      className: "w-[750px] h-[260px]",
    },
  },
}