export type ActDecorateContainerType = "Rules" | 'Reward'

export const ActDecorateContainerConfig = {
  Rules: {
    topSection: {
      imageUrl: "/red-room/rule-bg-01.png",
      className: "w-[750px] h-[330px]",
    },
    middleSection: {
      imageUrl: "/red-room/rule-bg-02.png",
      className: "w-[750px] min-h-[30px]",
    },
    bottomSection: {
      imageUrl: "/red-room/rule-bg-03.png",
      className: "w-[750px] h-[194px]",
    },
  },
  Reward: {
    topSection: {
      imageUrl: "/red-room/reward-bg-01.png",
      className: "w-[750px] h-[240px]",
    },
    middleSection: {
      imageUrl: "/red-room/reward-bg-02.png",
      className: "w-[750px] min-h-[30px]",
    },
    bottomSection: {
      imageUrl: "/red-room/reward-bg-03.png",
      className: "w-[750px] h-[194px]",
    },
  },
}