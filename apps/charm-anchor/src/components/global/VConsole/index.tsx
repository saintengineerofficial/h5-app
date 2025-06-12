'use client';

import { useEffect } from 'react';

const VConsole = () => {
  useEffect(() => {
    // 仅在开发环境中加载 vConsole
    if (process.env.NODE_ENV === 'development') {
      import('vconsole').then((VConsole) => {
        new VConsole.default({
          theme: 'dark', // 可选：设置暗色主题
          maxLogNumber: 1000, // 可选：最大日志数量
        });
      });
    }

    // 清理函数：销毁 vConsole 实例（可选）
    return () => {
      // vConsole 销毁方法（如果需要）
      import('vconsole').then((VConsole) => {
        const vConsole = new VConsole.default();
        vConsole.destroy();
      });
    };
  }, []);

  return null; // 不渲染任何 UI
};

export default VConsole;