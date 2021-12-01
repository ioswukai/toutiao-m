/**
 * 图片预览
 */
import { ImagePreview } from 'vant'

/**
 * 给el元素中的图片添加预览事件
 */
export default function (el) {
  // 元素不存在，不操作
  if (!el) { return }

  // 找到所有的`img`标签。
  const imgs = el.querySelectorAll('img')
  // 创建ImagePreview的数据源，即一系列图片地址的数组
  const images = Array.from(imgs).map(img => img.src)
  // 给`img`标签设置点击事件。
  imgs.forEach((img, index) => {
    img.addEventListener('click', () => ImagePreview({
      images,
      startPosition: index
    }))
  })
}
