import type { RewardConfigV3ResUserConfig, RewardConfigV3ResRoomConfig } from "@/services/act/common/type"

// 类型守卫函数
export const isUserConfig = (config: RewardConfigV3ResUserConfig | RewardConfigV3ResRoomConfig): config is RewardConfigV3ResUserConfig => {
  return "userConfig" in config
}
